export class Note {
    constructor(title, description, priority, finished, date) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.finished = finished;
        this.date = date;
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            priority: this.priority,
            finished: this.finished,
            date: this.date,
        };
    }
}
