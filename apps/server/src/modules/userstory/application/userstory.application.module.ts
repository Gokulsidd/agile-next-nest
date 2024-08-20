import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { UserstoryDomainModule } from '../domain'
import { UserstoryController } from './userstory.controller'

import { RequirementDomainModule } from '../../../modules/requirement/domain'

import { UserstoryByRequirementController } from './userstoryByRequirement.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    UserstoryDomainModule,

    RequirementDomainModule,
  ],
  controllers: [UserstoryController, UserstoryByRequirementController],
  providers: [],
})
export class UserstoryApplicationModule {}
