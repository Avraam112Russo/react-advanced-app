import {render} from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "app/providers/themeProvider";
import {ErrorBoundary} from "app/providers/errorBoundary";
import "./app/styles/index.scss"
import {StoreProvider} from "app/providers/storeProvider";
render(
    <BrowserRouter>
    <StoreProvider >
    <ErrorBoundary>{/* handle error*/}
        <ThemeProvider>
        <App/>
        </ThemeProvider>
    </ErrorBoundary>
    </StoreProvider>
    </BrowserRouter>,
    document.getElementById("root")
)