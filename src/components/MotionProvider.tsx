"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/**
 * Honours prefers-reduced-motion for every framer-motion animation in the app,
 * so entrance choreography parks itself for users who ask for stillness.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
