import { IBoard, INewBoard } from "../../../@types/board"

export const BOARD_ACTIONS = {
    GET_BOARDS: 'GET_BOARDS',
    BOARDS: 'BOARDS',
    SELECT_BOARD: 'SELECT_BOARD',
    SELECTED_BOARD: 'SELECTED_BOARD',
    CREATE_BOARD: 'CREATE_BOARD',
}

export const getBoards = () => ({type: BOARD_ACTIONS.GET_BOARDS});
export const selectBoard = (board: IBoard) => ({type: BOARD_ACTIONS.SELECT_BOARD, data: board});
export const selectedBoard = () => ({type: BOARD_ACTIONS.SELECTED_BOARD});
export const createBoard = (newBoard: INewBoard) => ({type: BOARD_ACTIONS.CREATE_BOARD, data: newBoard});
