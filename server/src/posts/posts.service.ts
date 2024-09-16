import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { GetPostsQuery } from './posts.mode';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postsRepo: Repository<Post>) {}

  create(createPostDto: CreatePostDto) {
    return this.postsRepo.save({
      text: createPostDto.text,
      title: createPostDto.title,
      tags: createPostDto.tags,
      image: createPostDto.image,
      date: String(new Date()),
      user: { id: createPostDto.userId },
    });
  }

  async findAll(query: GetPostsQuery) {
    const posts = await this.postsRepo.find({
      relations: {
        user: true,
        comments: true,
        ratings: true,
      },
      order: {
        date: 'ASC',
      },
      skip: query.firstResult ? Number(query.firstResult) - 1 : 0,
      take: Number(query.maxResults) || 10,
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          username: true,
        },
      },
    });

    const totalCount = await this.postsRepo.count();

    return {
      posts,
      totalCount,
    };
  }

  async findOne(id: number) {
    const foundPost = await this.postsRepo.findOne({
      where: { id },
      relations: {
        comments: true,
        ratings: true,
        user: true,
      },
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          username: true,
        },
      },
    });

    delete foundPost.user.refreshTokens;
    delete foundPost.user.email;

    if (!foundPost) throw new NotFoundException('Post not found');

    return foundPost;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const foundPost = await this.postsRepo.findBy({ id });

    Object.assign(foundPost, updatePostDto);

    await this.postsRepo.save(foundPost);
  }

  async remove(id: number) {
    const foundPost = await this.postsRepo.findBy({ id });

    await this.postsRepo.remove(foundPost);
  }
}
