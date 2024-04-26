import { CreateWorkflowDto } from '@app/workflows';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workflow } from './entities/workflow.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkflowsService {
  constructor(
    @InjectRepository(Workflow)
    private readonly workflowRepository: Repository<Workflow>,
  ) {}

  async create(createWorkflowDto: CreateWorkflowDto) {
    const workflow = await this.workflowRepository.save({
      name: createWorkflowDto.name,
      todoId: createWorkflowDto.todoId,
    });

    return workflow;
  }

  findAll() {
    return `This action returns all workflows`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workflow`;
  }

  update(id: number /*, updateWorkflowDto: UpdateWorkflowDto*/) {
    return `This action updates a #${id} workflow`;
  }

  remove(id: number) {
    return `This action removes a #${id} workflow`;
  }
}
