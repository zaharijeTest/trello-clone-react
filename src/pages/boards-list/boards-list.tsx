import { useEffect } from "react";
import { connect } from "react-redux";
import { IBoard } from "../../@types/board";
import { IStore } from "../../@types/store";
import { getBoards }  from '../../core/store/board/actions';

interface IBoardProps {
    boards: IBoard[];
    getBoards?: any;
}
const BoardsListPage = ({getBoards, boards}:IBoardProps) => {

    useEffect(() => {
        getBoards();
    },[]);

    return (
    <div>
        {boards.map(board => (
            <div key={board.id}>{board.name}</div>
        ))}
    </div>
)};



const mapStateToProps = (store:IStore):IBoardProps => ({
    boards: store.boards
});

const mapDispatchToProps = {
    getBoards
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardsListPage);

