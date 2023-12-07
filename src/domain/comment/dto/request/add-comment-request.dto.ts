import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { contentLength } from '../../constant';
import { Comment } from '../../comment.entity';
import { Post } from '../../../post/post.entity';
import { Member } from '../../../member/member.entity';

export class AddCommentRequestDto {
  @IsString()
  @MinLength(contentLength.MIN_LENGTH)
  @MaxLength(contentLength.MAX_LENGTH)
  content: string;

  @IsString()
  writer: string;

  @IsNumber()
  @IsOptional()
  parentId?: number;

  toEntity(post: Post, member: Member) {
    return Comment.of(post, member, this.content, this.parentId);
  }
}
