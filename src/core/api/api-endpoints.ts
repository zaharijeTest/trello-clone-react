import { APP_CONFIG } from "../../config/constants";

const { TRELLO_API_BASE_URL, TRELLO_API_KEY, BASE_URL } = APP_CONFIG;

export const TRELLO_ENDPOINTS = {
  authorize: () =>
    `${TRELLO_API_BASE_URL}/authorize?expiration=1day&name=MyPersonalToken&scope=read,write&response_type=token&key=${TRELLO_API_KEY}&return_url=${BASE_URL}/login`,
  getUserInfo: (token) =>
    `${TRELLO_API_BASE_URL}/members/me?fields=all&key=${TRELLO_API_KEY}&token=${token}`,
  getBoards: (username, token) =>
    `${TRELLO_API_BASE_URL}/members/${username}/boards?lists=open&key=${TRELLO_API_KEY}&token=${token}`,
  createBoard: (queryParams, token) =>
    `${TRELLO_API_BASE_URL}/boards?${queryParams}&key=${TRELLO_API_KEY}&token=${token}`,
  getBoardCards: (boardId, token) =>
    `${TRELLO_API_BASE_URL}/boards/${boardId}/cards?members=true&key=${TRELLO_API_KEY}&token=${token}`,
  getBoard: (boardId, token) =>
    `${TRELLO_API_BASE_URL}/boards/${boardId}?lists=open&list_fields=all&members=all&key=${TRELLO_API_KEY}&token=${token}`,
  getBoardCard: (cardId, token) =>
    `${TRELLO_API_BASE_URL}/cards/${cardId}?actions=commentCard&fields=all&members=true&key=${TRELLO_API_KEY}&token=${token}`,
  createCard: (queryParams, token) =>
    `${TRELLO_API_BASE_URL}/cards/?${queryParams}&key=${TRELLO_API_KEY}&token=${token}`,
  updateCard: (cardId, queryParams, token) =>
    `${TRELLO_API_BASE_URL}/cards/${cardId}?${queryParams}&key=${TRELLO_API_KEY}&token=${token}`,
  createComment: (cardId, commentText, token) =>
    `${TRELLO_API_BASE_URL}/cards/${cardId}/actions/comments?text=${commentText}&key=${TRELLO_API_KEY}&token=${token}`,
};
