import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as mongoose from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ScrapedData } from '../web-scraping/dto/glue.data.dto';
import { Glue } from './schemas/glue.chema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class WebScrapingService {
  /*
  This is the connection to the MongoDB
  */
  private readonly dbConnection: mongoose.Connection;

  constructor(
    @InjectModel(Glue.name) private readonly glueModel: mongoose.Model<Glue>,
  ) {
    this.connectToMongoDB();
  }

  private async connectToMongoDB() {
    try {
      await mongoose.connect(
        'mongodb://localhost:27020/gluedbwebscrapinginfo',
        {},
      );
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
    }
  }

  /*
  This is the method that will be called when the /scraping-api endpoint is hit
  */
  async getWebScraping(url: string): Promise<ScrapedData> {
    /*
    Check if the url parameter is missing
    */
    if (!url) {
      throw new HttpException(
        'URL parameter is missing, please provide url as imput',
        HttpStatus.BAD_REQUEST,
      );
    }

    /*
    Check if the url is valid
    */
    try {
      new URL(url);
    } catch (_) {
      throw new HttpException(
        'Invalid URL, please check url format. eg: google.com',
        HttpStatus.BAD_REQUEST,
      );
    }

    /*
    Launch puppeteer and get the title, image and paragraph from the page
    */
    let browser: puppeteer.Browser;
    try {
      browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);

      /*
      Get the title, image and paragraph from the page
      */
      const title = await page.title();

      /*
      Get the first image src from the page
      */
      const image = await page.$eval('img', (img) => img.src);

      /*
      Get the first paragraph from the page
      */
      let text: string;
      try {
        text = await page.$eval('p', (p) => p.innerText);
      } catch (error) {
        text =
          'Could not find a text paragraph on the page, this is a dummy text.';
      }

      /*
      Save the title, image and text to the MongoDB
      */
      const glue = new this.glueModel({ url, title, image, text });
      await glue.save();

      /*
      Return the title, image and paragraph of the page "url"
      */
      return {
        url,
        title,
        image,
        text,
      };
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  /*
  This is the method that will be called when the /call-from-mongo-scraped-info endpoint is hit
  */
  async getScrapedData(): Promise<ScrapedData[]> {
    /*
    Return all the scraped data from the MongoDB
    */
    try {
      const getAllDataFromMongoDataBase = await this.glueModel.find().exec();
      return getAllDataFromMongoDataBase;
    } catch (error) {
      console.error('Error getting scraped data from MongoDB', error);
      return [];
    }
  }

  /*
  This is the method that will be called when the /call-from-mongo-one-scraped-info endpoint is hit
  */
  async getOneScrapedData(url: string): Promise<ScrapedData> {
    /*
    Return the scraped data from the MongoDB for the given url
    */
    try {
      const getOneDataFromMongoDataBase = await this.glueModel
        .findOne({ url })
        .exec();

      if (!getOneDataFromMongoDataBase) {
        // data is empty, return some random data
        return {
          url: '',
          title: '',
          image: '',
          text: 'No data found in MongoDB, this is a dummy text',
        };
      }
      return getOneDataFromMongoDataBase;
    } catch (error) {
      console.error('Error getting scraped data from MongoDB', error);
      return null;
    }
  }
}
