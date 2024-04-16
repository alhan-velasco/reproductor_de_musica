import { Node } from "./Node.mjs";

export class LinkedList {
    #count;
    #head;

    constructor() {
        this.#count = 0;
        this.#head = undefined;
    }

    push(element) {
        const node = new Node(element);

        if (this.#head == null) {
            node.next = node;
            node.previous = node;
            this.#head = node;
        } else {
            const tail = this.#head.previous;
            node.next = this.#head;
            node.previous = tail;
            this.#head.previous = node;
            tail.next = node;
        }

        this.#count++;
    }

    removeAt(position) {
        if (position >= 0 && position < this.#count) {
            let current = this.#head;

            if (this.#count === 1) {
                this.#head = undefined;
            } else {
                for (let i = 0; i < position; i++) {
                    current = current.next;
                }

                const previousNode = current.previous;
                const nextNode = current.next;

                previousNode.next = nextNode;
                nextNode.previous = previousNode;

                if (current === this.#head) {
                    this.#head = nextNode;
                }
            }

            this.#count--;
            return current.element;
        }

        return undefined;
    }

    size() {
        return this.#count;
    }

    getElementAt(index) {
        if (index >= 0 && index < this.#count) {
            let node = this.#head;
            for (let i = 0; i < index && node != null; i++) node = node.next;
            return node;
        }
        return undefined;
    }
}
