import { AddToCartButton } from "./AddToCartButton";
import { useDrawer } from "./Drawer";


export default function LoopProductAddToCartButton({product}) {
  const { open } = useDrawer();
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