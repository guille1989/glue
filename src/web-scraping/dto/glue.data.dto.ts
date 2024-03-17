import { IsString } from 'class-validator';

export class ScrapedData {
  @IsString()
  url: string;

  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsString()
  text: string;
}
