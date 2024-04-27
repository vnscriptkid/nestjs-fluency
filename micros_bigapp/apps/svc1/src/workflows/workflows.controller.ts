import { Controller, Get, Patch, Param, Delete } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { CreateWorkflowDto } from '@app/workflows';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('workflows')
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  // @Post()
  // create(@Body() createWorkflowDto: CreateWorkflowDto) {
  //   return this.workflowsService.create(createWorkflowDto);
  // }

  @MessagePattern('workflows.create')
  create(@Payload() createWorkflowDto: CreateWorkflowDto) {
    console.log('NATS: workflows.create');
    return this.workflowsService.create(createWorkflowDto);
  }

  @Get()
  findAll() {
    return this.workflowsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workflowsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    /*@Body() updateWorkflowDto: UpdateWorkflowDto,*/
  ) {
    return this.workflowsService.update(+id /*, updateWorkflowDto*/);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workflowsService.remove(+id);
  }
}
