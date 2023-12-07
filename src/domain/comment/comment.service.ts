import { Injectable } from '@nestjs/common';
import { AddCommentRequestDto } from './dto/request/add-comment-request.dto';
import { CommentRepository } from './comment.repository';
import { PostRepository } from '../post/post.repository';
import { MemberRepository } from '../member/member.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository,
    private readonly memberRepository: MemberRepository,
  ) {}

  async addComment(dto: AddCommentRequestDto, postId: number) {
    const post = await this.postRepository.getOneByIdOrFail(postId);
    const member = await this.memberRepository.getOneByNameOrFail(dto.writer);
    const comment = dto.toEntity(post, member);
    await this.commentRepository.save(comment);
  }
}
