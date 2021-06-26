import Datastore from 'nedb';

const db = new Datastore({filename: './data/note.db', autoload: true});

class Note {
    constructor(title, description, priority, finished, endDate, creationDate) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.finished = finished;
        this.endDate = endDate;
        this.creationDate = creationDate;
    }
}

class NoteStore {
    add(title, description, priority = 2, finished = false, endDate, callback) {
        console.log('noteStore - add new Note start');
        const creationDate = new Date().valueOf();
        const note = new Note(title, description, priority, finished, endDate, creationDate);
        db.insert(note, () => {
            console.log('noteStore - insert new note');
        });

        console.log('noteStore - currentNotes');
        const currentNotes = db.find({}, (err, docs) => {
            callback(err, docs);
        });
        console.log(currentNotes);
        console.log('noteStore - added new Note - end');
    }

    delete(id, callback) {
        db.update({_id: id}, {$set: {state: 'DELETED'}}, {returnUpdatedDocs: true}, (err, numDocs, doc) => {
            callback(err, doc);
        });
    }

    update(id, title, description, priority = 2, finished = false, endDate, callback) {
        db.update({_id: id}, {$set: {title, description, priority, finished, endDate}},
            {returnUpdatedDocs: true}, (err, numDocs, doc) => {
            callback(err, doc);
        });
    }

    all(callback) {
        db.find({}, (err, docs) => {
            const documents = docs.map((doc) => ({ title: doc.title,
                description: doc.description,
                priority: doc.priority,
                endDate: doc.endDate,
                creationDate: doc.creationDate,
                finished: doc.finished,
                // eslint-disable-next-line no-underscore-dangle
                id: doc._id }));
            callback(err, documents);
        });
    }
}

export const noteStore = new NoteStore();
