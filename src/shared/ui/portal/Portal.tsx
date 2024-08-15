import {ReactNode} from "react";
import {createPortal} from "react-dom";

export interface PortalProps {
    children: ReactNode, // object for teleport
    element?: HTMLElement  // destination for teleport
}
export const Portal = (props:PortalProps) => {
    const {
        children,
        element = document.body
    } = props;
    return createPortal(children, element)
};
