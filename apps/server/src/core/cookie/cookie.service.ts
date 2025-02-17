import { Injectable } from '@nestjs/common'
import { CookieOptions, Request, Response } from 'express'
import {
  ConfigurationService,
  ConfigurationServiceObject,
} from '../configuration'

enum Key {
  ACCESS_TOKEN = 'APP_ACCESS_TOKEN',
}

const TIME_24_HOURS = 60 * 60 * 24 * 1000

@Injectable()
export class CookieService {
  constructor(private configurationService: ConfigurationService) {}

  getAccessToken(request: Request): string {
    console.log('Request Cookies:', request.cookies);
    const token = request.cookies[Key.ACCESS_TOKEN];
    console.log('Retrieved Token from Cookie:', token);
    return token;
  }
  
  setAccessToken(response: Response, token: string): void {
    const options = this.getOptions()

    response.cookie(Key.ACCESS_TOKEN, token, options)
  }

  deleteAccessToken(response: Response): void {
    response.clearCookie(Key.ACCESS_TOKEN)
  }

  private getOptions(): CookieOptions {
    const options: Record<ConfigurationServiceObject.Environment, CookieOptions> = {
      [ConfigurationServiceObject.Environment.DEVELOPMENT]: {
        maxAge: TIME_24_HOURS,
        secure: false, // Set to true if using HTTPS
        httpOnly: false, // Set to true for production
        sameSite: 'lax',
      },
      [ConfigurationServiceObject.Environment.PRODUCTION]: {
        maxAge: TIME_24_HOURS,
        secure: true,
        httpOnly: true,
        sameSite: 'none',
      },
    };
    

    const environment = this.configurationService.getEnvironment()

    const valueDefault =
      options[ConfigurationServiceObject.Environment.DEVELOPMENT]

    const value = options[environment]

    return value ?? valueDefault
  }
}
