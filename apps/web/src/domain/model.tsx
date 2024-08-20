import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Requirement as RequirementModel } from './requirement/requirement.model'

import { Userstory as UserstoryModel } from './userstory/userstory.model'

import { History as HistoryModel } from './history/history.model'

import { Historyentry as HistoryentryModel } from './historyentry/historyentry.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Requirement extends RequirementModel {}

  export class Userstory extends UserstoryModel {}

  export class History extends HistoryModel {}

  export class Historyentry extends HistoryentryModel {}
}
