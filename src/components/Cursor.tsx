import React, { useRef, useMemo } from "react";
import useMouse from "@react-hook/mouse-position";
import { motion } from "framer-motion";

const Cursor = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  const { clientX: mouseXPosition = 0, clientY: mouseYPosition = 0 } = mouse;

  const variants = useMemo(
    () => ({
      default: {
        opacity: 0.6,
        height: 24,
        width: 24,
        backgroundColor: "#1e91d6",
        x: mouseXPosition,
        y: mouseYPosition,
        borderRadius: "50%",
        transition: {
          type: "spring",
          mass: 0.6,
        },
      },
    }),
    [mouseXPosition, mouseYPosition]
  );

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28,
  };

  return (
    <div ref={ref}>
      <motion.div
        /* @ts-ignore */
        variants={variants}
        className="circle"
        animate="default"
        transition={spring}
      />
      {children}
    </div>
  );
};

export default Cursor;
