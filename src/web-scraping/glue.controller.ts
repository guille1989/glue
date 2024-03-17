import { Controller, Get, Param } from '@nestjs/common';
import { WebScrapingService } from './glue.service';
import { ApiTags } from '@nestjs/swagger';
import { ScrapedData } from './dto/glue.data.dto';
import { URL } from 'url';

@ApiTags('Glue apis')
@Controller()
export class WebScrapingController {
  constructor(private readonly webScrapingService: WebScrapingService) {}

  @Get('web-scraping-api-executor/:url')
  async getWebScraping(@Param('url') url: string): Promise<ScrapedData> {
    const parsedUrl = new URL(
      url.startsWith('http') ? url : `https://www.${url}`,
    );
    return this.webScrapingService.getWebScraping(parsedUrl.toString());
  }

  @Get('call-from-mongo-all-scraped-info')
  async getScrapedData(): Promise<ScrapedData[]> {
    return await this.webScrapingService.getScrapedData();
  }

  @Get('call-from-mongo-one-scraped-info/:url')
  async getOneScrapedData(@Param('url') url: string): Promise<ScrapedData> {
    const parsedUrl = new URL(
      url.startsWith('http') ? url : `https://www.${url}`,
    );
    return this.webScrapingService.getOneScrapedData(parsedUrl.toString());
  }
}
