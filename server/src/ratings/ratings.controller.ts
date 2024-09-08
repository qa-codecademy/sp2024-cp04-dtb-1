import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { User } from 'src/users/entities/user.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  create(@Body() createRatingDto: CreateRatingDto, @Req() req: { user: User }) {
    return this.ratingsService.create(req.user.id, createRatingDto);
  }

  @Get()
  findAll() {
    return this.ratingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingsService.findOne(+id);
  }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
  //     return this.ratingsService.update(+id, updateRatingDto);
  //   }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ratingsService.remove(+id);
  // }
}
