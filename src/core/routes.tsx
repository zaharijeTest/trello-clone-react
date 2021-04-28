import BoardsList from "../pages/boards-list/boards-list";
import Board from "../pages/board/board";
import LoginPage from "../pages/login/login";

interface IRoute {
    component: any
    path: string | string[]
    protected?: boolean
}
export const ROUTES: IRoute[] = [
    { path: '/about', component: () => <div>About</div> },
    { path: '/login', component: LoginPage },
    { path: '/boards/:boardId', component: Board, protected: true },
    { path: ['/', '/boards'], component: BoardsList },
]