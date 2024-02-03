import { EventClsRegistry } from '../infra/event-store/event-cls.registry';

export const AutowiredEvent: ClassDecorator = (target: any) => {
  EventClsRegistry.add(target);
};
