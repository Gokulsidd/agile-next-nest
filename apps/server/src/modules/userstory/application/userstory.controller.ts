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
  Userstory,
  UserstoryDomainFacade,
} from '@server/modules/userstory/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { UserstoryApplicationEvent } from './userstory.application.event'
import { UserstoryCreateDto, UserstoryUpdateDto } from './userstory.dto'

@Controller('/v1/userstorys')
export class UserstoryController {
  constructor(
    private eventService: EventService,
    private userstoryDomainFacade: UserstoryDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.userstoryDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: UserstoryCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.userstoryDomainFacade.create(body)

    await this.eventService.emit<UserstoryApplicationEvent.UserstoryCreated.Payload>(
      UserstoryApplicationEvent.UserstoryCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:userstoryId')
  async findOne(
    @Param('userstoryId') userstoryId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.userstoryDomainFacade.findOneByIdOrFail(
      userstoryId,
      queryOptions,
    )

    return item
  }

  @Patch('/:userstoryId')
  async update(
    @Param('userstoryId') userstoryId: string,
    @Body() body: UserstoryUpdateDto,
  ) {
    const item = await this.userstoryDomainFacade.findOneByIdOrFail(userstoryId)

    const itemUpdated = await this.userstoryDomainFacade.update(
      item,
      body as Partial<Userstory>,
    )
    return itemUpdated
  }

  @Delete('/:userstoryId')
  async delete(@Param('userstoryId') userstoryId: string) {
    const item = await this.userstoryDomainFacade.findOneByIdOrFail(userstoryId)

    await this.userstoryDomainFacade.delete(item)

    return item
  }
}
