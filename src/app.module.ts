import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './company/companies.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    CompaniesModule,
    MongooseModule.forRoot(
      'mongodb+srv://m-db-user:OEQsz6ufC7myvuFF@cluster0-ypyly.mongodb.net/sample_training?retryWrites=true&w=majority',
      { useNewUrlParser: true,
      useUnifiedTopology:true }
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

