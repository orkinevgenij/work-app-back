import { Vacancy } from 'src/vacancy/entities/vacancy.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(()=>Vacancy,vacancy=>vacancy.city)
  vacancies:Vacancy[]

}
