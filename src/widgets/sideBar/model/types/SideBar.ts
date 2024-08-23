import React from "react";

export interface SIdeBarItemType {
    path?: string,
    text?: string,
    icon?: React.VFC<React.SVGProps<SVGSVGElement>>,
    authOnly?: boolean
}