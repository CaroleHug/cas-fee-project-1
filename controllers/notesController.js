import {noteStore} from '../services/noteStore.js';

export function createNote(req, res) {
    if (!req.body.id) {
        noteStore.add(req.body.title, req.body.description, req.body.priority, req.body.finished,
            req.body.endDate, () => {
                res.json({message: 'SUCCESS'});
            });
    } else {
        noteStore.update(req.body.id, req.body.title, req.body.description,
            req.body.priority, req.body.finished,
            req.body.endDate, () => {
                res.json({message: 'SUCCESS'});
            });
    }
}

export function getNotes(req, res) {
    noteStore.all((err, notes) => {
        if (notes) {
            let newNotes = [];
            switch (req.query.order) {
                case 'endDate':
                    newNotes = [...notes].sort((s1, s2) => new Date(s2.endDate) - new Date(s1.endDate));
                    break;
                case 'creationDate':
                    newNotes = [...notes].sort((s1, s2) => s2.creationDate - s1.creationDate);
                    break;
                case 'importance':
                default:
                    newNotes = [...notes].sort((s1, s2) => s2.priority - s1.priority);
                    break;
            }
            res.json(req.query.showFinished === 'true' ? notes.filter((note) => note.finished === true) : newNotes);
        }
    });
}

export function showNote(req, res) {
    noteStore.get(req.params.id, (err, note) => {
        if (note) {
            res.json(note);
        }
    });
}

export function deleteNote(req, res) {
    noteStore.delete(req.params.id, (err, note) => {
        if (note) {
            res.json(note);
        }
    });
}
