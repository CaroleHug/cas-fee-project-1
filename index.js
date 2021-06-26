import express from 'express';
import bodyParser from 'body-parser';
import {noteRoutes} from './routes/noteRoutes.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(noteRoutes);
app.use(express.static('./public'));

const port = 3000;
app.listen(port, () => { console.log(`Note-Server running at http://localhost:${port}/`); });
