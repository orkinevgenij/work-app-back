import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
@Entity()
export class Resume {
  @PrimaryGeneratedColumn({ name: 'resume_id' })
  id: number

  @Column()
  name: string

  @Column()
  lastname: string

  @Column()
  city: string

  @Column()
  salary: number

  @Column({ nullable: true })
  email: string

  @Column()
  position: string

  @Column()
  phone: string

  @Column()
  profile: string

  @Column({ name: 'user_id' })
  user: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
