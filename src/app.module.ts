import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { CityModule } from './city/city.module'
import { EmailModule } from './email/email.module'
import { ResponseModule } from './response/response.module'
import { ResumeModule } from './resume/resume.module'
import { UserModule } from './user/user.module'
import { VacancyModule } from './vacancy/vacancy.module'
import { FilesModule } from './files/files.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { CompanyModule } from './company/company.module'

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
    EmailModule,
    FilesModule,
    CloudinaryModule,
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
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        cli: {
          migrationsDir: __dirname + '/migrations/',
        },
        autoLoadEntities: true,
        synchronize: true,
        migrationsRun: process.env.NODE_ENV === 'production',
      }),

      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
