import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { HistoryentryDomainFacade } from './historyentry.domain.facade'
import { Historyentry } from './historyentry.model'

@Module({
  imports: [TypeOrmModule.forFeature([Historyentry]), DatabaseHelperModule],
  providers: [HistoryentryDomainFacade, HistoryentryDomainFacade],
  exports: [HistoryentryDomainFacade],
})
export class HistoryentryDomainModule {}
