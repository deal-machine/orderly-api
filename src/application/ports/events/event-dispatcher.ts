import { IEvent, IEventHandler } from './';

export interface IEventDispatcher {
  getHandlers(eventName: string): any;
  dispatch(event: IEvent): void;
  register(eventName: string, handler: IEventHandler): void;
  unregister(eventName: string, handler: IEventHandler): void;
  unregisterAll(): void;
}
