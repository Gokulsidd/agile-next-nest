import { User } from '../user'

import { Historyentry } from '../historyentry'

export class History {
  id: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  historyentrys?: Historyentry[]
}
