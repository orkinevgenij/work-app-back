import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from '../../user/entities/user.entity'
import { Vacancy } from '../../vacancy/entities/vacancy.entity'
@Entity()
export class Company {
  @PrimaryGeneratedColumn({ name: 'company_id' })
  id: number

  @Column({ nullable: false })
  title: string

  @Column({ nullable: false })
  description: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => User, user => user.companies, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user: User

  @OneToMany(() => Vacancy, vacancy => vacancy.company)
  vacancies: Vacancy[]
}
