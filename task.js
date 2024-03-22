class Task {
    constructor(id, description, status, title) {
        this.id = id;
        this.description = description;
        this.status = status;
        this.title = title;
    }

    toString() {
        return `Task ID: ${this.id}, Description: ${this.description}, Status: ${this.status}`;
    }
}

export default Task;
