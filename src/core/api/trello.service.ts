import { IBoard } from "../../@types/board";
import { createQueryParams, parseResponse } from "../../utils/api.util";
import { StorageService, STORAGE_KEYS } from "../services/storage.service";
import { TRELLO_ENDPOINTS } from "./api-endpoints";

export class TrelloService {
  private storageService: StorageService;
  private token: string;
  private username: string;

  constructor() {
    this.storageService = new StorageService();
    this.init();
  }

  init() {
    const user = this.storageService.get(STORAGE_KEYS.USER);
    if (user) {
      this.token = user.token;
      this.username = user.username;
    }
  }

  authorize() {
    window.location.href = TRELLO_ENDPOINTS.authorize();
  }

  getUserInfo(token = this.token) {
    return parseResponse<any>(fetch(TRELLO_ENDPOINTS.getUserInfo(token)));
  }

  getBoards() {
    return parseResponse<IBoard[]>(
      fetch(TRELLO_ENDPOINTS.getBoards(this.username, this.token))
    );
  }

  getBoardCards(boardId) {
    return parseResponse(
      fetch(TRELLO_ENDPOINTS.getBoardCards(boardId, this.token))
    );
  }

  getBoardCard(cardId) {
    return parseResponse(
      fetch(TRELLO_ENDPOINTS.getBoardCard(cardId, this.token))
    );
  }

  generateAvatarUrl(url, size = 30) {
    return `${url}/${size}.png`;
  }

  createBoard(boardName) {
    return parseResponse(
      fetch(TRELLO_ENDPOINTS.createBoard(boardName, this.token), {
        method: "POST",
      })
    );
  }

  updateCard(cardId, body) {
    const query = createQueryParams(body);
    return parseResponse(
      fetch(TRELLO_ENDPOINTS.updateCard(cardId, query, this.token), {
        method: "PUT",
      })
    );
  }

  createCard(body) {
    const query = createQueryParams(body);
    return parseResponse(
      fetch(TRELLO_ENDPOINTS.createCard(query, this.token), {
        method: "POST",
      })
    );    
  }

  createComment(cardId, commentText) {
    return parseResponse(
      fetch(TRELLO_ENDPOINTS.createComment(cardId, commentText, this.token), {
        method: "POST",
      })
    );   
  }
}
