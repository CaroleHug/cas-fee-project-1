import {noteStore} from '../services/noteStore.js';

export function showNotes(req, res) {
    res.json({ id: 42 });
};

export function createNote(req, res) {
    console.log('notesController - createNote start');
    noteStore.add(req.body.title, req.body.description, req.body.priority, req.body.finished,
        req.body.date, (err, note) => {
        res.json({message: 'SUCCESS'});
    });
    console.log('notesController - createNote end');
}

export function getNotes(req, res) {
    console.log('notesController - getNotes start');
    noteStore.all((err, notes) => {
        if (notes) {
            res.json(notes);
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
