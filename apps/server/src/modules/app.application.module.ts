import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { RequirementApplicationModule } from './requirement/application'

import { UserstoryApplicationModule } from './userstory/application'

import { HistoryApplicationModule } from './history/application'

import { HistoryentryApplicationModule } from './historyentry/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    RequirementApplicationModule,

    UserstoryApplicationModule,

    HistoryApplicationModule,

    HistoryentryApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
