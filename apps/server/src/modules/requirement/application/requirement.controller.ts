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
  Requirement,
  RequirementDomainFacade,
} from '@server/modules/requirement/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { RequirementApplicationEvent } from './requirement.application.event'
import { RequirementCreateDto, RequirementUpdateDto } from './requirement.dto'

@Controller('/v1/requirements')
export class RequirementController {
  constructor(
    private eventService: EventService,
    private requirementDomainFacade: RequirementDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.requirementDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: RequirementCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.requirementDomainFacade.create(body)

    await this.eventService.emit<RequirementApplicationEvent.RequirementCreated.Payload>(
      RequirementApplicationEvent.RequirementCreated.key,
      {
        id: item?.id,
        userId: user.id,
        title:item?.title,
        description: item?.description
      },
    )

    return item
  }

  @Get('/:requirementId')
  async findOne(
    @Param('requirementId') requirementId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.requirementDomainFacade.findOneByIdOrFail(
      requirementId,
      queryOptions,
    )

    return item
  }

  @Patch('/:requirementId')
  async update(
    @Param('requirementId') requirementId: string,
    @Body() body: RequirementUpdateDto,
  ) {
    const item =
      await this.requirementDomainFacade.findOneByIdOrFail(requirementId)

    const itemUpdated = await this.requirementDomainFacade.update(
      item,
      body as Partial<Requirement>,
    )
    return itemUpdated
  }

  @Delete('/:requirementId')
  async delete(@Param('requirementId') requirementId: string) {
    const item =
      await this.requirementDomainFacade.findOneByIdOrFail(requirementId)

    await this.requirementDomainFacade.delete(item)

    return item
  }
}
