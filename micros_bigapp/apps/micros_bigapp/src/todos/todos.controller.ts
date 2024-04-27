import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateWorkflowDto } from '@app/workflows';
import { lastValueFrom } from 'rxjs';
import { WORKFLOWS_SERVICE } from '../constants';
import { ClientProxy } from '@nestjs/microservices';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,

    @Inject(WORKFLOWS_SERVICE)
    private readonly workflowsService: ClientProxy,
  ) {}

  // @Post()
  // async create(@Body() createTodoDto: CreateTodoDto) {
  //   const todo = await this.todosService.create(createTodoDto);

  //   const res = await fetch('http://svc1:3001/workflows', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       name: 'TodoCreated',
  //       todoId: todo.id,
  //     } as CreateWorkflowDto),
  //     headers: { 'Content-Type': 'application/json' },
  //   });

  //   return res.json();
  // }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    const todo = await this.todosService.create(createTodoDto);

    const workflow = await lastValueFrom(
      // This return observable stream
      this.workflowsService.send('workflows.create', {
        name: 'TodoCreated',
        todoId: todo.id,
      } as CreateWorkflowDto),
    );

    return workflow;
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
