import { db } from "../_lib/prisma";
import ProductItem from "./product-item";

const ProductList = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0, // vai trazer os produtos que tem um discountPercentage maior que zero do banco
      },
    },
    take: 10, // pega apenas 10 produtos
    include: {
        restaurant: {
            select: {
                name: true,
            }
        }
    }
  });

  return (
    <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-4 px-5">
      {products.map((item) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </div>
  );
};

export default ProductList;
