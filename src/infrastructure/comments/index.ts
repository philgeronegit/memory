import commentsApi from "./api";
import { CommentsService } from "./service";

const commentsService = new CommentsService(commentsApi);

export default commentsService;
