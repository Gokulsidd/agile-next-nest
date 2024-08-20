import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { RequirementDomainModule } from '../domain'
import { RequirementController } from './requirement.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { RequirementByUserController } from './requirementByUser.controller'
import { RequirementApplicationException } from './requirement.application.exception'

@Module({
  imports: [
    AuthenticationDomainModule,
    RequirementDomainModule,

    UserDomainModule,
  ],
  controllers: [RequirementController, RequirementByUserController],
  providers: [RequirementApplicationException],
})
export class RequirementApplicationModule {}
