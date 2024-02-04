import {
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Company } from '../../company/entities/company.entity'
import { Response } from 'src/response/entities/response.entity'
import { Exclude } from 'class-transformer'
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  lastname: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column()
  phone: string

  @Column()
  role: string

  @OneToMany(() => Company, company => company.user)
  companies: Company[]

  @OneToMany(() => Response, response => response.user)
  responses: Response[]

  @BeforeUpdate()
  async hashPassword() {
    const saltOrRounds = 10
    this.password = await bcrypt.hash(this.password, saltOrRounds)
  }
}