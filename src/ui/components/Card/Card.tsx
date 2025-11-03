import {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Card as LibCard,
} from "@/components/ui/card";

interface Props {
  title: string;
  description?: string;
  children?: React.ReactNode;
  extra?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
}

export default function Card({
  title,
  children,
  description,
  extra,
  footer,
  width,
}: Props) {
  return (
    <LibCard
      className="w-full"
      style={{ maxWidth: width ? `${width}px` : undefined }}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>

        {description && <CardDescription>{description}</CardDescription>}

        {extra && <CardAction>{extra}</CardAction>}
      </CardHeader>

      <CardContent>{children}</CardContent>

      {footer && (
        <CardFooter className="flex w-full justify-end items-center gap-2">
          {footer}
        </CardFooter>
      )}
    </LibCard>
  );
}
