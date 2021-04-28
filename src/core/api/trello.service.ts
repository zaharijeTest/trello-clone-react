import { IBoard, INewBoard } from "../../@types/board";
import { IBoardCard } from "../../@types/card";
import { BoardModel } from "../../models/board.model";
import { CardModel } from "../../models/card.model";
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
    if (this.token && this.username) {
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
    ).then(boards => boards.map(board => new BoardModel(board)));
  }

  getBoardCards(boardId: string) {
    return parseResponse<IBoardCard[]>(
      fetch(TRELLO_ENDPOINTS.getBoardCards(boardId, this.getToken()))
    );
  }


  async getBoard(boardId: string) {
    const boardPromise = parseResponse<IBoard>(
      fetch(TRELLO_ENDPOINTS.getBoard(boardId, this.getToken()))
    );
    const cardsPromise = this.getBoardCards(boardId);
    const [board, cards] = await Promise.all([boardPromise, cardsPromise]);
    return new BoardModel(board, cards);
  }


  getBoardCard(cardId) {
    return parseResponse<IBoardCard>(
      fetch(TRELLO_ENDPOINTS.getBoardCard(cardId, this.getToken()))
    ).then(res => new CardModel(res));
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
