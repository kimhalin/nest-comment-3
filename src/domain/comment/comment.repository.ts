import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async customMethod(id: number): Promise<Comment> {
    return await this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOneOrFail();
  }
}
