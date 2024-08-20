import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { HistoryDomainModule } from '../domain'
import { HistoryController } from './history.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { HistoryByUserController } from './historyByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, HistoryDomainModule, UserDomainModule],
  controllers: [HistoryController, HistoryByUserController],
  providers: [],
})
export class HistoryApplicationModule {}
