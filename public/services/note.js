export class Note {
    constructor(id, title, description, priority, finished, endDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.finished = finished;
        this.endDate = endDate;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            priority: this.priority,
            finished: this.finished,
            endDate: this.endDate,
        };
    }
}
