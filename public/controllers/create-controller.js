import {noteService} from '../services/note-service.js';
import {Note} from '../services/note.js';

export class CreateController {
    constructor() {
        // eslint-disable-next-line no-undef
        this.noteTemplateCompiled = Handlebars.compile(document.getElementById('note-template').innerHTML);
        this.noteContainer = document.getElementById('note-container');
        this.readUrlParams();
    }

    initEventHandlers() {
        this.newNoteSubmit.addEventListener('click', (event) => {
            this.setCurrentFormValues();
            if (this.newNote.reportValidity()) {
                noteService.submitNote(new Note(this.id, this.newTitle, this.newDescription,
                    this.newPriority, this.selectedFinished || false, this.newEndDate));
                window.location.href = `http://localhost:3000/index.html?theme=${this.selectedTheme}`;
            }
            event.preventDefault();
        });

        this.cancel.addEventListener('click', () => {
            window.location.href = `http://localhost:3000/index.html?theme=${this.selectedTheme}`;
        });
    }

    addPriorityRadioEventListeners() {
        this.priorityRadios.forEach((radio) => {
            radio.addEventListener('click', () => {
                this.priorityRadios.forEach((element) => {
                    element.setAttribute('src', './data/flash-grey.svg');
                });

                let i = 0;
                while (this.priorityRadios[i - 1] !== radio) {
                    this.priorityRadios[i].setAttribute('src', './data/flash-yellow.svg');
                    i++;
                }
            });
        });
    }

    setCurrentPriority() {
        if (this.priority && this.priority > 0) {
            let i = 0;
            while (i < this.priority) {
                this.priorityRadios[i].setAttribute('src', './data/flash-yellow.svg');
                i++;
            }
        }
    }

    setCurrentFormValues() {
        this.newTitle = document.getElementById('title').value;
        this.newDescription = document.getElementById('description').value;
        this.newEndDate = document.getElementById('endDate').value;
        const priority = [...document.getElementsByName('priority-radio')].filter((item) => item.checked)[0];
        if (priority) {
            this.newPriority = priority.value;
        }
    }

    readUrlParams() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        this.selectedTheme = params.theme;
        this.id = params.id;
        if (this.selectedTheme && this.selectedTheme === 'darkMode') {
            document.body.classList.toggle('dark-theme');
        }
        this.getNote(this.id);
    }

    showNote(note) {
        this.note = note;
        this.noteContainer.innerHTML = this.noteTemplateCompiled(
            {note},
            {allowProtoPropertiesByDefault: true},
        );
        this.priority = note.priority;
        this.selectedFinished = note.finished;
        this.newNote = document.getElementById('newNote');
        this.newNoteSubmit = document.getElementById('new-note-submit');
        this.cancel = document.getElementById('cancel');
        this.priorityRadios = document.getElementsByName('priority');
        document.getElementById('createOrEditTitle').innerHTML = this.id ? 'Edit note' : 'Create new note';
        this.setCurrentPriority();
        this.addPriorityRadioEventListeners();
        this.setCurrentFormValues();
        this.initEventHandlers();
    }

    renderNoteView(note) {
        this.showNote(note);
    }

    getNote(id) {
        const self = this;
        noteService.getNote((note) => {
            self.renderNoteView(note);
        }, id);
    }

    initialize() {
        /* Load */
    }
}

// create one-and-only instance
new CreateController().initialize();
