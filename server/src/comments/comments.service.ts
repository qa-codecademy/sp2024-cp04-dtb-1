import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentsRepo: Repository<Comment>,
  ) {}

  create(userId: string, createCommentDto: CreateCommentDto) {
    return this.commentsRepo.save({
      text: createCommentDto.text,
      post: {
        id: createCommentDto.postId,
      },
      user: {
        id: userId,
      },
    });
  }

  findAll() {
    return this.commentsRepo.find({});
  }

  findOne(id: number) {
    return this.commentsRepo.findOneBy({ id });
  }

  // update(id: number, updateCommentDto: UpdateCommentDto) {
  //   return `This action updates a #${id} comment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} comment`;
  // }
}
