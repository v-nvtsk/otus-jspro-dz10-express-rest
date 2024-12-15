import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { TasksService } from './tasks.service';
import { ApiOperation, ApiBody } from '@nestjs/swagger';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  getAllTasks() {
    return this.tasksService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  getTaskById(@Param('id') id: number) {
    return this.tasksService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new task' })
  @ApiBody({
    schema: {
      example: {
        title: '',
        description: '',
        input_examples: '',
        output_examples: '',
        difficulty: '',
        tags: [''],
        additional_materials: [''],
      },
    },
  })
  async createTask(@Req() req: Request, @Res() res: Response) {
    const {
      title,
      description,
      input_examples,
      output_examples,
      difficulty,
      tags,
      additional_materials,
    } = req.body;

    try {
      const result = await this.tasksService.create({
        title,
        description,
        input_examples,
        output_examples,
        difficulty,
        tags,
        additional_materials,
      });
      return res.status(201).json(result);
    } catch (_) {
      res.status(500).json({ message: 'Server failed while task creation' });
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update existing task' })
  @ApiBody({
    schema: {
      example: {
        title: '',
        description: '',
        input_examples: '',
        output_examples: '',
        difficulty: '',
        tags: [''],
        additional_materials: [''],
      },
    },
  })
  async updateTask(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const {
      title,
      description,
      input_examples,
      output_examples,
      difficulty,
      tags,
      additional_materials,
    } = req.body;

    try {
      const result = await this.tasksService.update(id, {
        title,
        description,
        input_examples,
        output_examples,
        difficulty,
        tags,
        additional_materials,
      });
      res.status(200).json(result.raw);
    } catch (_) {
      // logger.error('Error updating task:', error);
      res.status(500).json({ message: '' });
    }
  }
}
