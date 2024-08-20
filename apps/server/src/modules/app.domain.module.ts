import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { RequirementDomainModule } from './requirement/domain'

import { UserstoryDomainModule } from './userstory/domain'

import { HistoryDomainModule } from './history/domain'

import { HistoryentryDomainModule } from './historyentry/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    RequirementDomainModule,

    UserstoryDomainModule,

    HistoryDomainModule,

    HistoryentryDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
