import express from 'express';
import * as notesController from '../controllers/notesController.js';

const router = express.Router();

// router.get('/', notesController.showIndex);
router.get('/notes', notesController.showNotes);
router.post('/notes', notesController.createNote);

export const noteRoutes = router;
