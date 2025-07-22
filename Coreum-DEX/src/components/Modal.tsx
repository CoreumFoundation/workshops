import { Cross1Icon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { FC, useCallback, useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title: string | React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  wrapperClassName,
  headerClassName,
  bodyClassName,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToTop();
    }
  }, [isOpen, scrollToTop]);

  const handleCloseModal = useCallback(() => {
    onClose?.();
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={scrollContainerRef}
      className={classNames(
        "flex flex-col items-center p-1 sm:p-10 md:p-20 w-full h-screen max-w-full absolute left-0 right-0 top-0 bottom-0 bg-[#1e1a78]/75 backdrop-blur-[2px] z-50 items-center justify-center",
        className
      )}
    >
      <div
        className={classNames(
          "flex flex-col w-[640px] max-w-full max-h-full overflow-y-auto p-8 bg-indigo-900/70 border-primary/60 border rounded-2xl backdrop-blur-sm gap-8",
          wrapperClassName
        )}
      >
        <div
          className={classNames(
            "flex justify-between w-full text-lg font-space-grotesk text-white font-medium cursor-pointer",
            headerClassName
          )}
        >
          {title}
          {onClose && (
            <div
              className="flex flex-col items-center justify-center !cursor-pointer text-white"
              onClick={handleCloseModal}
            >
              <Cross1Icon className="w-4 h-4" color="#F79D84" />
            </div>
          )}
        </div>
        <div className={classNames("flex flex-col w-full", bodyClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
};
