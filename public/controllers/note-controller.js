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
            this.showFinished = document.getElementById('show-finished');

            this.editButtons = document.getElementsByName('notes-details-edit');
            this.finishedCheckboxes = document.getElementsByName('notes-details-finished');
            this.notesDetails = document.getElementsByName('notes-details');
            this.notesDescriptions = document.getElementsByName('notes-details-description');
            this.showFinishedChecked = false;
            this.readIndexUrlParams();
        }

        if (this.isCreatePage()) {
            this.newNote = document.getElementById('newNote');
            this.newNoteSubmit = document.getElementById('new-note-submit');
            this.cancel = document.getElementById('cancel');
            this.priorityRadios = document.getElementsByName('priority');

            this.setCurrentFormValues();
            this.readUrlParams();
            this.addPriorityRadioEventListeners();
            this.setCurrentPriority();
        }
    }

    showNotes(newNotes) {
        this.notes = newNotes;
        this.noteContainer.innerHTML = this.noteTemplateCompiled(
            {notes: newNotes},
            {allowProtoPropertiesByDefault: true},
        );
        this.addEditButtonsEventListeners();
        this.checkFinishedCheckboxes(newNotes);
        this.addPriorities(newNotes);
        this.addUnfoldButton(newNotes);
    }

    addUnfoldButton(newNotes) {
        this.notesDescriptions.forEach((description) => {
            if(description.offsetHeight < description.scrollHeight) {
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
        if (!this.isCreatePage()) {
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

            // this.notesDescriptions.forEach((description) => {
            //     description.addEventListener('overflow', () => {
            //         console.log(description);
            //     });
            // });

            this.createNewNote.addEventListener('click', () => {
                window.location.href = `http://localhost:3000/create.html?theme=${this.theme.value}`;
            });
        }

        if (this.isCreatePage()) {
            this.newNoteSubmit.addEventListener('click', (event) => {
                this.setCurrentFormValues();
                if (this.newNote.reportValidity()) {
                    noteService.submitNote(new Note(this.id, this.newTitle, this.newDescription, this.newPriority, this.selectedFinished || false, this.newEndDate));
                    window.location.href = `http://localhost:3000/index.html?theme=${this.selectedTheme}`;
                }
                event.preventDefault();
            });

            this.cancel.addEventListener('click', () => {
                window.location.href = `http://localhost:3000/index.html?theme=${this.selectedTheme}`;
            });
        }
    }

    addEditButtonsEventListeners() {
        this.editButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const selectedNote = this.notes.find((note) => note._id === button.value);
                window.location.href = `http://localhost:3000/create.html?theme=${this.theme.value}&id=${button.value}&title=${selectedNote.title}&description=${selectedNote.description}&finished=${selectedNote.finished}&priority=${selectedNote.priority}&endDate=${selectedNote.endDate}`;
            });
        });


        this.finishedCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener('click', () => {
                const checkedNote = this.notes.find((note) => note._id === checkbox.value);
                const checkedNoteFinished = checkbox.checked;
                noteService.submitNote(new Note(checkedNote._id, checkedNote.title, checkedNote.description, checkedNote.priority, checkedNoteFinished, checkedNote.endDate));
                this.getNotes(this.selectedOrder, this.showFinishedChecked);
            });
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

    renderNoteView(notes) {
        this.showNotes(notes);
    }

    initialize() {
        this.initEventHandlers();
        if (!this.isCreatePage()) {
            this.getNotes('importance');
        }
    }

    getNotes(order, showFinished = false) {
        const self = this;
        noteService.getNotes((notes) => {
            self.renderNoteView(notes);
        }, order, showFinished);
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
    }

    checkFinishedCheckboxes(newNotes) {
        newNotes.forEach((newNote) => {
            if (newNote.finished) {
                document.getElementById(`notes-details-finished-${newNote._id}`).checked = true;
            }
        });
    }

    addPriorities(newNotes) {
        newNotes.forEach((newNote) => {
            if (newNote.priority) {
                const priorityIcons = document.getElementsByName(`priority-${newNote._id}`);
                for (let i = 0; i < newNote.priority; i++) {
                    priorityIcons[i].setAttribute('src', './data/flash-yellow.svg');
                }
            }
        });
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

    isCreatePage() {
        return window.location.href.includes('create');
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
            this.toggleTheme();
        }
        this.selectedFinished = params.finished;
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

        this.showFinishedChecked = params.showFinished ?? false;
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
