import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { UserstoryDomainFacade } from './userstory.domain.facade'
import { Userstory } from './userstory.model'

@Module({
  imports: [TypeOrmModule.forFeature([Userstory]), DatabaseHelperModule],
  providers: [UserstoryDomainFacade, UserstoryDomainFacade],
  exports: [UserstoryDomainFacade],
})
export class UserstoryDomainModule {}
