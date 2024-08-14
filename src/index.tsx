import {render} from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "app/providers/themeProvider";
import {ErrorBoundary} from "app/providers/errorBoundary";

render(
    <ErrorBoundary>{/* handle error*/}
    <BrowserRouter>
        <ThemeProvider>
        <App/>
        </ThemeProvider>
    </BrowserRouter>
    </ErrorBoundary>,
    document.getElementById("root")
)