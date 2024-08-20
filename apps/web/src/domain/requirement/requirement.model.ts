import { User } from '../user'

import { Userstory } from '../userstory'

import { Historyentry } from '../historyentry'

export class Requirement {
  id: string

  title?: string

  description?: string

  givenDescription?: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  userstorys?: Userstory[]

  historyentrys?: Historyentry[]
}
