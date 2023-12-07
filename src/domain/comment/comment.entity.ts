import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { contentLength, ErrorMessages } from './constant';
import { Post } from '../post/post.entity';
import { Member } from '../member/member.entity';
import { InvalidParameterException } from '../../common/error/custom-exception';

@Entity()
export class Comment {
  @ManyToOne(() => Post)
  post: Post;

  @ManyToOne(() => Member)
  member: Member;

  @Column({ nullable: true })
  parentId: number;

  @Column()
  content: string;

  @Column({ default: false })
  isHide: boolean;

  @Column({ default: 0 })
  likeCount: number;

  @Column({ default: 0 })
  reportCount: number;

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  static of(
    post: Post,
    member: Member,
    content: string,
    parentId?: number,
  ): Comment {
    if (
      content.length < contentLength.MIN_LENGTH ||
      content.length > contentLength.MAX_LENGTH
    ) {
      throw new InvalidParameterException(
        ErrorMessages.ERROR_INVALID_CONTENT_LENGTH,
      );
    }
    const comment = new Comment();
    comment.post = post;
    comment.member = member;
    comment.content = content;
    comment.parentId = parentId ?? null;
    return comment;
  }
}
