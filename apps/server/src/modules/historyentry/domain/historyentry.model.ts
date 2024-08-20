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

import { History } from '../../../modules/history/domain'

import { Requirement } from '../../../modules/requirement/domain'

@Entity()
export class Historyentry {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  timestamp?: string

  @Column({})
  historyId: string

  @ManyToOne(() => History, parent => parent.historyentrys)
  @JoinColumn({ name: 'historyId' })
  history?: History

  @Column({})
  requirementId: string

  @ManyToOne(() => Requirement, parent => parent.historyentrys)
  @JoinColumn({ name: 'requirementId' })
  requirement?: Requirement

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
