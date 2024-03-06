import { User } from 'src/user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Chat {
  @PrimaryGeneratedColumn({ name: 'chat_id' })
  id: number

  @Column()
  message: string

  @Column({ name: 'response_id' })
  responseId: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => User, user => user.messages)
  @JoinColumn({ name: 'user_id' })
  user: User
}
