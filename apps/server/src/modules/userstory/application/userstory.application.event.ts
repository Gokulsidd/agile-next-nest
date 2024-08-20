export namespace UserstoryApplicationEvent {
  export namespace UserstoryCreated {
    export const key = 'userstory.application.userstory.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
