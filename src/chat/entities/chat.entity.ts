import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Chat {
  @PrimaryGeneratedColumn({ name: 'chat_id' })
  id: number

  @Column()
  message: string

  @Column()
  author: string

  @Column({ name: 'offer_id' })
  offerId: number
  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
