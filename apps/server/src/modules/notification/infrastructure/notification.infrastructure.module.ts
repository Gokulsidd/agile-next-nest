import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationRequirementSubscriber } from './subscribers/notification.requirement.subscriber'

import { NotificationUserstorySubscriber } from './subscribers/notification.userstory.subscriber'

import { NotificationHistorySubscriber } from './subscribers/notification.history.subscriber'

import { NotificationHistoryentrySubscriber } from './subscribers/notification.historyentry.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationRequirementSubscriber,

    NotificationUserstorySubscriber,

    NotificationHistorySubscriber,

    NotificationHistoryentrySubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
