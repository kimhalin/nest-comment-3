import { Injectable } from '@nestjs/common';
import { AddCommentRequestDto } from './dto/request/add-comment-request.dto';
import { CommentRepository } from './comment.repository';
import { PostRepository } from '../post/post.repository';
import { MemberRepository } from '../member/member.repository';
import { PaginatedRequestDto } from '../../common/dto/paginated-request.dto';
import { PaginatedDto } from '../../common/dto/paginated.dto';
import { CommentResponseDto } from './dto/response/comment-response.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository,
    private readonly memberRepository: MemberRepository,
  ) {}

  async addComment(postId: number, dto: AddCommentRequestDto) {
    const post = await this.postRepository.getOneByIdOrFail(postId);
    const member = await this.memberRepository.getOneByNameOrFail(dto.writer);
    const comment = dto.toEntity(post, member);
    await this.commentRepository.save(comment);
  }

  async getComments(postId: number, dto: PaginatedRequestDto) {
    const [comments, count] = await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.postId = :postId', { postId })
      .andWhere('comment.parentId IS NULL')
      .andWhere('comment.isHide = false')
      .skip(dto._offset)
      .take(dto._limit)
      .getManyAndCount();

    const commentsDto = comments.map((comment) =>
      CommentResponseDto.of(comment),
    );
    return PaginatedDto.of(commentsDto, dto.page, count, dto._limit);
  }

  async getChildComments(commentId: number, dto: PaginatedRequestDto) {
    const [comments, count] = await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.parentId = :parentId', { parentId: commentId })
      .andWhere('comment.isHide = false')
      .skip(dto._offset)
      .take(dto._limit)
      .getManyAndCount();

    const commentsDto = comments.map((comment) =>
      CommentResponseDto.of(comment),
    );

    return PaginatedDto.of(commentsDto, dto.page, count, dto._limit);
  }
}
