export class NoteService {
    constructor() {
        this.notes = [];
    }

   submitNote(note) {
        const xhr = new XMLHttpRequest();
        console.log(note);
        xhr.onreadystatechange = function () {
            if (4 === xhr.readyState) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                } else {
                    console.log('There was a problem with the request.');
                }
            }
        };
        xhr.open('POST', 'notes');
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(note.toJSON()));
    }

    getNotes(_callback, order) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (4 === xhr.readyState) {
                if (xhr.status === 200) {
                    this.notes = xhr.response;
                    console.log(this.notes);
                    console.log('type');
                    console.log('31');
                    _callback(this.notes);
                } else {
                    console.log('There was a problem with the request.');
                    _callback();
                }
            }
        };
        // let url = `notes?order=${order}`;

        xhr.responseType = 'json';
        xhr.open('GET', `notes?order=${order}`);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send('order=importance');
    }
}

export const noteService = new NoteService();
