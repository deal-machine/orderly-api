import {
  IEvent,
  IEventDispatcher,
  IEventHandler,
} from 'src/application/ports/events/';

export class EventDispatcher implements IEventDispatcher {
  private eventHandlers: { [eventName: string]: IEventHandler[] };

  private static instance: EventDispatcher;

  private constructor() {
    this.eventHandlers = {};
  }

  public static getInstance(): EventDispatcher {
    if (!EventDispatcher.instance) {
      EventDispatcher.instance = new EventDispatcher();
    }
    return EventDispatcher.instance;
  }

  getHandlers(eventName: string) {
    return this.eventHandlers[eventName];
  }

  dispatch(event: IEvent) {
    if (this.eventHandlers[event.name]) {
      this.eventHandlers[event.name].forEach((h) => h.handle(event));
    }
  }

  register(eventName: string, handler: IEventHandler): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(handler);
  }

  unregister(eventName: string, handler: IEventHandler): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(handler);
      if (index !== -1) {
        this.eventHandlers[eventName].splice(index, 1);
      }
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
