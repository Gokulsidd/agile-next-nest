import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { HistoryentryDomainFacade } from '@server/modules/historyentry/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { HistoryentryApplicationEvent } from './historyentry.application.event'
import { HistoryentryCreateDto } from './historyentry.dto'

import { RequirementDomainFacade } from '../../requirement/domain'

@Controller('/v1/requirements')
export class HistoryentryByRequirementController {
  constructor(
    private requirementDomainFacade: RequirementDomainFacade,

    private historyentryDomainFacade: HistoryentryDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/requirement/:requirementId/historyentrys')
  async findManyRequirementId(
    @Param('requirementId') requirementId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.requirementDomainFacade.findOneByIdOrFail(requirementId)

    const items = await this.historyentryDomainFacade.findManyByRequirement(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/requirement/:requirementId/historyentrys')
  async createByRequirementId(
    @Param('requirementId') requirementId: string,
    @Body() body: HistoryentryCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, requirementId }

    const item = await this.historyentryDomainFacade.create(valuesUpdated)

    await this.eventService.emit<HistoryentryApplicationEvent.HistoryentryCreated.Payload>(
      HistoryentryApplicationEvent.HistoryentryCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
