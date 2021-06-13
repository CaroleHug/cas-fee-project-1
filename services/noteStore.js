import Datastore from 'nedb';

const db = new Datastore({filename: './data/note.db', autoload: true});

class Note {
    constructor(title, description, priority, finished, date) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.finished = finished;
        this.date = date;
    }
}

class NoteStore {
    add(title, description, priority = 2, finished = false, date, callback) {
        console.log('noteStore - add new Note start');
        const note = new Note(title, description, priority, finished, date);
        db.insert(note, function (err, newDoc) {
            console.log('noteStore - insert new note');
            // if (callback) {
            //     callback(err, newDoc);
            // }
        });

        console.log('noteStore - currentNotes');
        const currentNotes = db.find({}, function (err, docs) {
            callback(err, docs);
        });
        console.log(currentNotes);
        console.log('noteStore - added new Note - end');
    }

    delete(id, callback) {
        db.update({_id: id}, {$set: {state: 'DELETED'}}, {returnUpdatedDocs: true}, function (err, numDocs, doc) {
            callback(err, doc);
        });
    }

    get(id, callback) {
        db.findOne({_id: id}, function (err, doc) {
            callback(err, doc);
        });
    }

    all(callback) {
        db.find({}, function (err, docs) {
            callback(err, docs);
        });
    }
}

export const noteStore = new NoteStore();
