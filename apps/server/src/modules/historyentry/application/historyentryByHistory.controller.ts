import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { HistoryentryDomainFacade } from '@server/modules/historyentry/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { HistoryentryApplicationEvent } from './historyentry.application.event'
import { HistoryentryCreateDto } from './historyentry.dto'

import { HistoryDomainFacade } from '../../history/domain'

@Controller('/v1/historys')
export class HistoryentryByHistoryController {
  constructor(
    private historyDomainFacade: HistoryDomainFacade,

    private historyentryDomainFacade: HistoryentryDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/history/:historyId/historyentrys')
  async findManyHistoryId(
    @Param('historyId') historyId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.historyDomainFacade.findOneByIdOrFail(historyId)

    const items = await this.historyentryDomainFacade.findManyByHistory(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/history/:historyId/historyentrys')
  async createByHistoryId(
    @Param('historyId') historyId: string,
    @Body() body: HistoryentryCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, historyId }

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
