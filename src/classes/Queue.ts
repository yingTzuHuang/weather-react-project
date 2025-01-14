class Queue<T> {
  private items: T[];
  constructor(initialItems: T[] = []) {
    this.items = initialItems;
  }

  // Add an element to the queue
  enqueue(element: T): void {
    this.items.push(element);
  }

  // Remove and return the front element from the queue
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    return this.items.shift();
  }

  // Return the front element without removing it
  front(): T | undefined {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    return this.items[0];
  }

  // Check if the queue is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Return the size of the queue
  size(): number {
    return this.items.length;
  }

  // Clear the queue
  clear(): void {
    this.items = [];
  }

  getAllItems(): T[] {
    return [...this.items];
  }
}

export default Queue;
