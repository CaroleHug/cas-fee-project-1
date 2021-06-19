import {noteService} from '../services/note-service.js';
import {Note} from '../services/note.js';

export class NoteController {
    constructor() {
        if (!this.isCreatePage()) {
            this.noteTemplateCompiled = Handlebars.compile(document.getElementById('note-list-template').innerHTML);
            this.noteContainer = document.getElementById('note-container');
        }

        if (this.isCreatePage()) {
            this.newNote = document.getElementById('newNote');
            this.newNoteSubmit = document.getElementById('new-note-submit');
            this.setCurrentFormValues();
        }
    }

    showNotes() {
        this.noteContainer.innerHTML = this.noteTemplateCompiled(
            {notes: noteService.notes},
            {allowProtoPropertiesByDefault: true},
        );
    }

    initEventHandlers() {
        if (!this.isCreatePage()) {
            this.noteContainer.addEventListener('click', (event) => {
                const noteId = Number(event.target.dataset.id);
                console.log(noteId);
            });
        }

        if (this.isCreatePage()) {
            this.newNoteSubmit.addEventListener('click', (event) => {
                this.setCurrentFormValues();
                if (document.activeElement) {
                    noteService.submitNote(new Note(this.newTitle, this.newDescription, 2, false, this.newDate)); //TODO remove hardcoded elements
                    window.location.href = 'http://localhost:3000/index.html';
                }
                event.preventDefault();
            });
        }
    }

    initialize() {
        this.initEventHandlers();
    }

    setCurrentFormValues() {
        this.newTitle = document.getElementById('title').value;
        this.newDescription = document.getElementById('description').value;
        this.newDate = document.getElementById('endDate').value;
    }

    isCreatePage() {
        return window.location.href.includes('create');
    }
}

// create one-and-only instance
new NoteController().initialize();
