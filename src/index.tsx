import {render} from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "app/providers/themeProvider";
import {ErrorBoundary} from "app/providers/errorBoundary";
import "./app/styles/index.scss"
import {StoreProvider} from "app/providers/storeProvider";
render(
    <StoreProvider>
    <ErrorBoundary>{/* handle error*/}
    <BrowserRouter>
        <ThemeProvider>
        <App/>
        </ThemeProvider>
    </BrowserRouter>
    </ErrorBoundary>
    </StoreProvider>,
    document.getElementById("root")
)