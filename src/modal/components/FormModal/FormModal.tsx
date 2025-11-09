import Button from "@/ui/components/Button/Button";
import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import { X } from "lucide-react";
import clsx from "clsx";

interface Props {
  onSubmit(): void;
  title: string;
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
  width?: number;
}

export default function FormModal({
  onSubmit,
  children,
  className,
  loading = false,
  title,
}: Props) {
  const { handleClose } = useModal();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit();
  }

  const FORM_CLASS = clsx(
    "flex flex-col",
    "w-full max-h-full",
    "bg-white",
    "px-6 py-5",
    "shadow-lg",
    "overflow-auto",
    "animate-duration-500",
    "h-max",
    "rounded-lg"
  );

  return (
    <Modal className={className}>
      <form
        style={{ maxWidth: "500px" }}
        className={FORM_CLASS}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <header className="flex items-start gap-x-5 mb-6 justify-between">
          <div className="flex items-center gap-x-3">
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>

          <button
            className="stroke-gray-800"
            onClick={handleClose}
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {children}

        <div className="flex items-center gap-x-2.5 justify-end mt-3">
          <Button type="submit" loading={loading}>
            Siguiente
          </Button>

          <Button onClick={handleClose} disabled={loading} variant="outline">
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
