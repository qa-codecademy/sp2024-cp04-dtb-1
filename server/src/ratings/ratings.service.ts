import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating) private ratingRepo: Repository<Rating>,
  ) {}

  create(createRatingDto: CreateRatingDto) {
    return this.ratingRepo.save({
      rating: createRatingDto.rating,
      post: {
        id: createRatingDto.postId,
      },
      user: {
        id: createRatingDto.userId,
      },
    });
  }

  findAll() {
    return this.ratingRepo.find({});
  }

  findOne(id: number) {
    return this.ratingRepo.findOneBy({ id });
  }

  //   update(id: number, updateRatingDto: UpdateRatingDto) {
  //     return `This action updates a #${id} comment`;
  //   }

  // remove(id: number) {
  //   return `This action removes a #${id} comment`;
  // }
}
