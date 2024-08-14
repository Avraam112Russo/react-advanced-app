import {Component, ErrorInfo, ReactNode, Suspense} from "react";
import {PageError} from "widgets/pageError";
import {Loader} from "shared/ui/loader/Loader";

export interface ErrorBoundaryProps {
    children?:ReactNode;
}
export interface ErrorBoundaryState {
    hasError: boolean;
}


class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;
        // ErrorBoundaryState
        if (hasError) {
            return<Suspense fallback={<Loader/>}><PageError/></Suspense>
        }
        // ErrorBoundaryProps
        return children;
    }
}
export default ErrorBoundary;