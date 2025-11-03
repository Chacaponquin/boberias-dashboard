import { supabase } from "@/lib/supabase";
import FormModal from "@/modal/components/FormModal/FormModal";
import useModal from "@/modal/hooks/useModal";
import DatePicker from "@/ui/components/DatePicker/DatePicker";
import FormInput from "@/ui/components/FormInput/FormInput";
import Input from "@/ui/components/Input/Input";
import InputNumber from "@/ui/components/InputNumber/InputNumber";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  refetch: () => void;
}

export default function InsertProduct({ refetch }: Props) {
  const { handleClose } = useModal();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [costPrice, setCostPrice] = useState(1);
  const [sellPrice, setSellPrice] = useState(1);
  const [arriveDate, setArriveDate] = useState(new Date());
  const [stock, setStock] = useState(1);

  const handleSubmit = () => {
    setLoading(true);

    const defaultError = () => {
      toast.error("Hubo un error al insertar el producto");

      setLoading(false);
    };

    supabase
      .from("product")
      .select("id")
      .order("id", { ascending: false })
      .limit(1)
      .then((res) => {
        if (res.error === null) {
          const count =
            res.data.length > 0 ? res.data[res.data.length - 1].id + 1 : 1;

          const code = `RM-${count}`;

          supabase
            .from("product")
            .insert([
              {
                cost_price: costPrice,
                sell_price: sellPrice,
                name: name,
                stock: stock,
                description: "",
                code: code,
                active: true,
              },
            ])
            .then((res) => {
              if (res.error) {
                defaultError();
              } else {
                toast.success("Producto insertado exitosamente");

                setLoading(false);

                refetch();

                handleClose();
              }
            });
        } else {
          defaultError();
        }
      });
  };

  return (
    <FormModal
      onSubmit={handleSubmit}
      title="Insertar producto"
      loading={loading}
    >
      <FormInput label="Nombre">
        <Input value={{ onChange: setName, value: name }} />
      </FormInput>

      <FormInput label="Cantidad">
        <InputNumber min={1} value={{ value: stock, onChange: setStock }} />
      </FormInput>

      <FormInput label="Precio de costo">
        <InputNumber value={{ value: costPrice, onChange: setCostPrice }} />
      </FormInput>

      <FormInput label="Precio de venta">
        <InputNumber value={{ onChange: setSellPrice, value: sellPrice }} />
      </FormInput>

      <FormInput label="Fecha de arribo">
        <DatePicker value={{ onChange: setArriveDate, value: arriveDate }} />
      </FormInput>
    </FormModal>
  );
}
