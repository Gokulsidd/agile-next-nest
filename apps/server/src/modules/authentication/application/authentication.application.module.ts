import { Module } from '@nestjs/common'
import { GoogleModule } from '../../../libraries/google'
import { EmailModule } from '@server/libraries/email/email.module'
import { UserDomainModule } from '../../../modules/user/domain'
import { AuthenticationDomainModule } from '../domain'
import { AuthenticationApplicationException } from './authentication.application.exception'
import { AuthenticationController } from './authentication.controller'
import { GoogleByAuthenticationController } from './authentication.google.controller'

@Module({
  imports: [AuthenticationDomainModule, UserDomainModule, GoogleModule,EmailModule],
  controllers: [AuthenticationController, GoogleByAuthenticationController],
  providers: [AuthenticationApplicationException],
  exports: [],
})
export class AuthenticationApplicationModule {}
