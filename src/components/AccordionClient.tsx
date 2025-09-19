"use client";
import { useState, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({
  title,
  children,
  defaultOpen = true,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      ref={wrapperRef}
      className="last:border-0 border-b border-dashed border-[#EAEAEA] overflow-hidden pb-3"
    >
      {/* Header */}
      <button
        type="button"
        onClick={handleToggle}
        className="w-full flex justify-between items-center text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="font-bold">{title}</span>

        <span className="text-neutral-400">
          <Image
            src="/MM_UI_chevron_150dpi.png"
            alt={isOpen ? "Arrow up" : "Arrow down"}
            width={24}
            height={24}
            className={`transform transition-transform duration-300 ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </span>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
            onAnimationComplete={() => {
              if (wrapperRef.current) {
                wrapperRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
