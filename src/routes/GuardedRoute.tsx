import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';


interface GuardedRouteProps extends RouteProps {
  authorized: boolean;
  redirectPath: string;
}

const GuardedRoute: React.FC<GuardedRouteProps> = (props) =>
  
  props.authorized ? (
    <Route {...props} />
  ) : (
    <Redirect to={props.redirectPath} />
  );

export default GuardedRoute;
