import {noteService} from '../services/note-service.js';
import {Note} from '../services/note.js';

export class NoteController {
    constructor() {
        if (!this.isCreatePage()) {
            this.noteTemplateCompiled = Handlebars.compile(document.getElementById('note-list-template').innerHTML);
            this.noteContainer = document.getElementById('note-container');
            this.noteContainer = document.getElementById('note-container');


            this.orderCriterias = document.querySelector('input[name="order"]');
            this.orderCriterias2 = document.getElementsByName('order');
            console.log(this.orderCriterias2);
            // this.selectedOrder = document.querySelector('input[name="order"]:checked').value;
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
                console.log(noteId);
            });

            this.orderCriterias2.forEach((radio) => {
                radio.addEventListener('click', (event) => {
                    // this.showNotes({title: '123', description: 'false'});
                    console.log(radio.value);
                    console.log(noteService.notes);
                    this.orderNotes(radio.value);
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
            this.getNotes();
        }
    }

    getNotes() {
        const self = this;
        noteService.getNotes((notes) => {
            self.renderNoteView(notes);
        });
    }

    setCurrentFormValues() {
        this.newTitle = document.getElementById('title').value;
        this.newDescription = document.getElementById('description').value;
        this.newDate = document.getElementById('endDate').value;
    }

    isCreatePage() {
        return window.location.href.includes('create');
    }

    orderNotes(order) {
        switch (order) {
            case 'finishDate':
                this.showNotes([...noteService.notes].sort(this.compareNotesFinishDate));
                break;
            case 'endDate':
                this.showNotes([...noteService.notes].sort(this.compareNotesCreatedDate));
                break;
            case 'importance':
            default:
                console.log(noteService.notes);
                console.log([...noteService.notes].sort(this.compareNotesByImportance));
                this.showNotes([...noteService.notes].sort(this.compareNotesByImportance));
                break;
        }
    }

    compareNotesFinishDate(s1, s2) {
        return s2.date - s1.date;
    }

    compareNotesCreatedDate(s1, s2) {
        return s2.date - s1.date;
    }

    compareNotesByImportance(s1, s2) {
        return s2.date - s1.date;
    }

}

// create one-and-only instance
new NoteController().initialize();
