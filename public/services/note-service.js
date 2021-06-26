export class NoteService {
    constructor() {
        this.notes = [];
    }

   submitNote(note) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (4 === xhr.readyState) {
                if (!xhr.status === 200) {
                    console.log('There was a problem with the request.');
                }
            }
        };
        xhr.open('POST', 'notes');
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(note.toJSON()));
    }

    getNotes(_callback, order, showFinished) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this.notes = xhr.response;
                    _callback(this.notes);
                } else {
                    console.log('There was a problem with the request.');
                    _callback();
                }
            }
        };

        xhr.responseType = 'json';
        xhr.open('GET', `notes?order=${order}&showFinished=${showFinished}`);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send();
    }
}

export const noteService = new NoteService();
