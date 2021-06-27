export class NoteService {
    constructor() {
        this.notes = [];
    }

   submitNote(note) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'notes');
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(note));
    }

    getNotes(_callback, order, showFinished) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function load() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this.notes = xhr.response;
                    _callback(this.notes);
                } else {
                    _callback();
                }
            }
        };

        xhr.responseType = 'json';
        xhr.open('GET', `notes?order=${order}&showFinished=${showFinished}`);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send();
    }

    getNote(_callback, id) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function load() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this.note = xhr.response;
                    _callback(this.note);
                } else {
                    _callback();
                }
            }
        };

        xhr.responseType = 'json';
        xhr.open('GET', `note/${id}`);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send();
    }
}

export const noteService = new NoteService();
