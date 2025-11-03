import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, TrendingUp } from "lucide-react";
import { DASHBOARD_SECTION } from "../../domain/section";

interface Props {
  section: DASHBOARD_SECTION;
  onChange: (v: DASHBOARD_SECTION) => void;
}

export default function Sections({ onChange, section }: Props) {
  return (
    <Tabs className="mb-4" value={section}>
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger
          value={DASHBOARD_SECTION.PRODUCTS}
          onClick={() => onChange(DASHBOARD_SECTION.PRODUCTS)}
          className="gap-2"
        >
          <Package className="h-4 w-4" />
          Inventario
        </TabsTrigger>

        <TabsTrigger
          value={DASHBOARD_SECTION.SELLS}
          onClick={() => onChange(DASHBOARD_SECTION.SELLS)}
          className="gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          Ventas
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
