import java.util.LinkedList;

public class Queue {

    public LinkedList<Vertex> queue;
    public int size;

    public Queue() {
        this.queue = new LinkedList<Vertex>();
        this.size = 0;
    }

    public boolean isEmpty() {
        return this.size == 0;
    }

    public void enqueue(Vertex data) {
        this.queue.addLast(data);
        this.size++;
    }

    public Vertex peek() {
        if (this.isEmpty()) {
            return null;
        } else {
            return this.queue.element();
        }
    }
    
    public Vertex dequeue() {
        if (!this.isEmpty()) {
            Vertex data = this.queue.remove();
            this.size--;
            return data;
        } else {
            throw new Error("LinearDataStructures.Queues.Queue");
        }
    }
}
