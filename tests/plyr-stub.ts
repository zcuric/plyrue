import { vi } from 'vitest';

type Handler = (event: unknown) => void;

/**
 * A stand-in for Plyr used in every test. `vite.config.ts` aliases `plyr` to
 * this module for the test environment, so components under test get this
 * class without any per-file `vi.mock` boilerplate.
 */
export class PlyrStub {
  static instances: PlyrStub[] = [];
  /** Set to a message to make the next `destroy()` throw, like the YT API does. */
  static destroyError: string | null = null;

  target: HTMLElement;
  options: Record<string, unknown>;
  poster = '';
  destroyed = false;
  handlers = new Map<string, Handler[]>();

  on = vi.fn((event: string, handler: Handler) => {
    const handlers = this.handlers.get(event) ?? [];
    handlers.push(handler);
    this.handlers.set(event, handlers);
  });

  destroy = vi.fn(() => {
    if (PlyrStub.destroyError) throw new Error(PlyrStub.destroyError);
    this.destroyed = true;
  });

  constructor(target: HTMLElement, options: Record<string, unknown> = {}) {
    this.target = target;
    this.options = options;
    PlyrStub.instances.push(this);
  }

  /** Fires every handler registered for `event`, as Plyr would. */
  emit(event: string, payload: unknown = { type: event }) {
    this.handlers.get(event)?.forEach(handler => handler(payload));
  }

  static reset() {
    PlyrStub.instances = [];
    PlyrStub.destroyError = null;
  }

  static get last() {
    return PlyrStub.instances[PlyrStub.instances.length - 1];
  }
}

export default PlyrStub;
