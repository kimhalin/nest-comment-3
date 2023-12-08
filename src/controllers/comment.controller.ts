import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AddCommentRequestDto } from '../domain/comment/dto/request/add-comment-request.dto';
import { CommentService } from '../domain/comment/comment.service';
import { ApiOperation } from '@nestjs/swagger';
import { PaginatedRequestDto } from '../common/dto/paginated-request.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @ApiOperation({ summary: '댓글 추가' })
  @Post('/:postId')
  async addComment(
    @Body() dto: AddCommentRequestDto,
    @Param('postId') postId: number,
  ) {
    await this.commentService.addComment(postId, dto);
  }

  @ApiOperation({ summary: '댓글 조회' })
  @Get('/:postId')
  async getComments(
    @Query() dto: PaginatedRequestDto,
    @Param('postId') postId: number,
  ) {
    return this.commentService.getComments(postId, dto);
  }

  @ApiOperation({ summary: '대댓글 조회' })
  @Get('/children/:commentId')
  async getChildComments(
    @Query() dto: PaginatedRequestDto,
    @Param('commentId') commentId: number,
  ) {
    return this.commentService.getChildComments(commentId, dto);
  }
}
