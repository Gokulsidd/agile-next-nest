import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Historyentry } from './historyentry.model'

import { History } from '../../history/domain'

import { Requirement } from '../../requirement/domain'

@Injectable()
export class HistoryentryDomainFacade {
  constructor(
    @InjectRepository(Historyentry)
    private repository: Repository<Historyentry>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Historyentry>): Promise<Historyentry> {
    return this.repository.save(values)
  }

  async update(
    item: Historyentry,
    values: Partial<Historyentry>,
  ): Promise<Historyentry> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Historyentry): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Historyentry> = {},
  ): Promise<Historyentry[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Historyentry> = {},
  ): Promise<Historyentry> {
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

  async findManyByHistory(
    item: History,
    queryOptions: RequestHelper.QueryOptions<Historyentry> = {},
  ): Promise<Historyentry[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('history')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        historyId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByRequirement(
    item: Requirement,
    queryOptions: RequestHelper.QueryOptions<Historyentry> = {},
  ): Promise<Historyentry[]> {
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
