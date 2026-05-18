class Entity {
  private id: string;
  private width: number;
  private height: number;
  private zIndex: number; // Between 0 - 2 which determines the layer the item will be on

  constructor(width: number, height: number, zIndex: number) {
    this.id = crypto.randomUUID();
    this.width = width;
    this.height = height;
    this.zIndex = zIndex;
  }

  getId(): string {
    return this.id;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getZIndex(): number {
    return this.zIndex;
  }
}