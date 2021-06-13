import {noteStore} from '../services/noteStore.js';

// export function showIndex(req, res) {
//     res.type('text/html');
//     res.write("<html>");
//     res.write("bla");
//     res.end("</html>");
// };

export function showNotes(req, res) {
    res.json({ id: 42 });
};

export function createNote(req, res) {
    console.log('notesController - createNote start');
    noteStore.add(req.body.title, req.body.description, req.body.priority, req.body.finished, req.body.date, function (err, note) {
        res.json({ errortext: 'could not add new note' });
    });
    console.log('notesController - createNote end');
};

// export function createPizza(req, res) {
//     console.log("createPizza start");
//     orderStore.add(req.body.name, "unkown", function (err, order) {
//         console.log("      callback start");
//
//         res.type('text/html');
//         res.write("<html>");
//         res.write("<p>Erfolgreich!</p>");
//         res.write("<p>Ihre order: " + order.pizzaName + "</p>");
//         res.write("<p>Ihre Nummer: " + order._id + " !</p>");
//         res.write("<p><a href='/orders/" + order._id + "/'>Zeige order an</a></p>");
//         res.end("</html>");
//
//         console.log("      callback end");
//     });
//     console.log("createPizza end");
// };
