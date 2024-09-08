import { Post } from 'src/reviews/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
