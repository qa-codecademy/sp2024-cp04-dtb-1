import { IsString, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsNumber()
  date: string;

  @IsNumber()
  rating: number;

  @IsString()
  text: string;

  @IsString()
  author: string;
}
