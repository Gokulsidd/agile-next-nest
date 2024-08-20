import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { User } from '../../../modules/user/domain'

import { Historyentry } from '../../../modules/historyentry/domain'

@Entity()
export class History {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.historys)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => Historyentry, child => child.history)
  historyentrys?: Historyentry[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
