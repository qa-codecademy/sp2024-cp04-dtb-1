import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  userId: string;

  @IsString()
  image: string;

  @IsString()
  title: string;

  @IsString()
  text: string;

  @IsString()
  tags: string[];
}
