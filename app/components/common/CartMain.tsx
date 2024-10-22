import { useOptimisticCart } from '@shopify/hydrogen';
import { Link } from '@remix-run/react';
import type { CartApiQueryFragment } from 'storefrontapi.generated';
import { CartLineItem } from './CartLineItem';
import { CartSummary } from './CartSummary';
import { useDrawer } from './Drawer';
import LightCloseIcon from './icons/LightCloseIcon';

export type CartLayout = 'page' | 'aside';

export type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: CartLayout;
};

/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 */
export function CartMain({ layout, cart: originalCart }: CartMainProps) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);

  console.log('cart:',cart)

  const { close } = useDrawer()

  
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = cart?.totalQuantity! > 0;

  console.log(cart?.totalQuantity)

  return (
    <div className='flex h-full flex-col px-[15px]'>
      <div className='flex items-center justify-between py-[15px]'>
        <h2 className='text-[20px]'>{cartHasItems && 'Your cart'}</h2>
        <button onClick={close}><LightCloseIcon width='20' height='20' /></button>
      </div>

      {!cartHasItems && <CartEmpty layout={layout} />}
      {cartHasItems &&
        (<>
          <div className={'mt-[15px] flex-shrink flex-grow basis-0 border-b-[1px] border-solid border-[#12121214] pb-[20px]' + ' ' + className}>
            <table className="cv-cart-details w-full">
              <thead>
                <tr>
                  <th className='border-b-[1px] border-solid border-[#12121214] pb-[15px] text-left text-[10px] font-normal uppercase text-[#121212BF]' colSpan={2}>Product</th>
                  <th className='border-b-[1px] border-solid border-[#12121214] pb-[15px] text-right text-[10px] font-normal uppercase text-[#121212BF]'>Total</th>
                </tr>
              </thead>
              <tbody>
                {(cart?.lines?.nodes ?? []).map((line) => (
                  <CartLineItem key={line.id} line={line} layout={layout} />
                ))}
              </tbody>
            </table>
          </div>

          <div className='mt-[20px] pt-[10px]'>
            {cartHasItems && <CartSummary cart={cart} layout={layout} />}
          </div>
        </>)
      }
    </div>
  );
}

function CartEmpty({
  hidden = false,
}: {
  hidden: boolean;
  layout?: CartMainProps['layout'];
}) {
  const { close } = useDrawer();
  return (
    <div hidden={hidden} className='flex h-full flex-col items-center justify-center pb-[50px]'>
      <div className='text-center font-heading text-[24px]'>
        Your cart is empty
      </div>
      <br />
      <div className='mt-[8px] text-center'>
        <Link className='flex h-[45px] w-[193px] max-w-full items-center justify-center bg-primary font-heading text-white hover:no-underline' to="/" onClick={close} prefetch="viewport">
          <span>Continue shopping</span>
        </Link>
      </div>
    </div>
  );
}
