import {noteService} from '../services/note-service.js';
import {Note} from '../services/note.js';

export class IndexController {
    constructor() {
            // eslint-disable-next-line no-undef
            this.noteTemplateCompiled = Handlebars.compile(document.getElementById('note-list-template').innerHTML);
            this.noteContainer = document.getElementById('note-container');
            this.orderCriterias = document.getElementsByName('order');
            [...this.orderCriterias].find((item) => item.value === 'importance').checked = true;
            this.theme = document.getElementById('theme');
            this.createNewNote = document.getElementById('create-new-note');
            this.showFinished = document.getElementById('show-finished');

            this.editButtons = document.getElementsByName('notes-details-edit');
            this.finishedCheckboxes = document.getElementsByName('notes-details-finished');
            this.notesDescriptions = document.getElementsByName('notes-details-description');
            this.showFinishedChecked = false;
            this.readUrlParams();
    }

    showNotes(newNotes) {
        this.notes = newNotes;
        this.noteContainer.innerHTML = this.noteTemplateCompiled(
            {notes: newNotes},
            {allowProtoPropertiesByDefault: true},
        );
        this.addEditButtonsEventListeners();
        this.newNotes = newNotes;
        this.checkFinishedCheckboxes();
        this.addPriorities();
        this.addUnfoldButton();
    }

    addUnfoldButton() {
        this.notesDescriptions.forEach((description) => {
            if (description.offsetHeight < description.scrollHeight) {
                const unfoldButton = description.lastChild;
                unfoldButton.classList.toggle('notes-details-description-button-shown');
                unfoldButton.addEventListener('click', () => {
                    description.classList.toggle('notes-details-description-unfolded');
                    unfoldButton.classList.toggle('notes-details-description-button-shown-unfolded');
                });
            }
        });
    }

    initEventHandlers() {
        this.theme.addEventListener('change', () => {
            this.toggleTheme();
        });

        this.showFinished.addEventListener('click', () => {
            this.showFinishedChecked = this.showFinished.checked;
            this.getNotes(this.selectedOrder, this.showFinishedChecked);
        });

        this.orderCriterias.forEach((radio) => {
            radio.addEventListener('click', () => {
                this.selectedOrder = radio.value;
                this.getNotes(this.selectedOrder, this.showFinishedChecked);
            });
        });

        this.createNewNote.addEventListener('click', () => {
            window.location.href = `http://localhost:3000/create.html?theme=${this.theme.value}`;
        });
    }

    addEditButtonsEventListeners() {
        this.editButtons.forEach((button) => {
            button.addEventListener('click', () => {
                window.location.href = `http://localhost:3000/create.html?theme=${this.theme.value}&id=${button.value}`;
            });
        });

        this.finishedCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener('click', () => {
                const checkedNote = this.notes.find((note) => note.id === checkbox.value);
                const checkedNoteFinished = checkbox.checked;
                noteService.submitNote(new Note(checkedNote.id,
                    checkedNote.title, checkedNote.description, checkedNote.priority,
                    checkedNoteFinished, checkedNote.endDate));
                this.getNotes(this.selectedOrder, this.showFinishedChecked);
            });
        });
    }

    renderNoteView(notes) {
        this.showNotes(notes);
    }

    initialize() {
        this.initEventHandlers();
        this.getNotes('importance');
    }

    getNotes(order, showFinished = false) {
        const self = this;
        noteService.getNotes((notes) => {
            self.renderNoteView(notes);
        }, order, showFinished);
    }

    checkFinishedCheckboxes() {
        this.newNotes.forEach((newNote) => {
            if (newNote.finished) {
                document.getElementById(`notes-details-finished-${newNote.id}`).checked = true;
            }
        });
    }

    addPriorities() {
        this.newNotes.forEach((newNote) => {
            if (newNote.priority) {
                const priorityIcons = document.getElementsByName(`priority-${newNote.id}`);
                for (let i = 0; i < newNote.priority; i++) {
                    priorityIcons[i].setAttribute('src', './data/flash-yellow.svg');
                }
            }
        });
    }

    readUrlParams() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        if (params.theme) {
            this.theme.value = params.theme;
        }
        if (params.theme && params.theme === 'darkMode') {
            this.toggleTheme();
        }

        this.showFinishedChecked = params.showFinished ?? false;
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
    }
}

// create one-and-only instance
new IndexController().initialize();
