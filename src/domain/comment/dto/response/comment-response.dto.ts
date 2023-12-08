import { Comment } from '../../comment.entity';

export class CommentResponseDto {
  id: number;
  content: string;
  parentId?: number;
  isHide: boolean;
  likeCount: number;
  reportCount: number;
  createdAt: Date;
  updatedAt: Date;

  static of(comment: Comment): CommentResponseDto {
    const dto = new CommentResponseDto();
    dto.id = comment.id;
    dto.content = comment.content;
    dto.parentId = comment.parentId ?? null;
    dto.isHide = comment.isHide;
    dto.likeCount = comment.likeCount;
    dto.reportCount = comment.reportCount;
    dto.createdAt = comment.createdAt;
    dto.updatedAt = comment.updatedAt;
    return dto;
  }
}
