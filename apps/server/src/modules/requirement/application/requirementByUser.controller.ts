import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequirementDomainFacade } from '@server/modules/requirement/domain'
import { RequirementApplicationEvent } from './requirement.application.event'
import { RequirementCreateDto } from './requirement.dto'

import { UserDomainFacade } from '../../user/domain'
import { RequirementApplicationException } from './requirement.application.exception'

@Controller('/v1/users')
export class RequirementByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,
    private exception: RequirementApplicationException,
    private requirementDomainFacade: RequirementDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/requirements')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.requirementDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Get('/user/requirements/:reqId')
  async findById(@Param('reqId') reqId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)
    const items = await this.requirementDomainFacade.findOneByIdOrFail(
      reqId,
      queryOptions,
    )
    return items
  }

  @Post('/user/:userId/requirements')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: RequirementCreateDto,
    @Req() request: Request,
  ) {
    const user = await this.userDomainFacade.findOneByIdOrFail(userId)
    const valuesUpdated = { ...body, userId }
    // if (user.requirementCount >= 5) {
    //   this.exception.requirementLimitExceeded()
    // }
    const item = await this.requirementDomainFacade.create(valuesUpdated)

    user.requirementCount++

    await this.userDomainFacade.update(user, {
      requirementCount: user.requirementCount,
    })

    await this.eventService.emit<RequirementApplicationEvent.RequirementCreated.Payload>(
      RequirementApplicationEvent.RequirementCreated.key,
      {
        id: item.id,
        userId: user.id,
        title: item.title,
        description: item.description.trim(),
      },
    )

    return item
  }
}
