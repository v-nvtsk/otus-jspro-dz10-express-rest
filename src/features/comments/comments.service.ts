import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from '../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
  ) {}

  async getByTaskId(task_id: number) {
    return await this.commentsRepository.findOneBy({ task_id });
  }

  async create({ content, task_id, user_id, created_at = new Date() }) {
    const result = await this.commentsRepository.create({
      content,
      task_id,
      user_id,
      created_at,
    });
    return result;
  }

  async update(id: number, { content, user_id }) {
    const result = await this.commentsRepository
      .createQueryBuilder()
      .update()
      .set({
        content,
        created_at: new Date(),
      })
      .where('id = :id', { id })
      .andWhere('user_id = :user_id', { user_id })
      .execute();

    if (result.affected === 0) {
      throw new Error('Comment not found or user_id mismatch');
    }

    return result;
  }

  async delete(id: number) {
    const result = await this.commentsRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Comment not found');
    }

    return result;
  }
}
