import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
  ) {}

  async getAll() {
    return await this.tasksRepository.find();
  }

  async getById(id: number) {
    return await this.tasksRepository.findOneBy({ id });
  }

  async create({
    title,
    description,
    input_examples,
    output_examples,
    difficulty,
    tags,
    additional_materials,
  }) {
    const result = await this.tasksRepository.create({
      title,
      description,
      input_examples,
      output_examples,
      difficulty,
      tags,
      additional_materials,
    });
    return result;
  }

  async update(
    id: number,
    {
      title,
      description,
      input_examples,
      output_examples,
      difficulty,
      tags,
      additional_materials,
    },
  ) {
    return await this.tasksRepository.update(id, {
      title,
      description,
      input_examples,
      output_examples,
      difficulty,
      tags,
      additional_materials,
    });
  }
}
