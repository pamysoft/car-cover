import type { CartLineUpdateInput } from '@shopify/hydrogen/storefront-api-types';
import type { CartLayout } from '~/components/CartMain';
import { CartForm, Image, type OptimisticCartLine } from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';
import { Link } from '@remix-run/react';
import { ProductPrice } from './ProductPrice';
import type { CartApiQueryFragment } from 'storefrontapi.generated';
import { useDrawer } from './common/Drawer';
import noImageUrl from '~/assets/no_image.svg'
import RemoveIcon from './common/icons/RemoveIcon';
import PlusIcon from './common/icons/PlusIcon';
import { useEffect, useState } from 'react';
import { useServerUrl } from './common/PageWrapper';

type CartLine = OptimisticCartLine<CartApiQueryFragment>;

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
 */
export function CartLineItem({
  layout,
  line,
}: {
  layout: CartLayout;
  line: CartLine;
}) {
  const { id, merchandise } = line;
  const { product, title, image, selectedOptions } = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const { close } = useDrawer();
  const serverUrl = useServerUrl()
  

  const [productImageUrl, setProductImageUrl] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${serverUrl}/api/get_product/${encodeURIComponent(product.id)}`)
      const {product: {
        metafields,
        variants: {
          nodes
        }
      }} = await result.json()
      
      let imageUrl: string = nodes[0].image
      if (!imageUrl) {
        const productTrim = metafields[0]?.value
        const productQuality = metafields[1]?.value
        imageUrl = `https://cdn.shopify.com/s/files/1/0607/7064/8154/files/${productTrim}${productQuality}.jpg`    
      }
      setProductImageUrl(imageUrl)
    }
    fetchData()
  }, [product.id])

  return (
    <tr key={id} className="cv-cart-line">
      <td className='w-[105px] pt-[20px] align-top'>
        <img src={productImageUrl} width={85} height={85} className='rounded-[5px]' />
      </td>
      <td className='hidden'></td>
      <td className='pl-[10px] pt-[20px] align-top'>
        <Link
          prefetch="intent"
          to={lineItemUrl}
          onClick={() => {
            if (layout === 'aside') {
              close();
            }
          }}
        >
          <span className='text-[14px]'>{product.title}</span>
        </Link>
        <div className='text-[13px] text-[#121212BF]'>
          <ProductPrice price={line?.cost?.totalAmount} />
        </div>
        <CartLineQuantity line={line} />
      </td>
      <td className='pl-[10px] pt-[20px] text-right align-top text-[13px] text-[#121212BF]'>
        <ProductPrice price={line?.cost?.totalAmount} />
      </td>
      {/* {image && (
        <Image
          alt={title}
          aspectRatio="1/1"
          data={image}
          height={100}
          loading="lazy"
          width={100}
        />
      )}

      <div>
        <Link
          prefetch="intent"
          to={lineItemUrl}
          onClick={() => {
            if (layout === 'aside') {
              close();
            }
          }}
        >
          <p>
            <strong>{product.title}</strong>
          </p>
        </Link>
        <ProductPrice price={line?.cost?.totalAmount} />
        <ul>
          {selectedOptions.map((option) => (
            <li key={option.name}>
              <small>
                {option.name}: {option.value}
              </small>
            </li>
          ))}
        </ul>
        <CartLineQuantity line={line} />
      </div> */}
    </tr>
  );
}

/**
 * Provides the controls to update the quantity of a line item in the cart.
 * These controls are disabled when the line item is new, and the server
 * hasn't yet responded that it was successfully added to the cart.
 */
function CartLineQuantity({ line }: { line: CartLine }) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const { id: lineId, quantity, isOptimistic } = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="cv-cart-line-quantity mt-[12px] flex items-center gap-[5px]">
      <div className='flex h-[45px] items-center gap-[15px] border-[1px] border-solid border-[#121212]'>
        <CartLineUpdateButton lines={[{ id: lineId, quantity: prevQuantity }]}>
          <button
            aria-label="Decrease quantity"
            disabled={quantity <= 1 || !!isOptimistic}
            name="decrease-quantity"
            value={prevQuantity}
          >
            <span>&#8722; </span>
          </button>
        </CartLineUpdateButton>
        <div className='text-[14px]'>{quantity}</div>
        <CartLineUpdateButton lines={[{ id: lineId, quantity: nextQuantity }]}>
          <button
            aria-label="Increase quantity"
            name="increase-quantity"
            value={nextQuantity}
            disabled={!!isOptimistic}
          >
            <PlusIcon />
          </button>
        </CartLineUpdateButton>
      </div>
      &nbsp;
      <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
    </div>
  );
}

/**
 * A button that removes a line item from the cart. It is disabled
 * when the line item is new, and the server hasn't yet responded
 * that it was successfully added to the cart.
 */
function CartLineRemoveButton({
  lineIds,
  disabled,
}: {
  lineIds: string[];
  disabled: boolean;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{ lineIds }}
    >
      <button disabled={disabled} type="submit">
        <RemoveIcon />
      </button>
    </CartForm>
  );
}

function CartLineUpdateButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{ lines }}
    >
      <div className='flex h-[45px] items-center p-[15px]'>{children}</div>
    </CartForm>
  );
}
