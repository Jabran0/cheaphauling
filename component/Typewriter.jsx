"use client";
import { useState, useEffect } from "react";

const Typewriter = ({ texts, speed = 100, delay = 2000 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0); // character index
  const [deleting, setDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0); // current text index

  const currentText = texts[textIndex];
  const firstLetter = currentText.charAt(0);
  const remainingText = currentText.slice(1);

  useEffect(() => {
    let timeout;

    if (!deleting && index < remainingText.length) {
      // typing letters
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + remainingText.charAt(index));
        setIndex((prev) => prev + 1);
      }, speed);
    } else if (deleting && index > 0) {
      // deleting letters
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
      }, speed / 2);
    } else if (index === remainingText.length) {
      // wait before deleting
      timeout = setTimeout(() => setDeleting(true), delay);
    } else if (deleting && index === 0) {
      // move to next text
      setDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [index, deleting, remainingText, speed, delay, texts.length]);

  return (
    <h1 className=" text-2xl md:text-5xl font-bold text-primary flex items-center">
      {/* static first letter */}
      <span>{firstLetter}</span>
      {/* animated part */}
      <span>{displayedText}</span>
      {/* cursor image */}
      {/* ager opacity img add karna hay tu animate-pulse */}
      <img
        src="/image/headingImg.webp"
        alt="cursor"
        className="w-15 h-8 ml-1 "
      />
    </h1>
  );
};

export default Typewriter;
