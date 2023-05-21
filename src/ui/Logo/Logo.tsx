import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
} from "framer-motion";
import styles from "./logo.module.css";

type ParallaxProps = {
  children: string;
  baseVelocity: number;
  repeat?: number;
};

const ParallaxHeading = ({
  children,
  baseVelocity = 100,
  repeat = 6,
}: ParallaxProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-100 / repeat, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_, delta) => {
    const updateDirectionFactor = (): void => {
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
    };

    const calculateMoveBy = (): number => {
      const baseMoveBy =
        directionFactor.current * baseVelocity * (delta / 1000);
      const additionalMoveBy =
        directionFactor.current * baseMoveBy * velocityFactor.get();
      return baseMoveBy + additionalMoveBy;
    };

    updateDirectionFactor();
    baseX.set(baseX.get() + calculateMoveBy());
  });

  return (
    <div className={styles.parallax}>
      <motion.div className={styles.headingScroller} style={{ x }}>
        {Array.from({ length: repeat }).map((_, i) => (
          <h2 className={styles.heading} key={i}>
            {children}
          </h2>
        ))}
      </motion.div>
    </div>
  );
};

const ParallaxText = ({
  children,
  baseVelocity = 100,
  repeat = 12,
}: ParallaxProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-100 / repeat, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_, delta) => {
    const updateDirectionFactor = (): void => {
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
    };

    const calculateMoveBy = (): number => {
      const baseMoveBy =
        directionFactor.current * baseVelocity * (delta / 1000);
      const additionalMoveBy =
        directionFactor.current * baseMoveBy * velocityFactor.get();
      return baseMoveBy + additionalMoveBy;
    };

    updateDirectionFactor();
    baseX.set(baseX.get() + calculateMoveBy());
  });

  return (
    <div className={styles.parallax}>
      <motion.div className={styles.spanScroller} style={{ x }}>
        {Array.from({ length: repeat }).map((_, i) => (
          <span className={styles.span} key={i}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
const Logo = () => (
  <div className="logo">
    <ParallaxText baseVelocity={-5}>jp-knj</ParallaxText>
    <ParallaxHeading baseVelocity={-1}>jp-knj</ParallaxHeading>
    <ParallaxText baseVelocity={5}>jp-knj</ParallaxText>
  </div>
);

export default Logo;
