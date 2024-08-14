
import {Button} from "shared/ui/button/Button";
import {render, screen} from "@testing-library/react";

describe("Button", () => {
    test("Test for button with correct props", () => {
        render(<Button>test button</Button>);
        expect(screen.getByText('test button')).toBeInTheDocument();
    })
})