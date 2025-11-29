import type { Order } from "@/lib/order";
import type { Product } from "@/lib/product";
import { supabase } from "@/lib/supabase";
import Card from "@/ui/components/Card/Card";
import BarChart from "@/ui/components/Charts/components/BarChart/BarChart";
import Decimal from "decimal.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import CashChart from "./components/CashChart/CashChart";
import BalanceChart from "./components/BalanceChart/BalanceChart";

interface Props {
  month: number;
  year: number;
}

interface TopProduct {
  product: Product;
  count: number;
}

export default function Charts({ month, year }: Props) {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  const topProducts = useMemo(() => {
    const products = [] as TopProduct[];

    for (const order of orders) {
      for (const p of order.order_product) {
        const found = products.find((o) => o.product.id === p.product.id);

        if (!found) {
          const count = orders.reduce((a, b) => {
            const inorder = b.order_product.reduce((c, d) => {
              if (d.product.id === p.product.id) {
                return c + d.count;
              }

              return c;
            }, 0);

            return new Decimal(a).plus(inorder).toNumber();
          }, 0);

          products.push({ product: p.product, count: count });
        }
      }
    }

    return products.sort((a, b) => b.count - a.count).slice(0, 5);
  }, [orders]);

  const refetch = useCallback(() => {
    setLoading(true);

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);

    supabase
      .from("order")
      .select(
        `
         *, 
         order_product (
             product_id,
             count,
             price,
             product (
               id,
               name,
               description,
               stock,
               cost_price,
               sell_price,
               created_at,
               active,
               arrive_date,
               expiration_date,
               code
             )
         ),
         order_payment_method (
           method,
           amount
         )
       `
      )
      .gte("sell_date", startDate.toISOString())
      .lt("sell_date", endDate.toISOString())
      .order("sell_date", { ascending: false })
      .then((res) => {
        if (res.data) {
          setOrders(res.data);
        }

        setLoading(false);
      });
  }, [year, month]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <CashChart month={month} orders={orders} year={year} />

      <BalanceChart month={month} orders={orders} year={year} />

      {topProducts.length > 0 && (
        <Card title="Productos más vendidos" className="mb-5">
          <BarChart
            height={500}
            data={topProducts}
            name={(v) => v.product.name}
            bars={[
              {
                fill: "oklch(0.145 0 0)",
                name: "Cantidad de ventas",
                value: (v) => v.count,
              },
            ]}
            loading={loading}
          />
        </Card>
      )}
    </>
  );
}
