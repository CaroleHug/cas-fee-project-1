function submitNote() {
    const xhr = new XMLHttpRequest();
    const formData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        date: document.getElementById('endDate').value,
    };
    xhr.open('POST', 'notes');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(formData));
}

function getNotes() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'notes');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send();
}
