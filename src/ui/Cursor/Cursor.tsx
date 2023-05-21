import React, { useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";

import styles from "./cursor.module.css";

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const lastCalled = useRef(Date.now());

  const mouseMoveHandler = (e: any) => {
    if (Date.now() - lastCalled.current > 100) {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
      lastCalled.current = Date.now();
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMoveHandler);
    return () => window.removeEventListener("mousemove", mouseMoveHandler);
  }, []);

  const variants: Variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 70,
      y: mousePosition.y - 70,
    },
  };

  return (
    <motion.div
      transition={{ duration: 2, type: "spring", stiffness: 100, mass: 0.1 }}
      className={styles.cursor}
      variants={variants}
      animate="default"
    />
  );
};

export default Cursor;
