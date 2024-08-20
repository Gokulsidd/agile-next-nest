import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Requirement } from './requirement.model'

export class RequirementApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Requirement>,
  ): Promise<Requirement[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/requirements${buildOptions}`)
  }

  static findOne(
    requirementId: string,
    queryOptions?: ApiHelper.QueryOptions<Requirement>,
  ): Promise<Requirement> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/requirements/${requirementId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Requirement>): Promise<Requirement> {
    return HttpService.api.post(`/v1/requirements`, values)
  }

  static updateOne(
    requirementId: string,
    values: Partial<Requirement>,
  ): Promise<Requirement> {
    return HttpService.api.patch(`/v1/requirements/${requirementId}`, values)
  }

  static deleteOne(requirementId: string): Promise<void> {
    return HttpService.api.delete(`/v1/requirements/${requirementId}`)
  }

  static 
  findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Requirement>,
  ): Promise<Requirement[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/requirements${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Requirement>,
  ): Promise<Requirement> {
    return HttpService.api.post(`/v1/users/user/${userId}/requirements`, values)
  }

  
  static findById(
    requirementId: string,
    queryOptions?: ApiHelper.QueryOptions<Requirement>,
  ): Promise<Requirement[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/users/user/requirements/${requirementId}`)

  }
}
