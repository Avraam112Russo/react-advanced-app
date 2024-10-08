import {classNames} from "shared/lib/classNames/classNames";
import {ReactNode} from "react";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
export interface renderWithRouterProps {
    className?: string;
}
export interface RenderWithRouteProps{
    route?: string
}

// testing jest routes
export function RenderWithRouter (component: ReactNode, options: RenderWithRouteProps = {}) {
    const {route = '/'} = options;
    return render(
        <MemoryRouter initialEntries={[route]}>
            {component}
        </MemoryRouter>
    );
};
