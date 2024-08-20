import { HttpStatus, Injectable } from '@nestjs/common'
import { ExceptionService } from '@server/core/exception'

@Injectable()
export class RequirementApplicationException {
  constructor(private service: ExceptionService) {}

  requirementLimitExceeded() {
    return this.service.throw({
      status: HttpStatus.FORBIDDEN,
      code: 1,
      publicMessage:
        'Requirement Limite Exceeded. Please Upgrade Your Plan...!',
    })
  }
}
