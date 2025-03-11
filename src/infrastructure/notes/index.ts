import notesApi from "./api";
import { NotesService } from "./service";

const notesService = new NotesService(notesApi);

export default notesService;
