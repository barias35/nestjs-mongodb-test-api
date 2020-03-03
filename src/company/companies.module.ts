import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CompaniesService } from './companies.service';
import { CompanySchema } from './company.model';
import { CompaniesController } from './companies.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Companies', schema: CompanySchema }]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService]
})
export class CompaniesModule { }
