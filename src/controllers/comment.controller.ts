import { Body, Controller, Param, Post } from '@nestjs/common';
import { AddCommentRequestDto } from '../domain/comment/dto/request/add-comment-request.dto';
import { CommentService } from '../domain/comment/comment.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @ApiOperation({ summary: '댓글 추가' })
  @Post('/:postId')
  async addComment(
    @Body() dto: AddCommentRequestDto,
    @Param('postId') postId: number,
  ) {
    await this.commentService.addComment(dto, postId);
  }
}
