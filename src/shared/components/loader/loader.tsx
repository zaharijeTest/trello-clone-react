import { FunctionComponent } from "react";
import "./loader.css";

export const Loader: FunctionComponent<{ loading: boolean }> = ({
  loading,
  children,
}) => {
  return (
    <>
      {loading ? (
        <div className="loader-wrapper">
          <div className="loader-spinner" />
        </div>
      ) : null}{" "}
      {children}
    </>
  );
};
