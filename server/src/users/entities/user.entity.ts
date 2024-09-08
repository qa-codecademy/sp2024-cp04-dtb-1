import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Comment } from 'src/comments/entities/comment.entity';
import { Post } from 'src/reviews/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column('text', {
    array: true,
    default: [],
    nullable: true,
  })
  refreshTokens: string[];

  @OneToMany(() => Comment, (comments) => comments.user)
  comments: Comment[];

  @OneToMany(() => Post, (posts) => posts.user)
  posts: Post[];
}
