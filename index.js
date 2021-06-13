import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from "method-override"
import {noteRoutes} from './routes/noteRoutes.js'

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride(methodOverrideFn));

function methodOverrideFn(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}

app.use(noteRoutes);
app.use(express.static('./public'));

// const hostname = '127.0.0.1';
const port = 3000;
app.listen(port,() => {console.log(`Note-Server running at http://localhost:${port}/`); });

