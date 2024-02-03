import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MarkTodoDoneCommand } from './mark-todo-done.command';
import { Logger } from '@nestjs/common';
import { AggregateRehydrator } from 'src/shared/applications/aggregate-rehydrator';
import { Todo } from 'src/todo/domains/todo';

@CommandHandler(MarkTodoDoneCommand)
export class MarkTodoDoneCommandHandler
  implements ICommandHandler<MarkTodoDoneCommand>
{
  private logger = new Logger(MarkTodoDoneCommandHandler.name);

  constructor(private readonly aggregateRehydrator: AggregateRehydrator) {}

  async execute(command: MarkTodoDoneCommand): Promise<any> {
    this.logger.debug(`Execute: ${JSON.stringify(command)}`);

    const todo = await this.aggregateRehydrator.rehydrate(command.id, Todo);

    todo.markAsDone();
    todo.commit();

    return todo;
  }
}
