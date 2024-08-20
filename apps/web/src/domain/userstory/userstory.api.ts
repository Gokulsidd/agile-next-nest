import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Userstory } from './userstory.model'

export class UserstoryApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Userstory>,
  ): Promise<Userstory[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/userstorys${buildOptions}`)
  }

  static findOne(
    userstoryId: string,
    queryOptions?: ApiHelper.QueryOptions<Userstory>,
  ): Promise<Userstory> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/userstorys/${userstoryId}${buildOptions}`)
  }

  static createOne(values: Partial<Userstory>): Promise<Userstory> {
    return HttpService.api.post(`/v1/userstorys`, values)
  }

  static updateOne(
    userstoryId: string,
    values: Partial<Userstory>,
  ): Promise<Userstory> {
    return HttpService.api.patch(`/v1/userstorys/${userstoryId}`, values)
  }

  static deleteOne(userstoryId: string): Promise<void> {
    return HttpService.api.delete(`/v1/userstorys/${userstoryId}`)
  }

  static findManyByRequirementId(
    requirementId: string,
    queryOptions?: ApiHelper.QueryOptions<Userstory>,
  ): Promise<Userstory[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/requirements/requirement/${requirementId}/userstorys${buildOptions}`,
    )
  }

  static createOneByRequirementId(
    requirementId: string,
    values: Partial<Userstory>,
  ): Promise<Userstory> {
    return HttpService.api.post(
      `/v1/requirements/requirement/${requirementId}/userstorys`,
      values,
    )
  }
}
