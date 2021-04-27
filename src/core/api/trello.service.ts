import { IBoard, INewBoard } from "../../@types/board";
import { createQueryParams, parseResponse } from "../../utils/api.util";
import { StorageService, STORAGE_KEYS } from "../services/storage.service";
import { TRELLO_ENDPOINTS } from "./api-endpoints";

export class TrelloService {
  private storageService: StorageService;
  private token: string;
  private username: string;

  constructor() {
    this.storageService = new StorageService();
    this.getToken();
  }

  /** DEBUG: Please rewrite this part since this.username SET depends on getToken() method */
  getToken() {
    if(this.token && this.username) {
      return this.token;
    }
    const user = this.storageService.get(STORAGE_KEYS.USER);
    if (user) {
      this.token = user.token;
      this.username = user.username;
    }
    return this.token;
  }

  authorize() {
    window.location.href = TRELLO_ENDPOINTS.authorize();
  }

  getUserInfo(token = this.getToken()) {
    return parseResponse<any>(fetch(TRELLO_ENDPOINTS.getUserInfo(token)));
  }

  getBoards() {
    const token = this.getToken();
    return parseResponse<IBoard[]>(
      fetch(TRELLO_ENDPOINTS.getBoards(this.username, token))
    );
  }

  getBoardCards(boardId) {
    return parseResponse(
      fetch(TRELLO_ENDPOINTS.getBoardCards(boardId, this.getToken()))
    );
  }


  getBoard(boardId) {
    return parseResponse(
      fetch(TRELLO_ENDPOINTS.getBoard(boardId, this.getToken()))
    );
  }


  getBoardCard(cardId) {
    return parseResponse(
      fetch(TRELLO_ENDPOINTS.getBoardCard(cardId, this.getToken()))
    );
  }

  generateAvatarUrl(url, size = 30) {
    return `${url}/${size}.png`;
  }

  createBoard(body: INewBoard) {
    const query = createQueryParams(body);
    return parseResponse<IBoard>(
      fetch(TRELLO_ENDPOINTS.createBoard(query, this.getToken()), {
        method: "POST",
      })
    );
  }

  updateCard(cardId, body) {
    const query = createQueryParams(body);
    return parseResponse(
      fetch(TRELLO_ENDPOINTS.updateCard(cardId, query, this.getToken()), {
        method: "PUT",
      })
    );
  }

  createCard(body) {
    const query = createQueryParams(body);
    return parseResponse(
      fetch(TRELLO_ENDPOINTS.createCard(query, this.getToken()), {
        method: "POST",
      })
    );    
  }

  createComment(cardId, commentText) {
    return parseResponse(
      fetch(TRELLO_ENDPOINTS.createComment(cardId, commentText, this.getToken()), {
        method: "POST",
      })
    );   
  }
}
