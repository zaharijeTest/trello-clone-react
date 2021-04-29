import { FunctionComponent } from "react";
import { Redirect, Route } from "react-router";

interface IProtectedRouteProps {
  isAuthenticated: boolean;
  component?: any;
  path: string | string[];
  exact?: boolean;
}

export const ProtectedRoute: FunctionComponent<IProtectedRouteProps> = ({
  component,
  children,
  path,
  isAuthenticated,
}) => {
  const Page = component as keyof JSX.IntrinsicElements;
  return (
    <Route
      exact
      path={path}
      render={() => {
        if (isAuthenticated) {
          return component ? <Page /> : children;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};
