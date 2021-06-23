import {noteService} from '../services/note-service.js';
import {Note} from '../services/note.js';

export class NoteController {
    constructor() {
        if (!this.isCreatePage()) {
            this.noteTemplateCompiled = Handlebars.compile(document.getElementById('note-list-template').innerHTML);
            this.noteContainer = document.getElementById('note-container');
            this.noteContainer = document.getElementById('note-container');
            this.orderCriterias = document.getElementsByName('order');
            [...this.orderCriterias].find((item) => item.value === 'importance').checked = true;
            this.theme = document.getElementById('theme');
            this.createNewNote = document.getElementById('create-new-note');

            this.editButtons = document.getElementsByName('notes-details-edit');
            this.notesDetails = document.getElementsByName('notes-details');
            this.readIndexUrlParams();
        }

        if (this.isCreatePage()) {
            this.newNote = document.getElementById('newNote');
            this.newNoteSubmit = document.getElementById('new-note-submit');
            this.cancel = document.getElementById('cancel');
            this.setCurrentFormValues();
            this.readUrlParams();
        }
    }

    showNotes(newNotes) {
        this.noteContainer.innerHTML = this.noteTemplateCompiled(
            {notes: newNotes},
            {allowProtoPropertiesByDefault: true},
        );
        this.addEditButtonsEventListeners();
        this.checkFinishedCheckboxes(newNotes);
    }

    initEventHandlers() {
        if (!this.isCreatePage()) {
            this.theme.addEventListener('change', () => {
                this.toggleTheme();
            });

            this.noteContainer.addEventListener('click', (event) => {
                const noteId = Number(event.target.dataset.id);
            });

            this.orderCriterias.forEach((radio) => {
                radio.addEventListener('click', () => {
                    this.getNotes(radio.value);
                });
            });

            this.createNewNote.addEventListener('click', () => {
                window.location.href = `http://localhost:3000/create.html?theme=${this.theme.value}`;
            });
        }

        if (this.isCreatePage()) {
            this.newNoteSubmit.addEventListener('click', (event) => {
                this.setCurrentFormValues();
                if (this.newNote.reportValidity()) {
                    noteService.submitNote(new Note(this.id, this.newTitle, this.newDescription, this.newPriority, false, this.newEndDate)); //TODO remove hardcoded elements
                    window.location.href = `http://localhost:3000/index.html?theme=${this.selectedTheme}`;
                }
                event.preventDefault();
            });

            this.cancel.addEventListener('click', () => {
                console.log('cancel');
                window.location.href = `http://localhost:3000/index.html?theme=${this.selectedTheme}`;
            });
        }
    }

    addEditButtonsEventListeners() {
        this.editButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const selectedNote = this.notes.find((note) => note._id === button.value);
                window.location.href = `http://localhost:3000/create.html?theme=${this.theme.value}&id=${button.value}&title=${selectedNote.title}&description=${selectedNote.description}&priority=${selectedNote.priority}&endDate=${selectedNote.endDate}`;
            });
        });
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

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
    }

    checkFinishedCheckboxes(newNotes) {
        newNotes.forEach((newNote) => {
            if (newNote.finished) {
                console.log(newNote);
                document.getElementById(`notes-details-finished-${newNote._id}`).checked = true;
            }
        });
    }

    setCurrentFormValues() {
        this.newTitle = document.getElementById('title').value;
        this.newDescription = document.getElementById('description').value;
        this.newEndDate = document.getElementById('endDate').value;
        const priority = [...document.getElementsByName('priority')].filter((item) => item.checked)[0];
        if (priority) {
            this.newPriority = priority.value;
        }
    }

    isCreatePage() {
        return window.location.href.includes('create');
    }

    readUrlParams() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        this.selectedTheme = params.theme;
        this.id = params.id;
        document.getElementById('title').value = params.title ?? null;
        document.getElementById('description').value = params.description ?? null;
        if (params.priority) {
            [...document.getElementsByName('priority')].find((item) => item.value === params.priority).checked = true;
        }
        document.getElementById('endDate').valueAsDate = new Date(params.endDate);

        if (this.selectedTheme && this.selectedTheme === 'darkMode') {
            this.toggleTheme();
        }
    }

    readIndexUrlParams() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        if (params.theme) {
            this.theme.value = params.theme;
        }
        if (params.theme && params.theme === 'darkMode') {
            this.toggleTheme();
        }
    }

    isChecked (isChecked) {
        if (isChecked === 'true') {
            return 'checked';
        }
        return 'unchecked';
    }
}

// create one-and-only instance
new NoteController().initialize();
