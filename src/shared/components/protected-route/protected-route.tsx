import { FunctionComponent } from "react";
import { Redirect, Route } from "react-router";

interface IProtectedRouteProps {
    isAuthenticated: boolean, 
    Component?: any, 
    path: string | string[],
    exact?: boolean;
}

export const ProtectedRoute: FunctionComponent<IProtectedRouteProps> = (props) => {
    return (
        <Route exact path={props.path} 
            render = {() => {
                if(props.isAuthenticated) {
                    return props.Component ? <props.Component></props.Component> : props.children
                } else {
                    return <Redirect to="/login"></Redirect>
                }
            }}       
        >

        </Route>
    )
}