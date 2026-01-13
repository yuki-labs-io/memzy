export interface IContainer {
  register<T>(key: string, factory: () => T): void;
  registerSingleton<T>(key: string, factory: () => T): void;
  resolve<T>(key: string): T;
}

export class Container implements IContainer {
  private services: Map<string, () => any> = new Map();
  private singletons: Map<string, any> = new Map();

  register<T>(key: string, factory: () => T): void {
    this.services.set(key, factory);
  }

  registerSingleton<T>(key: string, factory: () => T): void {
    this.services.set(key, () => {
      if (!this.singletons.has(key)) {
        this.singletons.set(key, factory());
      }
      return this.singletons.get(key);
    });
  }

  resolve<T>(key: string): T {
    const factory = this.services.get(key);
    if (!factory) {
      throw new Error(`Service ${key} not found in container`);
    }
    return factory();
  }
}

export const container = new Container();
