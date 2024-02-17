import { config } from 'dotenv'
import { DataSource } from 'typeorm'
config()

export default new DataSource({
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/**/*.ts'],
  subscribers: ['dist/subscriber/**/*.ts'],
  dropSchema: false,
  synchronize: false,
})
