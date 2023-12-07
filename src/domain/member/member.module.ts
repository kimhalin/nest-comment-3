import { Module } from '@nestjs/common';
import { MemberRepository } from './member.repository';

@Module({
  imports: [],
  providers: [MemberRepository],
  exports: [MemberRepository],
})
export class MemberModule {}
