export namespace HistoryentryApplicationEvent {
  export namespace HistoryentryCreated {
    export const key = 'historyentry.application.historyentry.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
