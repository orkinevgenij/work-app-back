import {
  Column,
  CreateDateColumn,
  Entity,
  IsNull,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
@Entity()
export class Resume {
  @PrimaryGeneratedColumn({ name: 'resume_id' })
  id: number

  @Column({ nullable: true })
  name: string

  @Column({ nullable: true })
  lastname: string

  @Column({ nullable: true })
  age: string

  @Column({ nullable: true })
  city: string

  @Column({ nullable: true })
  salary: number

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  position: string

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  profile: string

  @Column({ type: 'jsonb', nullable: true })
  avatar: {
    url: string
    public_id: string
  }

  @Column({ type: 'jsonb', nullable: true })
  file: {
    url: string
    public_id: string
  }

  @Column({ name: 'user_id' })
  user: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
