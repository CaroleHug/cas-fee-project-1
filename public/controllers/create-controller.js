import {noteService} from '../services/note-service.js';
import {Note} from '../services/note.js';

export class CreateController {
    constructor() {
        this.newNote = document.getElementById('newNote');
        this.newNoteSubmit = document.getElementById('new-note-submit');
        this.cancel = document.getElementById('cancel');
        this.priorityRadios = document.getElementsByName('priority');

        this.setCurrentFormValues();
        this.readUrlParams();
        this.addPriorityRadioEventListeners();
        this.setCurrentPriority();
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
        this.priority = params.priority;
        document.getElementById('title').value = params.title ?? null;
        document.getElementById('description').value = params.description ?? null;
        document.getElementById('endDate').valueAsDate = new Date(params.endDate);

        if (this.selectedTheme && this.selectedTheme === 'darkMode') {
            document.body.classList.toggle('dark-theme');
        }

        document.getElementById('createOrEditTitle').innerHTML = this.id ? 'Edit note' : 'Create new note';
        this.selectedFinished = params.finished;
    }

    initialize() {
        this.initEventHandlers();
    }
}

// create one-and-only instance
new CreateController().initialize();
