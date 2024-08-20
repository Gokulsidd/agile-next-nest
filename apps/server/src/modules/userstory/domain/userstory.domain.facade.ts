import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Userstory } from './userstory.model'

import { Requirement } from '../../requirement/domain'

@Injectable()
export class UserstoryDomainFacade {
  constructor(
    @InjectRepository(Userstory)
    private repository: Repository<Userstory>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Userstory>): Promise<Userstory> {
    return this.repository.save(values)
  }

  async update(
    item: Userstory,
    values: Partial<Userstory>,
  ): Promise<Userstory> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Userstory): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Userstory> = {},
  ): Promise<Userstory[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Userstory> = {},
  ): Promise<Userstory> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByRequirement(
    item: Requirement,
    queryOptions: RequestHelper.QueryOptions<Userstory> = {},
  ): Promise<Userstory[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('requirement')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        requirementId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
