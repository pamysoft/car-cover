import { AddToCartButton } from "../AddToCartButton";
import { useAside } from "../Aside";


export default function LoopProductAddToCartButton({product}) {
  const {open} = useAside();
  const selectedVariant = product.variants.nodes[0];

  return <AddToCartButton 
  onClick={() => {
    open('cart');
  }}
  lines={
    selectedVariant
      ? [
          {
            merchandiseId: selectedVariant.id,
            quantity: 1,
            selectedVariant,
          },
        ]
      : []
  }
  >
    <span>Add to cart</span>
  </AddToCartButton>;
}