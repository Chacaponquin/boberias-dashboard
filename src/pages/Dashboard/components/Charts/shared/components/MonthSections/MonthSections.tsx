import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MONTH_DATA_SECTION } from "../../../domain/month-data-section";

interface Props {
  section: MONTH_DATA_SECTION;
  onChange: (v: MONTH_DATA_SECTION) => void;
}

export default function MonthSections({ onChange, section }: Props) {
  return (
    <Tabs value={section}>
      <TabsList className="">
        <TabsTrigger
          onClick={() => onChange(MONTH_DATA_SECTION.DAY)}
          value={MONTH_DATA_SECTION.DAY}
        >
          Días
        </TabsTrigger>

        <TabsTrigger
          onClick={() => onChange(MONTH_DATA_SECTION.WEEK)}
          value={MONTH_DATA_SECTION.WEEK}
        >
          Semanas
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
