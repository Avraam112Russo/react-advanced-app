import {render, screen} from "@testing-library/react";
import {SideBar} from "./SideBar";
import {RenderWithRouter} from "../../../../../config/test/renderWithRouter/renderWithRouter";

describe('sidebar', () => {
    test('sidebar test only one param', () => {})
    RenderWithRouter(<SideBar/>)
    expect(screen.getByTestId('sideBar')).toBeInTheDocument();
});