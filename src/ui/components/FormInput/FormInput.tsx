import { Field, FieldLabel } from "@/components/ui/field";

interface Props {
  label: string;
  children?: React.ReactNode;
}

export default function FormInput({ label, children }: Props) {
  return (
    <Field className="mb-5">
      <FieldLabel className="font-medium!">{label}</FieldLabel>

      {children}
    </Field>
  );
}
