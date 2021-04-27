import { ReactComponent as AppLogo } from '../../assets/iconfinder_clone_216965.svg';
import { Button } from '../../shared/components/button/button';
import { Input } from '../../shared/components/input/input.component';
import { ReactComponent as HomeLogo } from '../../assets/icons/home.icon.svg';
import { ReactComponent as MenuLogo } from '../../assets/icons/menu.icon.svg';
import { ReactComponent as BoardLogo } from '../../assets/icons/board.icon.svg';
import { useHistory } from 'react-router';
import './header.css';

export const Header = () => {
    const history = useHistory();
    return (
        <header>
            <div className="header-control-wrapper">
                <Button transparent={true} onClicked={() => history.push('/boards')}>
                    <HomeLogo></HomeLogo>
                </Button>
                <Button transparent={true}>
                    <MenuLogo></MenuLogo>
                </Button>
                <Button transparent={true}>
                    <BoardLogo></BoardLogo>
                    <span className="bold small-font">Boards</span>
                </Button>
                <Input placeholder="Jump to..."></Input>
            </div>
            <span>Trello </span>
            <AppLogo className="app-logo"></AppLogo>
            <div className="header-profile-wrapper"></div>
        </header>


    )
}