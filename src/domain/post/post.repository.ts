import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Post } from './post.entity';
import { ErrorMessages } from './constant';
import { ResourceNotFoundException } from '../../common/error/custom-exception';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(private dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  async getOneByIdOrFail(id: number): Promise<Post> {
    const post = await this.findOne({
      where: {
        id: id,
      },
    });

    if (!post) {
      throw new ResourceNotFoundException(ErrorMessages.ERROR_NOT_FOUND_POST);
    }

    return post;
  }
}
