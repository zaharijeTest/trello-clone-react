import { FunctionComponent } from "react";
import { connect } from "react-redux";
import { IBoard } from "../../../../@types/board";
import { IMapToProps, INullable, IStore } from "../../../../@types/store";

interface IBoardProps {
    board: INullable<IBoard>;
}

const Board:FunctionComponent<IBoardProps> = ({board}) => {
    return (
        <div>{board?.name}</div>
    )
}

const mapToProps: IMapToProps<IBoardProps> = [
    (store: IStore) => ({board: store.selectedBoard}),
    {}
]

export default connect(...mapToProps)(Board);