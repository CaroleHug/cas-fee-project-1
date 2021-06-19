export class Note {
    constructor(title, description, priority, finished, endDate) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.finished = finished;
        this.endDate = endDate;
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            priority: this.priority,
            finished: this.finished,
            endDate: this.endDate,
        };
    }
}
