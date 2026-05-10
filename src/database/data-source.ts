import { config } from 'dotenv'
import { DataSource } from 'typeorm'

config()

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
  subscribers: ['dist/subscriber/*.js'],
  synchronize: false,
})
