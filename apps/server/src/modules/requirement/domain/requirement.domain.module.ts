import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { RequirementDomainFacade } from './requirement.domain.facade'
import { Requirement } from './requirement.model'

@Module({
  imports: [TypeOrmModule.forFeature([Requirement]), DatabaseHelperModule],
  providers: [RequirementDomainFacade, RequirementDomainFacade],
  exports: [RequirementDomainFacade],
})
export class RequirementDomainModule {}
