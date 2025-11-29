import type { Order } from "@/lib/order";
import Card from "@/ui/components/Card/Card";
import LinealChart from "@/ui/components/Charts/components/LinealChart/LinealChart";
import { useMemo, useState } from "react";
import {
  filterOrdersByDate,
  filterOrdersByWeek,
  getDayNumbers,
  getWeeksFromMonth,
} from "../../domain/helpers";
import { WeekAmountData, type DayAmountData } from "../../domain/chart";
import Decimal from "decimal.js";
import { PriceTextBuilder } from "@/lib/price-text-builder";
import { PAYMENT_METHOD } from "@/lib/payment-method";
import { MONTH_DATA_SECTION } from "../../domain/month-data-section";
import MonthSections from "../../shared/components/MonthSections/MonthSections";

interface Props {
  orders: Order[];
  year: number;
  month: number;
}

export default function CashChart({ month, orders, year }: Props) {
  const [section, setSection] = useState(MONTH_DATA_SECTION.DAY);

  const transferAmount = useMemo(() => {
    const result = [] as DayAmountData[];

    const days = getDayNumbers(year, month);

    for (const day of days) {
      let sum = 0;

      const filtered = filterOrdersByDate(orders, year, month, day);

      for (const o of filtered) {
        const amount = o.order_payment_method
          .filter((o) => o.method === PAYMENT_METHOD.TRANSFER)
          .reduce((a, b) => new Decimal(b.amount).plus(a).toNumber(), 0);

        sum = new Decimal(amount).plus(sum).toNumber();
      }

      result.push({ day: day, amount: sum });
    }

    return result;
  }, [orders, year, month]);

  const transferWeek = useMemo(() => {
    const result = [] as WeekAmountData[];

    const weeks = getWeeksFromMonth(year, month);

    for (const w of weeks) {
      let sum = 0;

      const filtered = filterOrdersByWeek(orders, w);

      for (const o of filtered) {
        const amount = o.order_payment_method
          .filter((o) => o.method === PAYMENT_METHOD.TRANSFER)
          .reduce((a, b) => new Decimal(b.amount).plus(a).toNumber(), 0);

        sum = new Decimal(amount).plus(sum).toNumber();
      }

      result.push(new WeekAmountData(w, sum));
    }

    return result;
  }, [orders, year, month]);

  const cashAmount = useMemo(() => {
    const result = [] as DayAmountData[];

    const days = getDayNumbers(year, month);

    for (const day of days) {
      let sum = 0;

      const filtered = filterOrdersByDate(orders, year, month, day);

      for (const o of filtered) {
        const amount = o.order_payment_method
          .filter((o) => o.method === PAYMENT_METHOD.CASH)
          .reduce((a, b) => new Decimal(b.amount).plus(a).toNumber(), 0);

        sum = new Decimal(amount).plus(sum).toNumber();
      }

      result.push({ day: day, amount: sum });
    }

    return result;
  }, [orders, year, month]);

  const cashWeek = useMemo(() => {
    const result = [] as WeekAmountData[];

    const weeks = getWeeksFromMonth(year, month);

    for (const w of weeks) {
      let sum = 0;

      const filtered = filterOrdersByWeek(orders, w);

      for (const o of filtered) {
        const amount = o.order_payment_method
          .filter((o) => o.method === PAYMENT_METHOD.CASH)
          .reduce((a, b) => new Decimal(b.amount).plus(a).toNumber(), 0);

        sum = new Decimal(amount).plus(sum).toNumber();
      }

      result.push(new WeekAmountData(w, sum));
    }

    return result;
  }, [orders, year, month]);

  return (
    <Card
      className="mb-5"
      title="Ingresos de efectivo en el mes"
      extra={<MonthSections onChange={setSection} section={section} />}
    >
      {section === MONTH_DATA_SECTION.DAY && (
        <LinealChart
          data={[
            {
              label: "Ingresos de efectivo",
              color: "oklch(0.145 0 0)",
              data: cashAmount.map((o) => {
                return { unit: o.day.toString(), value: o.amount };
              }),
            },
            {
              label: "Ingresos de transferencias",
              color: "var(--color-blue-500)",
              data: transferAmount.map((o) => {
                return { unit: o.day.toString(), value: o.amount };
              }),
            },
          ]}
          height={500}
          y={{ formatter: (v) => PriceTextBuilder.build(v) }}
        />
      )}

      {section === MONTH_DATA_SECTION.WEEK && (
        <LinealChart
          data={[
            {
              label: "Ingresos de efectivo",
              color: "oklch(0.145 0 0)",
              data: cashWeek.map((o) => {
                return { unit: o.label, value: o.amount };
              }),
            },
            {
              label: "Ingresos de trasnferencias",
              color: "var(--color-blue-500)",
              data: transferWeek.map((o) => {
                return { unit: o.label, value: o.amount };
              }),
            },
          ]}
          height={500}
          y={{ formatter: (v) => PriceTextBuilder.build(v) }}
        />
      )}
    </Card>
  );
}
