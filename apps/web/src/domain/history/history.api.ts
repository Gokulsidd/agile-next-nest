import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { History } from './history.model'

export class HistoryApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<History>,
  ): Promise<History[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/historys${buildOptions}`)
  }

  static findOne(
    historyId: string,
    queryOptions?: ApiHelper.QueryOptions<History>,
  ): Promise<History> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/historys/${historyId}${buildOptions}`)
  }

  static createOne(values: Partial<History>): Promise<History> {
    return HttpService.api.post(`/v1/historys`, values)
  }

  static updateOne(
    historyId: string,
    values: Partial<History>,
  ): Promise<History> {
    return HttpService.api.patch(`/v1/historys/${historyId}`, values)
  }

  static deleteOne(historyId: string): Promise<void> {
    return HttpService.api.delete(`/v1/historys/${historyId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<History>,
  ): Promise<History[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/historys${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<History>,
  ): Promise<History> {
    return HttpService.api.post(`/v1/users/user/${userId}/historys`, values)
  }
}
