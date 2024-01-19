import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { CityModule } from './city/city.module'
import { CompanyModule } from './company/company.module'
import { ResumeModule } from './resume/resume.module'
import { UserModule } from './user/user.module'
import { VacancyModule } from './vacancy/vacancy.module'
import { ResponseModule } from './response/response.module'

@Module({
  imports: [
    UserModule,
    AuthModule,
    CompanyModule,
    VacancyModule,
    CategoryModule,
    CityModule,
    ResumeModule,
    ResponseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
