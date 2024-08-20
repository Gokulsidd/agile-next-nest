import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { UserstoryDomainFacade } from '@server/modules/userstory/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { UserstoryApplicationEvent } from './userstory.application.event'
import { UserstoryCreateDto } from './userstory.dto'

import { RequirementDomainFacade } from '../../requirement/domain'

@Controller('/v1/requirements')
export class UserstoryByRequirementController {
  constructor(
    private requirementDomainFacade: RequirementDomainFacade,

    private userstoryDomainFacade: UserstoryDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/requirement/:requirementId/userstorys')
  async findManyRequirementId(
    @Param('requirementId') requirementId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.requirementDomainFacade.findOneByIdOrFail(requirementId)

    const items = await this.userstoryDomainFacade.findManyByRequirement(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/requirement/:requirementId/userstorys')
  async createByRequirementId(
    @Param('requirementId') requirementId: string,
    @Body() body: UserstoryCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, requirementId }

    const item = await this.userstoryDomainFacade.create(valuesUpdated)

    await this.eventService.emit<UserstoryApplicationEvent.UserstoryCreated.Payload>(
      UserstoryApplicationEvent.UserstoryCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
