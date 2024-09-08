import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: string;

  @Column({
    array: true,
    default: [],
    nullable: true,
  })
  ratings: number;

  @Column()
  text: string;

  @Column()
  author: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
