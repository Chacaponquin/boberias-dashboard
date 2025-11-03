import Button from "@/ui/components/Button/Button";
import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import Card from "@/ui/components/Card/Card";
import IconButton from "@/ui/components/IconButton/IconButton";
import { X } from "lucide-react";

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

  return (
    <Modal className={className}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full items-center flex flex-col"
      >
        <Card
          width={500}
          title={title}
          extra={
            <>
              <IconButton onClick={handleClose} icon={<X />} />
            </>
          }
          footer={
            <>
              <Button type="submit" loading={loading}>
                Siguiente
              </Button>

              <Button
                onClick={handleClose}
                disabled={loading}
                variant="outline"
              >
                Cancelar
              </Button>
            </>
          }
        >
          {children}
        </Card>
      </form>
    </Modal>
  );
}
