import { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { IUser } from "../../@types/user";
import { AuthenticationService } from "../../core/services/authentication.service";
import { Button } from "../../shared/components/button/button";

interface ILoginPageProps {
    user: IUser;
}
const authenticationService = new AuthenticationService();

const login = () => {
    authenticationService.login();
}

const LoginPage: FunctionComponent<ILoginPageProps> = ({ user }) => {
    if(user?.id) {
        return <Redirect to="/home"></Redirect>
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

const mapStateToProps = (state): ILoginPageProps => {
    const { user } = state;
    return {
      user
    }
  }
  export default connect(mapStateToProps)(LoginPage);