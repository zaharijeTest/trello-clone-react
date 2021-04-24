import { FunctionComponent } from "react";
import { Redirect, Route } from "react-router";

export const ProtectedRoute: FunctionComponent<{isAuthenticated: boolean, Component?: any, path: string | string[]}> = (props) => {
    return (
        <Route path={props.path}
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