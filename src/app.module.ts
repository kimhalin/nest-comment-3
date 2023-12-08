import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { CommentController } from './controllers/comment.controller';
import { CommentModule } from './domain/comment/comment.module';
import { Comment } from './domain/comment/comment.entity';
import { Member } from './domain/member/member.entity';
import { Post } from './domain/post/post.entity';

const entities = [Comment, Member, Post];
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [...entities],
          synchronize: process.env.DB_SYNC === 'true',
          timezone: 'Z',
          logging: true,
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    CommentModule,
  ],
  controllers: [CommentController],
  providers: [],
  exports: [],
})
export class AppModule {}
