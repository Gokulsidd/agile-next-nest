import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { HistoryentryDomainModule } from '../domain'
import { HistoryentryController } from './historyentry.controller'

import { HistoryDomainModule } from '../../../modules/history/domain'

import { HistoryentryByHistoryController } from './historyentryByHistory.controller'

import { RequirementDomainModule } from '../../../modules/requirement/domain'

import { HistoryentryByRequirementController } from './historyentryByRequirement.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    HistoryentryDomainModule,

    HistoryDomainModule,

    RequirementDomainModule,
  ],
  controllers: [
    HistoryentryController,

    HistoryentryByHistoryController,

    HistoryentryByRequirementController,
  ],
  providers: [],
})
export class HistoryentryApplicationModule {}
