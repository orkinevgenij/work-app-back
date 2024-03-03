import { Resume } from 'src/resume/entities/resume.entity'
import { Vacancy } from 'src/vacancy/entities/vacancy.entity'
import {
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Offer {
  @PrimaryGeneratedColumn({ name: 'offer_id' })
  id: number

  @Column()
  message: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => Resume, resume => resume.offers)
  @JoinColumn({ name: 'resume_id' })
  resume: Resume

  @ManyToOne(() => Vacancy, vacancy => vacancy.offers)
  @JoinColumn({ name: 'vacancy_id' })
  vacancy: Vacancy
}
