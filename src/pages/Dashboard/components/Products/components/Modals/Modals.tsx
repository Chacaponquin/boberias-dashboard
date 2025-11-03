import useModal from "@/modal/hooks/useModal";
import { InsertProductModalProps } from "../../domain/modal";
import InsertProduct from "./components/InsertProduct/InsertProduct";

interface Props {
  refetch: () => void;
}

export default function Modals({ refetch }: Props) {
  const { open } = useModal();

  return (
    <>
      {open instanceof InsertProductModalProps && (
        <InsertProduct refetch={refetch} />
      )}
    </>
  );
}
