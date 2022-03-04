import { DefaultTheme } from "styled-components";

export interface RouteMeta {
  headerHide?: boolean;
  footerHide?: boolean;
  isAuth?: boolean;
}
export interface Route {
  path: string;
  element: JSX.Element;
  meta?: RouteMeta;
}

export interface ReduceRoute extends Route {
  meta: {
    headerHide: boolean;
    footerHide: boolean;
    isAuth: boolean;
  };
}

export interface ReduceRouteMeata extends RouteMeta {
  headerHide: boolean;
  footerHide: boolean;
  isAuth: boolean;
}