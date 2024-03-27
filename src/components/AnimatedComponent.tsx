import {motion} from "framer-motion";
import React, {ReactNode} from "react";

interface IChildren {
    children: ReactNode
}

const animations = {
    initial: {opacity: 0, y: 1000},
    animate: {opacity: 1, y: 0},
    exit: {opacity: 0, y: -700,},
}

export const AnimatedComponent = ({children}: IChildren) => {
    return (
        <motion.div variants={animations}
                    initial={"initial"}
                    animate={'animate'}
                    exit={'exit'}
                    transition={{duration: 0.85}}
        >
            {children}
        </motion.div>
    )
}