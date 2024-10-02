import { useOptimisticCart } from '@shopify/hydrogen';
import { Link } from '@remix-run/react';
import type { CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
import { CartLineItem } from '~/components/CartLineItem';
import { CartSummary } from './CartSummary';
import { useDrawer } from './carcovers/Drawer';
import LightCloseIcon from './carcovers/icons/LightCloseIcon';
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
  const {close} = useDrawer()

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = cart?.totalQuantity! > 0;

  return (
    <div>
      <div className={'mt-[15px] flex-shrink flex-grow basis-0 border-b-[1px] border-solid border-[#12121214] pb-[20px]'+' '+className}>
        <CartEmpty hidden={linesCount} layout={layout} />
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
        {cartHasItems && <CartSummaryPage cart={cart} layout={layout} />}
      </div>
    </div>
  );
}

function CartEmpty({
  hidden = false,
}: {
  hidden: boolean;
  layout?: CartMainPageProps['layout'];
}) {
  const { close } = useDrawer();
  return (
    <div hidden={hidden}>
      <br />
      <p>
        Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
        started!
      </p>
      <br />
      <Link to="/collections" onClick={close} prefetch="viewport">
        Continue shopping →
      </Link>
    </div>
  );
}
