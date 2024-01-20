export class CreateTodoCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly severity: 'low' | 'medium' | 'high',
  ) {}
}
