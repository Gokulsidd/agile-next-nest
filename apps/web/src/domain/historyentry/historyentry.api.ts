import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Historyentry } from './historyentry.model'

export class HistoryentryApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Historyentry>,
  ): Promise<Historyentry[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/historyentrys${buildOptions}`)
  }

  static findOne(
    historyentryId: string,
    queryOptions?: ApiHelper.QueryOptions<Historyentry>,
  ): Promise<Historyentry> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/historyentrys/${historyentryId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Historyentry>): Promise<Historyentry> {
    return HttpService.api.post(`/v1/historyentrys`, values)
  }

  static updateOne(
    historyentryId: string,
    values: Partial<Historyentry>,
  ): Promise<Historyentry> {
    return HttpService.api.patch(`/v1/historyentrys/${historyentryId}`, values)
  }

  static deleteOne(historyentryId: string): Promise<void> {
    return HttpService.api.delete(`/v1/historyentrys/${historyentryId}`)
  }

  static findManyByHistoryId(
    historyId: string,
    queryOptions?: ApiHelper.QueryOptions<Historyentry>,
  ): Promise<Historyentry[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/historys/history/${historyId}/historyentrys${buildOptions}`,
    )
  }

  static createOneByHistoryId(
    historyId: string,
    values: Partial<Historyentry>,
  ): Promise<Historyentry> {
    return HttpService.api.post(
      `/v1/historys/history/${historyId}/historyentrys`,
      values,
    )
  }

  static findManyByRequirementId(
    requirementId: string,
    queryOptions?: ApiHelper.QueryOptions<Historyentry>,
  ): Promise<Historyentry[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/requirements/requirement/${requirementId}/historyentrys${buildOptions}`,
    )
  }

  static createOneByRequirementId(
    requirementId: string,
    values: Partial<Historyentry>,
  ): Promise<Historyentry> {
    return HttpService.api.post(
      `/v1/requirements/requirement/${requirementId}/historyentrys`,
      values,
    )
  }
}
