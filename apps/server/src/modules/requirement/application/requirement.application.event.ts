export namespace RequirementApplicationEvent {
  export namespace RequirementCreated {
    export const key = 'requirement.application.requirement.created'

    export type Payload = {
      id: string
      userId: string
      title: string
      description: string
    }
  }
}
