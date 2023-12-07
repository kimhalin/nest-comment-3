import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { contentLength } from './constant';
import { Post } from '../post/post.entity';
import { Member } from '../member/member.entity';

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

  @PrimaryColumn()
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
      throw new Error(
        `댓글은 ${contentLength.MIN_LENGTH}자 이상 ${contentLength.MAX_LENGTH}자 이하로 입력해주세요.`,
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
