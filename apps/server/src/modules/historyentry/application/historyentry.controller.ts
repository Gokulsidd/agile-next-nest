import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import {
  Historyentry,
  HistoryentryDomainFacade,
} from '@server/modules/historyentry/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { HistoryentryApplicationEvent } from './historyentry.application.event'
import {
  HistoryentryCreateDto,
  HistoryentryUpdateDto,
} from './historyentry.dto'

@Controller('/v1/historyentrys')
export class HistoryentryController {
  constructor(
    private eventService: EventService,
    private historyentryDomainFacade: HistoryentryDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.historyentryDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: HistoryentryCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.historyentryDomainFacade.create(body)

    await this.eventService.emit<HistoryentryApplicationEvent.HistoryentryCreated.Payload>(
      HistoryentryApplicationEvent.HistoryentryCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:historyentryId')
  async findOne(
    @Param('historyentryId') historyentryId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.historyentryDomainFacade.findOneByIdOrFail(
      historyentryId,
      queryOptions,
    )

    return item
  }

  @Patch('/:historyentryId')
  async update(
    @Param('historyentryId') historyentryId: string,
    @Body() body: HistoryentryUpdateDto,
  ) {
    const item =
      await this.historyentryDomainFacade.findOneByIdOrFail(historyentryId)

    const itemUpdated = await this.historyentryDomainFacade.update(
      item,
      body as Partial<Historyentry>,
    )
    return itemUpdated
  }

  @Delete('/:historyentryId')
  async delete(@Param('historyentryId') historyentryId: string) {
    const item =
      await this.historyentryDomainFacade.findOneByIdOrFail(historyentryId)

    await this.historyentryDomainFacade.delete(item)

    return item
  }
}
