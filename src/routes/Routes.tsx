import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { JsxElement } from 'typescript';
import { Routes } from ".";
import NotFound from "../containers/NotFound";
import GuardedRoute from "./GuardedRoute";
interface RouterProps {
  routes: Routes;
  authorized: boolean;
  redirectPath: string;
  children: React.ReactNode;
}

const Router: React.FC<RouterProps> = ({
  routes,
  authorized,
  redirectPath,
}:RouterProps) => (
  <BrowserRouter>
    <Switch>
      {Object.entries(routes).map(([key, props]) =>
        props.guarded ? (
          <GuardedRoute
            key={key}
            authorized={authorized}
            redirectPath={redirectPath}
            exact
            {...props}
          />
        ) : (
          <Route key={key} exact {...props} />
        )

      )}
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;