import {noteService} from '../services/note-service.js';
import {Note} from '../services/note.js';

export class NoteController {
    constructor() {
        if (!this.isCreatePage()) {
            this.noteTemplateCompiled = Handlebars.compile(document.getElementById('note-list-template').innerHTML);
            this.noteContainer = document.getElementById('note-container');
            this.noteContainer = document.getElementById('note-container');


            this.orderCriterias = document.getElementsByName('order');
        }

        if (this.isCreatePage()) {
            this.newNote = document.getElementById('newNote');
            this.newNoteSubmit = document.getElementById('new-note-submit');
            this.setCurrentFormValues();
        }
    }

    showNotes(newNotes) {
        this.noteContainer.innerHTML = this.noteTemplateCompiled(
            {notes: newNotes},
            {allowProtoPropertiesByDefault: true},
        );
    }

    initEventHandlers() {
        if (!this.isCreatePage()) {
            this.noteContainer.addEventListener('click', (event) => {
                const noteId = Number(event.target.dataset.id);
            });

            this.orderCriterias.forEach((radio) => {
                radio.addEventListener('click', () => {
                    this.getNotes(radio.value);
                });
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

    renderNoteView(notes) {
        this.showNotes(notes);
    }

    initialize() {
        this.initEventHandlers();
        if (!this.isCreatePage()) {
            this.getNotes('importance');
        }
    }

    getNotes(order) {
        const self = this;
        noteService.getNotes((notes) => {
            self.renderNoteView(notes);
        }, order);
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
