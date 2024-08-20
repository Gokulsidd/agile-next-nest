import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { RequirementApi } from './requirement/requirement.api'

import { UserstoryApi } from './userstory/userstory.api'

import { HistoryApi } from './history/history.api'

import { HistoryentryApi } from './historyentry/historyentry.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Requirement extends RequirementApi {}

  export class Userstory extends UserstoryApi {}

  export class History extends HistoryApi {}

  export class Historyentry extends HistoryentryApi {}
}
