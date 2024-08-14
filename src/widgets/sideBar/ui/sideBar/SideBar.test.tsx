import {render, screen} from "@testing-library/react";
import {SideBar} from "./SideBar";

describe('sidebar', () => {
    test('sidebar test only one param', () => {})
    render(<SideBar/>);
    expect(screen.getByTestId('sideBar')).toBeInTheDocument();
});