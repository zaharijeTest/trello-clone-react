import { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import {  useParams } from "react-router";
import { IBoard } from "../../../../@types/board";
import { IDispatch, IMapToProps, INullable, IStore } from "../../../../@types/store";
import { getBoardAction} from '../../../../core/store/board/actions';

interface IBoardStateProps {
    board: INullable<IBoard>;
    location?: any;
}

interface IBoardDispatchProps {
    getBoardAction: IDispatch
}

interface IBoardProps extends IBoardStateProps, IBoardDispatchProps {};



const Board:FunctionComponent<IBoardProps> = ({board, getBoardAction}) => {
    const { boardId } = useParams<{boardId: string}>();
    console.log(boardId, board);
    useEffect(() => {
        getBoardAction(boardId);
    }, [getBoardAction])
    return (
        <div>{board?.name}</div>
    )
}

const mapToProps: IMapToProps<IBoardStateProps, IBoardDispatchProps> = [
    (store: IStore) => ({board: store.boardsStore.selectedBoard}),
    { getBoardAction }
]

export default connect(...mapToProps)(Board);