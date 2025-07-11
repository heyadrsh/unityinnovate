'use client';

import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';

interface MotionConfigProps {
  children: React.ReactNode;
}

export default function AppMotionConfig({ children }: MotionConfigProps) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </LazyMotion>
  );
} 