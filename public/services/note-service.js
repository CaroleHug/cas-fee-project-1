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
        // const formData = {
        //     title: document.getElementById('title').value,
        //     description: document.getElementById('description').value,
        //     date: document.getElementById('endDate').value,
        // };
        xhr.open('POST', 'notes');
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(note.toJSON()));
    }

    getNotes() {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (4 === xhr.readyState) {
                if (xhr.status === 200) {
                    this.notes = xhr.response;
                    console.log(xhr.responseText);
                } else {
                    console.log('There was a problem with the request.');
                }
            }
        };
        xhr.open('GET', 'notes');
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send();
    }
}

export const noteService = new NoteService();
