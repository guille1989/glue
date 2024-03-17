import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GlueModule } from './web-scraping/glue.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27020/gluedbwebscrapinginfo'),
    GlueModule,
  ],
})
export class AppModule {}
