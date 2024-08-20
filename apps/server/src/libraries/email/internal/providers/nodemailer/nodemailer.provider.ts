import { Injectable } from '@nestjs/common'
import * as NodemailerSDK from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { ConfigurationService } from '../../../../../core/configuration'
import { Logger, LoggerService } from '../../../../logger'
import { EmailSender } from '../../email.type'
import { EmailTemplateService } from '../../templates/email.template.service'
import { Provider, SendOptions } from '../provider'

@Injectable()
export class NodemailerProvider implements Provider {
  private logger: Logger
  private client: Mail

  constructor(
    private loggerService: LoggerService,
    private configurationService: ConfigurationService,
    private templateService: EmailTemplateService,
  ) {
    this.logger = this.loggerService.create({ name: 'NodemailerProvider' })

    this.initialise()
  }

  private initialise() {
    try {
      const host = 'smtp.gmail.com'

      const port = 465

      this.client = NodemailerSDK.createTransport({
        host,
        port,
        secure: true, // update as needed
        auth: {
          user: process.env.SERVER_GMAIL_USERNAME,
          pass: process.env.SERVER_GMAIL_AUTH_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false, // You can set this to true in production
        },
        connectionTimeout: 10 * 1000, // 10 seconds timeout
        socketTimeout: 10 * 1000, // 10 seconds timeout
      })

      console.log(process.env.SERVER_GMAIL_USERNAME)

      this.logger.success(`Nodemailer is active (${host}:${port})`)
    } catch (error) {
      this.logger.error(`Nodemailer failed to start: ${error.message}`)
    }
  }

  async send(options: SendOptions): Promise<void> {
    const from = EmailSender.default

    const content = this.templateService.get(options)
    for (const to of options.to) {
      await this.client
        .sendMail({
          from: `${from.name} <${from.email}>`,
          to: to.email,
          subject: options.subject,
          html: content,
        })
        .then(result => {
          this.logger.log(`Emails sent`)
        })
        .catch(error => {
          this.logger.error(`Could not send emails (${error.statusCode})`)
          this.logger.error(error)
        })
    }
  }
}
