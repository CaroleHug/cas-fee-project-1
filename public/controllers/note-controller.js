import {noteService} from '../services/note-service.js';
import {Note} from '../services/note.js';

export class NoteController {
    constructor() {
        this.noteTemplateCompiled = Handlebars.compile(document.getElementById('note-list-template').innerHTML);
        this.noteContainer = document.getElementById('note-container');

        this.newNote = document.getElementById('newNote');
        this.newNoteSubmit = document.getElementById('new-note-submit');

        this.setCurrentFormValues();
    }

    showNotes() {
        this.noteContainer.innerHTML = this.noteTemplateCompiled(
            {notes: noteService.notes},
            {allowProtoPropertiesByDefault: true},
        );
    }

    initEventHandlers() {
        this.noteContainer.addEventListener('click', (event) => {
            const noteId = Number(event.target.dataset.id);
            console.log(noteId);
        });

        this.newNoteSubmit.addEventListener('click', (event) => {
            this.setCurrentFormValues();
            if (document.activeElement) {
                noteService.submitNote(new Note(this.newTitle, this.newDescription, 2, false, this.newDate)); //TODO remove hardcoded elements
            }
            event.preventDefault();
        });
    }

    initialize() {
        this.initEventHandlers();
    }

    setCurrentFormValues() {
        this.newTitle = document.getElementById('title').value;
        this.newDescription = document.getElementById('description').value;
        this.newDate = document.getElementById('endDate').value;
    }
}

// create one-and-only instance
new NoteController().initialize();
