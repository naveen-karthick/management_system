'use client';

import { TextGenerateEffect } from './text-generate';

const words = `Welcome to the best business management software that makes it so easy you don't even feel like managing.`;

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}
