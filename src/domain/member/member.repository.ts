import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Member } from './member.entity';
import { ResourceNotFoundException } from '../../common/error/custom-exception';
import { ErrorMessages } from './constant';

@Injectable()
export class MemberRepository extends Repository<Member> {
  constructor(private dataSource: DataSource) {
    super(Member, dataSource.createEntityManager());
  }

  async getOneByIdOrFail(id: number): Promise<Member> {
    const member = await this.findOne({
      where: {
        id: id,
      },
    });

    if (!member) {
      throw new ResourceNotFoundException(ErrorMessages.ERROR_NOT_FOUND_MEMBER);
    }

    return member;
  }

  async getOneByNameOrFail(name: string): Promise<Member> {
    const member = await this.findOne({
      where: {
        name: name,
      },
    });
    if (!member) {
      throw new ResourceNotFoundException(ErrorMessages.ERROR_NOT_FOUND_MEMBER);
    }

    return member;
  }
}
