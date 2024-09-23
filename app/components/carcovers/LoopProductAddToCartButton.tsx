import { AddToCartButton } from "../AddToCartButton";


export default function LoopProductAddToCartButton({product}) {
  console.log('product', product)
  const variantId = product.variants.nodes[0].id;

  if (!variantId) {
    return null;
  }

  return <AddToCartButton variantId={variantId}>Add to cart</AddToCartButton>;
}