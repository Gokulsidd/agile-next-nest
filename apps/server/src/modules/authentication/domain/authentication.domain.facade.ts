import { Injectable } from '@nestjs/common'
import {
  ConfigurationService,
  ConfigurationServiceObject,
} from '@server/core/configuration'
import { CookieService } from '@server/core/cookie'
import { RequestHelper } from '@server/helpers/request'
import { User } from '@server/modules/user/domain'
import { Request, Response } from 'express'
import * as Jwt from 'jsonwebtoken'

const TIME_24_HOURS = 60 * 60 * 24

@Injectable()
export class AuthenticationDomainFacade {
  constructor(
    private configurationService: ConfigurationService,
    private cookieService: CookieService,
  ) {}
  /* ---------------------------------- TOKEN --------------------------------- */
  buildToken(email: string): string {
    const payload = { email }
    const secret = this.getSecret()

    const token = Jwt.sign(payload, secret, { expiresIn: TIME_24_HOURS })
    return token
  }

  // getAccessToken(request: Request): string {
  //   if (
  //     this.configurationService.getAuthenticationTokenMethod() ===
  //     ConfigurationServiceObject.AuthenticationTokenMethod.COOKIES
  //   ) {
  //     return this.cookieService.getAccessToken(request)
  //   } else {
  //     return RequestHelper.getAuthorization(request)
  //   }
  // }
  getAccessToken(request: Request): string {
    console.log(
      'Token Method:',
      this.configurationService.getAuthenticationTokenMethod(),
    )
    let token
    if (
      this.configurationService.getAuthenticationTokenMethod() ===
      ConfigurationServiceObject.AuthenticationTokenMethod.COOKIES
    ) {
      token = this.cookieService.getAccessToken(request)
    } else {
      token = RequestHelper.getAuthorization(request)
    }
    console.log('Retrieved Token:', token)
    console.log(this.configurationService.getAuthenticationTokenMethod() ===
    ConfigurationServiceObject.AuthenticationTokenMethod.COOKIES)
    return token
  }

  setAccessToken(response: Response, token: string): { token?: string } {
    if (
      this.configurationService.getAuthenticationTokenMethod() ===
      ConfigurationServiceObject.AuthenticationTokenMethod.COOKIES
    ) {
      this.cookieService.setAccessToken(response, token)
      console.log(response, token , 'setAccess')
      return {}
    }

    return { token }
  }

  buildTokenResetPassword(user: User): string {
    const payload = { userId: user.id }
    const secret = this.getSecret()

    const token = Jwt.sign(payload, secret, { expiresIn: TIME_24_HOURS })

    return token
  }

  verifyTokenOrFail(token: string): { email: string } {
    const isError = typeof token !== 'string'
    if (isError) {
      throw new Error('Token must be defined')
    }

    const secret = this.getSecret()
    const payload = Jwt.verify(token, secret)

    return payload as { email: string }
  }

  async verifyTokenResetPasswordOrFail(
    token: string,
  ): Promise<{ userId: string }> {
    const isError = typeof token !== 'string'
    if (isError) {
      throw new Error('Token must be defined')
    }

    const secret = this.getSecret()
    const payload = Jwt.verify(token, secret)

    return payload as { userId: string }
  }

  assignRequestPayload(request: Request, payload: { user: User }): void {
    const store = { ...(request['store'] ?? {}) }

    store.authentication = {
      ...(store.authentication ?? {}),
      user: {
        id: payload.user.id,
        name: payload.user.name,
        email: payload.user.email,
      },
    }

    request['store'] = store
  }

  getRequestPayload(request: Request): {
    user: { id: string; name: string; email: string; requirementCount: number }
  } {
    return request['store']?.authentication ?? {}
  }

  private getSecret(): string {
    return this.configurationService.get('SERVER_AUTHENTICATION_SECRET')
  }
}
