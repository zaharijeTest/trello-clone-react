import React, { FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import { IBoard, INewBoard } from '../../../../@types/board';
import { IMapToProps, INullable } from '../../../../@types/store';
import { IUser } from '../../../../@types/user';
import { COLORS } from '../../../../config/colors';
import { Button } from '../../../../shared/components/button/button';
import { ColorChooser } from '../../../../shared/components/color-chooser/color-chooser';
import { Input } from '../../../../shared/components/input/input.component';
import './new-board.css';

interface INewBoardProps {
    user: INullable<IUser>
    boards: IBoard[];
    onSubmit: (board: INewBoard) => any
}
const NewBoard: FunctionComponent<INewBoardProps> = ({ user, boards, onSubmit}) => {
    const [board, setBoard] = useState<INewBoard>({});
    
    return (
        <div className="new-board-wrapper">
        <div className="flex">
            <div className="new-board-title-wrapper small-padding" style={{backgroundColor: board.backgroundColor, width: '300px'}}>
                <Input style={{color: 'white'}} placeholder="Board Name" onChanged={(e) => setBoard({...board,name:e.target.value})}></Input>
                <span className="white-text">{user?.fullName}'s workspace</span>
            </div>
            <div className="color-chooser-wrapper">
                <ColorChooser colors={Object.keys(COLORS).map(k => COLORS[k])} onColorChanged={(backgroundColor) => setBoard({...board, backgroundColor})}></ColorChooser>
            </div>
        </div>
        <div className="new-board-info-wrapper">
            <p className="bold white-text">You have used {boards.length} of 10 boards</p>
            <p>For unlimited Boards and Power-Ups, priority support, automation and more, upgrade to Business Class.</p>
        </div>
        <div>
            <Button disabled={!board.name || board.name.length === 0} onClicked={() => onSubmit(board)}><span>Create New Board</span></Button>
        </div>
    </div>
    )
}

const mapProps: IMapToProps<any, any> = [
    (store) => ({}),
    {}
]

export default connect(...mapProps)(NewBoard);