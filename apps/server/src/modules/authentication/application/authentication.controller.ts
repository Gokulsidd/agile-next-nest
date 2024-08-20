import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common'
import { Authentication } from '@server/core/authentication'
import { ExceptionService } from '@server/core/exception'
import { EventService } from '@server/libraries/event'
import { Logger, LoggerService } from '@server/libraries/logger'
import { User, UserDomainFacade, UserStatus } from '@server/modules/user/domain'
import * as CryptoJS from 'crypto-js'
import { Request, Response } from 'express'
import * as moment from 'moment'
import { CookieService } from '../../../core/cookie'
import { EmailService } from '../../../libraries/email'
import { AuthenticationDomainFacade } from '../domain'
import { AuthenticationApplicationEvent } from './authentication.application.event'
import { AuthenticationApplicationException } from './authentication.application.exception'
import {
  AuthenticationLoginDto,
  AuthenticationRegisterDto,
  AuthenticationResetPasswordDto,
  AuthenticationSendEmailResetPasswordDto,
} from './authentication.dto'

@Controller('/v1/authentication')
export class AuthenticationController {
  private logger: Logger

  constructor(
    private authenticationDomainFacade: AuthenticationDomainFacade,
    private exception: AuthenticationApplicationException,
    private userDomainFacade: UserDomainFacade,
    private loggerService: LoggerService,
    private event: EventService,
    private cookieService: CookieService,
    private emailService: EmailService,
    private service: ExceptionService,
  ) {
    this.logger = this.loggerService.create({
      name: 'AuthenticationController',
    })
  }

  @Post('/login')
  @Authentication.Public()
  async login(
    @Body() body: AuthenticationLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, password } = body

    const user: User = await this.userDomainFacade
      .findOneByEmailWithPassword(email)
      .catch(() => this.exception.userEmailNotFound(email))

    await this.userDomainFacade
      .verifyPassword(user, password)
      .catch(() => this.exception.userPasswordNotFound(email))

    const token = this.authenticationDomainFacade.buildToken(user.id)

    const data = this.authenticationDomainFacade.setAccessToken(response, token)

    return data
  }

  @Post('/register')
