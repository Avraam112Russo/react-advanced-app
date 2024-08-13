import {someFunc} from "test";
import {render} from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "app/providers/themeProvider";

someFunc("Hello, world");
render(
    <BrowserRouter>
        <ThemeProvider>

        <App/>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById("root")
)