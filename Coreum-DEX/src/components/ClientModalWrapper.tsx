"use client";

import { useState } from "react";
import InfoModal from "./InfoModal";

interface ClientModalWrapperProps {
  questionIconSrc: string;
  isMobile: boolean;
}

export default function ClientModalWrapper({
  questionIconSrc,
  isMobile,
}: ClientModalWrapperProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isExampleExpanded, setIsExampleExpanded] = useState(false);

  return (
    <>
      <InfoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        isExampleExpanded={isExampleExpanded}
        setIsExampleExpanded={setIsExampleExpanded}
      />
      <div
        onClick={() => setModalOpen(true)}
        className={`text-white rounded-lg ${
          isMobile ? "p-2" : "p-2 sm:p-4"
        } h-fit border-white/10 border cursor-pointer`}
      >
        <img
          src={questionIconSrc}
          alt="Question Mark"
          className={`${
            isMobile ? "w-4 h-4" : "w-4 h-4 sm:w-6 sm:h-6"
          } bg-white rounded-3xl`}
        />
      </div>
    </>
  );
}