@Authentication.Public()
async register(
  @Body() body: AuthenticationRegisterDto,
  @Res({ passthrough: true }) response: Response,
) {
  const { email, password, name } = body;

  const userExisting = await this.userDomainFacade.findOneByEmailOrFail(email).catch(() => {});

  if (userExisting) {
    this.exception.userEmailNotAvailable(email);
  }

  const accessToken = this.authenticationDomainFacade.buildToken(email);
  const passwordHashed = await this.userDomainFacade.hashPassword(password);
  const timestamp = moment().unix(); // Current timestamp in seconds

  const payload = {
    email: email,
    name: name,
    password: passwordHashed,
    timestamp,
  };

  console.log(payload);
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    'mysecret',
  ).toString();

  const verificationLink = `${process.env.SERVER_CLIENT_BASE_URL}/verify-email?data=${encodeURIComponent(ciphertext)}`;
  console.log(verificationLink, 'LINK');

  await this.emailService.send({
    type: this.emailService.Type.AUTHORIZATION_VERIFICATION_CODE,
    email: email,
    name: name ?? email,
    subject: `Verify your Account`,
    variables: {
      userName: name,
      verificationLink: verificationLink,
      expiration: '10',
    },
  });

  // Set the access token in the cookie
  this.cookieService.setAccessToken(response, accessToken);

  return this.service.throw({
    status: HttpStatus.ACCEPTED,
    code: 2,
    publicMessage: 'Verification email sent. Please check your inbox.',
  });
}


  @Post('/verify-email')
  @Authentication.Public()
  async verifyEmail(@Query() queryParams: any, @Res() response: Response) {
    try {
      // Log all incoming query parameters

      const encryptedData = queryParams?.data
      console.log('------?', encryptedData)
      if (!encryptedData) {
        throw new Error('No encrypted data provided')
      }

      const decodedData = decodeURIComponent(encryptedData)
      if (!decodedData) {
        throw new Error('Invalid encrypted data')
      }

      const bytes = CryptoJS.AES.decrypt(decodedData, 'mysecret')
      const decryptedString = bytes.toString(CryptoJS.enc.Utf8)

      if (!decryptedString) {
        throw new Error('Decryption failed, resulting in an empty string')
      }

      // Log the decrypted string for debugging purposes

      // Add a check to ensure the string is valid JSON
      let decryptedData
      try {
        decryptedData = JSON.parse(decryptedString)
      } catch (jsonError) {
        throw new Error('Decrypted string is not valid JSON')
      }

      const { email, name, password, timestamp } = decryptedData

      const currentTime = moment().unix() // Current timestamp in seconds
      const linkExpirationTime = 10 * 60 // 10 minutes in seconds

      if (currentTime - timestamp > linkExpirationTime) {
        return response.redirect(
          `${process.env.SERVER_CLIENT_BASE_URL}/verify-email?status=expired`,
        )
      }

      const userExisting = await this.userDomainFacade
        .findOneByEmailOrFail(email)
        .catch(() => {})

      // if (userExisting) {
      //   this.exception.userEmailNotAvailable(email)
      // }

      const user = await this.userDomainFacade.create({
        email,
        name,
        password,
      })

      await this.userDomainFacade.update(user, {
        status: UserStatus.VERIFIED,
      })

      const token = await this.authenticationDomainFacade.buildToken(user.id)

      await this.event.emit<AuthenticationApplicationEvent.UserRegistered.Payload>(
        AuthenticationApplicationEvent.UserRegistered.key,
        { userId: user.id },
      )

      const data = this.authenticationDomainFacade.setAccessToken(
        response,
        token,
      )

      return response.status(200).json({
        status: 'success',
        message: 'Email verified successfully',
        data: data,
      })
    } catch (error) {
      console.error('Error verifying email:', error.message)

      return response.status(500).json({
        status: 'error',
        message: 'An error occurred during verification',
      })
    }
  }

  @Post('/refresh')
  @Authentication.Public()
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = this.authenticationDomainFacade.getAccessToken(request)

    try {
      let userId: string

      try {
        const payload = this.authenticationDomainFacade.verifyTokenOrFail(token)
        userId = payload.email
      } catch (error) {
        this.exception.invalidAccessToken()
      }

      const user = await this.userDomainFacade.findOneByIdOrFail(userId)

      const tokenRefreshed = this.authenticationDomainFacade.buildToken(user.id)

      const data = this.authenticationDomainFacade.setAccessToken(
        response,
        tokenRefreshed,
      )

      return data
    } catch (error) {
      this.cookieService.deleteAccessToken(response)

      throw error
    }
  }

  @Post('/reset-password-email')
  @Authentication.Public()
  async sendEmailResetPassword(
    @Body() body: AuthenticationSendEmailResetPasswordDto,
  ) {
    const user = await this.userDomainFacade
      .findOneByEmailOrFail(body.email)
      .catch(() => null)

    if (!user) {
      this.logger.log(
        `${body.email} was not found. Reset password email skipped.`,
      )

      return {}
    }

    await this.event.emit<AuthenticationApplicationEvent.UserPasswordResetRequested.Payload>(
      AuthenticationApplicationEvent.UserPasswordResetRequested.key,
      { userId: user.id },
    )

    return {}
  }

  @Patch('/reset-password')
  @Authentication.Public()
  async resetPassword(@Body() body: AuthenticationResetPasswordDto) {
    const { userId } = await this.authenticationDomainFacade
      .verifyTokenResetPasswordOrFail(body.token)
      .catch(() => this.exception.invalidResetPasswordToken())

    const user = await this.userDomainFacade.findOneByIdOrFail(userId)

    const passwordHashed = await this.userDomainFacade.hashPassword(
      body.password,
    )

    await this.userDomainFacade.update(user, {
      password: passwordHashed,
    })
    return {}
  }

  @Post('/logout')
  @Authentication.Public()
  async logout(@Res({ passthrough: true }) response: Response) {
    try {
      this.cookieService.deleteAccessToken(response)
    } catch (error) {
      console.log(error)
    }

    return {}
  }
}
