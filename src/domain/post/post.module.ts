import { Module } from '@nestjs/common';
import { PostRepository } from './post.repository';

@Module({
  imports: [],
  providers: [PostRepository],
  exports: [PostRepository],
})
export class PostModule {}
