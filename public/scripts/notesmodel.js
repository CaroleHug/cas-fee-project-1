function getTodaysDate() {
    const dateTodayUnformatted = new Date();
    const test = `${dateTodayUnformatted.getDay().toString()}.${dateTodayUnformatted.getMonth().toString()}.${dateTodayUnformatted.getFullYear().toString()}`;
    return test;
}

const notes = [
    {id: '01', title: 'Mami anrufen', endDate: '', finished: false, finishDate: '', description: '888 888 88 88', urcengy: 0},
    {id: '02', title: 'Einkaufen', endDate: getTodaysDate(), finished: false, finishDate: '', description: 'Butter, Eier', urcengy: 1},
    {id: '03', title: 'CAS FEE Selbststudium/Projekt Aufgabe erledigen', endDate: '', finished: true, finishDate: getTodaysDate().toString(), description: 'HTML für die note App erstellen, CSS erstellen für die note App', urcengy: 2},
];

function compareNotes(s1, s2) {
    return s2.urcengy - s1.urcengy;
}

function notesSorted() {
    return [...notes].sort(compareNotes);
}



