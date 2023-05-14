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
import "./parallaxText.css";

type ParallaxProps = {
  children: string;
  baseVelocity: number;
  repeat?: number; // New prop to control repetition
};

function ParallaxText({
  children,
  baseVelocity = 100,
  repeat = 6,
}: ParallaxProps) {
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
    function updateDirectionFactor(): void {
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
    }

    function calculateMoveBy(): number {
      const baseMoveBy =
        directionFactor.current * baseVelocity * (delta / 1000);
      const additionalMoveBy =
        directionFactor.current * baseMoveBy * velocityFactor.get();
      return baseMoveBy + additionalMoveBy;
    }

    updateDirectionFactor();
    const moveBy = calculateMoveBy();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i}>{children} </span> // Repeating the text dynamically
        ))}
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <header className="header">
      <ParallaxText baseVelocity={-5}>Framer Motion</ParallaxText>
      <ParallaxText baseVelocity={-1}>Kenji Tomita</ParallaxText>
      <ParallaxText baseVelocity={5}>Scroll velocity</ParallaxText>
    </header>
  );
}
