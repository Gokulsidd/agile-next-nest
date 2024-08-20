import { Notification } from '../notification'

import { Requirement } from '../requirement'

import { History } from '../history'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email: string
  status: UserStatus
  name: string
  pictureUrl: string
  password: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  requirements?: Requirement[]

  historys?: History[]
}
