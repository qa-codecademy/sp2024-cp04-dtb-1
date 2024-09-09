import { IsNumber, IsString } from 'class-validator';

export class CreateRatingDto {
  @IsString()
  userId: string;

  @IsNumber()
  postId: number;

  @IsNumber()
  rating: number;
}
