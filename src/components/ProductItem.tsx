import type { Product } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <>
      <Card className="m-[20px]">
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{product.description}</CardDescription>
        </CardContent>
        <CardFooter>
          <p>Price: ${product.price}</p>
        </CardFooter>
      </Card>
    </>
  );
}