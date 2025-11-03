import { NumberTextBuilder } from "@/lib/number-text-builder";
import { PriceTextBuilder } from "@/lib/price-text-builder";
import Button from "@/ui/components/Button/Button";
import Card from "@/ui/components/Card/Card";
import Table from "@/ui/components/Table/Table";
import Modals from "./components/Modals/Modals";
import useModal from "@/modal/hooks/useModal";
import { InsertProductModalProps } from "./domain/modal";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/product";

export default function Products() {
  const { handleOpenModal } = useModal();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const refetch = useCallback(() => {
    setLoading(true);

    supabase
      .from("product")
      .select("*")
      .then((res) => {
        if (res.data) {
          setProducts(res.data);
        }

        setLoading(false);
      });
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <Modals refetch={refetch} />

      <Card
        title="Inventario de Productos"
        description="Control de stock y productos disponibles"
        extra={
          <Button
            onClick={() => handleOpenModal(new InsertProductModalProps())}
          >
            Insertar
          </Button>
        }
      >
        <Table
          loading={loading}
          data={products}
          columns={[
            { cell: ({ row }) => row.name, name: "Nombre" },
            {
              name: "Precio de venta",
              cell: ({ row }) => PriceTextBuilder.build(row.sell_price),
            },
            {
              name: "Precio de costo",
              cell: ({ row }) => PriceTextBuilder.build(row.cost_price),
            },
            {
              name: "Cantidad",
              cell: ({ row }) => NumberTextBuilder.execute(row.stock),
            },
          ]}
        />
      </Card>
    </>
  );
}
