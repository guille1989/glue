import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebScrapingController } from './glue.controller';
import { WebScrapingService } from './glue.service';
import { Glue, GlueSchema } from './schemas/glue.chema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Glue', schema: GlueSchema }])],
  controllers: [WebScrapingController],
  providers: [WebScrapingService],
})
export class GlueModule {}
