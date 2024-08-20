import { History } from '../history'

import { Requirement } from '../requirement'

export class Historyentry {
  id: string

  timestamp?: string

  historyId: string

  history?: History

  requirementId: string

  requirement?: Requirement

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
