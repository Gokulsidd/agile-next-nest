import { Requirement } from '../requirement'

export class Userstory {
  id: string

  text?: string

  requirementId: string

  requirement?: Requirement

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
