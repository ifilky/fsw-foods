"use client"

import DiscountBadge from "@/app/_components/discount-badge";
import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import Image from "next/image";

interface ProductDetailProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: true;
        };
    }>;
}

const ProductDetails = ({ product }: ProductDetailProps) => {
  return (
    <div className="p-5">
      <div className="flex items-center gap-[0.375rem]">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      <h1 className="mb-3 mt-1 text-xl font-semibold">{product.name}</h1>

      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>

          {product.discountPercentage > 0 && (
            <p className=" text-sm text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
