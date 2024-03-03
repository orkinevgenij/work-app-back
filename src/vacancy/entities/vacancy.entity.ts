import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { Company } from '../../company/entities/company.entity'
import { Category } from 'src/category/entities/category.entity'
import { City } from 'src/city/entities/city.entity'
import { Response } from 'src/response/entities/response.entity'
import { Offer } from 'src/offer/entities/offer.entity'

@Entity()
export class Vacancy {
  @PrimaryGeneratedColumn({ name: 'vacancy_id' })
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  salary: number

  @Column({ nullable: true, default: 0 })
  views: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => Company, company => company.vacancies, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'company_id' })
  company: Company

  @ManyToOne(() => Category, category => category.vacancies, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @ManyToOne(() => City, city => city.vacancies, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'city_id' })
  city: City

  @OneToMany(() => Response, response => response.vacancy)
  responses: Response[]
  @OneToMany(() => Offer, offer => offer.vacancy)
  offers: Offer[]
}
