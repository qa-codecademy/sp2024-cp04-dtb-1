import { IsNumber } from 'class-validator';

export class CreateRatingDto {
  @IsNumber()
  postId: number;

  @IsNumber()
  rating: number;
}
