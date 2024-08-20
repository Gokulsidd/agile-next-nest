import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { History } from '../../../modules/history/domain'
import { Notification } from '../../../modules/notification/domain'
import { Requirement } from '../../../modules/requirement/domain'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  CREATED = 'CREATED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  name: string

  @Column({ nullable: true })
  pictureUrl?: string

  @Column({ select: false, nullable: true })
  password: string

  @Column({ enum: UserStatus, default: UserStatus.CREATED })
  status: UserStatus

  @OneToMany(() => Requirement, child => child.user)
  requirements?: Requirement[]

  @OneToMany(() => History, child => child.user)
  historys?: History[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @Column({ default: 0 }) // New property to store requirement count
  requirementCount: number

  @Column({ default: false })
  isPremiumUser: boolean

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string

  @Column({ nullable: true, select: false })
  stripeCustomerId?: string

  // Method to update requirement count
  updateRequirementCount() {
    if (this.requirements) {
      this.requirementCount = this.requirements.length
    } else {
      this.requirementCount = 0
    }
  }
}
