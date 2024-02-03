import { Type } from '@nestjs/common';

export class EventClsRegistry {
  private static readonly eventClsMap = new Map<string, any>();

  static add(eventCls: Type) {
    this.eventClsMap.set(eventCls.name, eventCls);
  }

  static get(eventClsName: string) {
    const cls = this.eventClsMap.get(eventClsName);

    if (!cls) {
      throw new Error(`Event class not registered: ${eventClsName}`);
    }

    return cls;
  }
}
