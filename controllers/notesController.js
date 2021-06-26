import {noteStore} from '../services/noteStore.js';

export function createNote(req, res) {
    if(!req.body.id) {
        console.log('notesController - createNote start');
        noteStore.add(req.body.title, req.body.description, req.body.priority, req.body.finished,
            req.body.endDate, () => {
                res.json({message: 'SUCCESS'});
            });
        console.log('notesController - createNote end');
    } else {
        console.log('notesController - updateNote start');
        noteStore.update(req.body.id, req.body.title, req.body.description, req.body.priority, req.body.finished,
            req.body.endDate, () => {
                res.json({message: 'SUCCESS'});
            });
        console.log(req.body);
        console.log('notesController - updateNote end');
    }
}

export function getNotes(req, res) {
    console.log('notesController - getNotes start');
    noteStore.all((err, notes) => {
        if (notes) {
            switch (req.query.order) {
                case 'endDate':
                    notes = [...notes].sort((s1, s2) => new Date(s2.endDate) - new Date(s1.endDate));
                    break;
                case 'creationDate':
                    notes = [...notes].sort((s1, s2) => s2.creationDate - s1.creationDate);
                    break;
                case 'importance':
                default:
                    notes = [...notes].sort((s1, s2) => s2.priority - s1.priority);
                    break;
            }
            res.json(req.query.showFinished === 'true' ? notes.filter((note) => note.finished === true) : notes);
        }
    });
    console.log('notesController - getNotes end');
}

export function showNote(req, res) {
    console.log('notesController - showNote start');
    noteStore.get(req.params.id, (err, note) => {
        if (note) {
            res.json(note);
        }
    });
    console.log('notesController - showNote end');
}

export function deleteNote(req, res) {
    console.log('notesController - deleteNote start');
    noteStore.delete(req.params.id, (err, note) => {
        if (note) {
            res.json(note);
        }
    });
    console.log('notesController - deleteNote end');
}
