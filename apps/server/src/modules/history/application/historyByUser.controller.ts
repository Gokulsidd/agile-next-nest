import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { HistoryDomainFacade } from '@server/modules/history/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { HistoryApplicationEvent } from './history.application.event'
import { HistoryCreateDto } from './history.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class HistoryByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private historyDomainFacade: HistoryDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/historys')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.historyDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/historys')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: HistoryCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.historyDomainFacade.create(valuesUpdated)

    await this.eventService.emit<HistoryApplicationEvent.HistoryCreated.Payload>(
      HistoryApplicationEvent.HistoryCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
