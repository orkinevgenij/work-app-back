import { IsString } from 'class-validator'
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

// enum ResponseStatus {
//   UNVIEWED = 'Не переглянуто',
//   VIEWED = 'Переглянуто',
//   INTERVIEW = 'Співбесіда',
//   REFUSAL = 'Відмова',
// }
export type ResponseStatus =
  | 'Не переглянуто'
  | 'Переглянуто'
  | 'Співбесіда'
  | 'Відмова'

@Entity()
@Unique(['user', 'vacancy'])
export class Response {
  @PrimaryGeneratedColumn({ name: 'response_id' })
  id: number

  @Column({
    type: 'enum',
    enum: ['Не переглянуто', 'Переглянуто', 'Співбесіда', 'Відмова'],
    default: ['Переглянуто'],
  })
  status: ResponseStatus

  @ManyToOne(() => Vacancy, vacancy => vacancy.responses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vacancy_id' })
  vacancy: Vacancy

  @ManyToOne(() => User, user => user.responses)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Resume, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'resume_id' })
  resume: Resume

  @Column({ nullable: true })
  coverLetter: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}