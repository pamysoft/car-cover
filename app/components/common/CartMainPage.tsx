import { useOptimisticCart } from '@shopify/hydrogen';
import { Link } from '@remix-run/react';
import type { CartApiQueryFragment } from 'storefrontapi.generated';
import { useDrawer } from './Drawer';
import { CartSummaryPage } from './CartSummaryPage';
import { CartLineItemPage } from './CartLineItemPage';

export type CartLayout = 'page' | 'aside';

export type CartMainPageProps = {
  cart: CartApiQueryFragment | null;
  layout: CartLayout;
};

/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 */
export function CartMainPage({ layout, cart: originalCart }: CartMainPageProps) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);
  const { close } = useDrawer()

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = cart?.totalQuantity! > 0;

  return (
    <div>
      {cartHasItems &&
        <div className='my-[30px] flex flex-wrap items-baseline justify-between'>
          <h1 className='text-[30px] md:text-[40px]'>Your Cart</h1>
          <button className='text-[15px] underline'>Continue shopping</button>
        </div>
      }
      {!cartHasItems && <CartEmpty layout={layout} />}
      {cartHasItems &&
        <div className='pb-[50px]'>
          <div className={'mt-[15px] flex-shrink flex-grow basis-0 border-b-[1px] border-solid border-[#12121214] pb-[20px]' + ' ' + className}>
            <table className="cv-cart-details w-full">
              <thead>
                <tr>
                  <th className='border-b-[1px] border-solid border-[#12121214] pb-[15px] text-left text-[10px] font-normal uppercase text-[#121212BF]' colSpan={2}>Product</th>
                  <th className='hidden border-b-[1px] border-solid border-[#12121214] pb-[15px] text-left text-[10px] font-normal uppercase text-[#121212BF] md:table-cell'>Quantity</th>
                  <th className='border-b-[1px] border-solid border-[#12121214] pb-[15px] text-right text-[10px] font-normal uppercase text-[#121212BF]'>Total</th>
                </tr>
              </thead>
              <tbody>
                {(cart?.lines?.nodes ?? []).map((line) => (
                  <CartLineItemPage key={line.id} line={line} layout={layout} />
                ))}
              </tbody>
            </table>
          </div>

          <div className='mt-[20px] flex justify-center pt-[10px] md:justify-end'>
            <CartSummaryPage cart={cart} layout={layout} />
          </div>
        </div>
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
    <div hidden={hidden} className='flex h-full flex-col items-center justify-center pb-[80px] pt-[40px]'>
      <div className='text-center font-heading text-[30px] md:text-[40px]'>
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