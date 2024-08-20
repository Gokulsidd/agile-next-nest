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

import { Userstory } from '../../../modules/userstory/domain'

import { Historyentry } from '../../../modules/historyentry/domain'

@Entity()
export class Requirement {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  title?: string

  @Column({ nullable: true })
  description?: string

  @Column({ nullable: true })
  givenDescription?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.requirements)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => Userstory, child => child.requirement)
  userstorys?: Userstory[]

  @OneToMany(() => Historyentry, child => child.requirement)
  historyentrys?: Historyentry[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
