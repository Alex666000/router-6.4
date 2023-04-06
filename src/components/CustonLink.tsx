import React, {FC} from "react";
import {Link, useMatch} from "react-router-dom";

type CustonLinkType = {
    children: React.ReactNode
    to: string
}

export const CustonLink: FC<CustonLinkType> = ({children, to = "", ...props}) => {
    const match = useMatch({
        path: to,
        end: to.length === 1,
    });

    return (
        <Link
            to={to}
            style={{
                /* цвет будет зависеть от match */
                color: match ? "var(--color-active)" : "white"
            }}
            {...props}>
            {children}
        </Link>
    );
};

