class Entity {
  private width: number;
  private height: number;
  private zIndex: number; // Between 0 - 2 which determines the layer the item will be on

  constructor(width: number, height: number, zIndex: number) {
    this.width = width;
    this.height = height;
    this.zIndex = zIndex;
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

export default Entity;