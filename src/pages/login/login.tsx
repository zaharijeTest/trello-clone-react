import { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { IMapToProps, INullable, IStore } from "../../@types/store";
import { IUser } from "../../@types/user";
import { AuthenticationService } from "../../core/services/authentication.service";
import { Button } from "../../shared/components/button/button";

interface ILoginPageStateProps {
    user?: INullable<IUser>;
}
const authenticationService = new AuthenticationService();

const login = () => {
    authenticationService.login();
}

const LoginPage: FunctionComponent<ILoginPageStateProps> = ({ user }) => {
    if (user?.id) {
        return <Redirect to="/boards"></Redirect>
    }
    return (
        <div className="authentication-wrapper">
            <div className="authentication-info">
                <p>*By clicking "Login", You will be redirected to the Trello Sign Up Page</p>
                <Button onClicked={login}><span>LOGIN</span></Button>
            </div>
        </div>
    )
}

const mapProps: IMapToProps<ILoginPageStateProps> = [
    (store: IStore) => ({ user: store.userStore.user }),
    {}
]


export default connect(...mapProps)(LoginPage);