import { Resume } from 'src/resume/entities/resume.entity'
import { User } from 'src/user/entities/user.entity'
import { Vacancy } from 'src/vacancy/entities/vacancy.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
@Unique(['user', 'vacancy'])
export class Response {
  @PrimaryGeneratedColumn({ name: 'response_id' })
  id: number

  @Column({ default: '' })
  status: string

  @ManyToOne(() => Vacancy, vacancy => vacancy.responses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vacancy_id' })
  vacancy: Vacancy

  @ManyToOne(() => Resume, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'resume_id' })
  resume: Resume

  @ManyToOne(() => User, user => user.responses)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ nullable: true })
  message: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
