import { Suspense } from 'react';
import { Await, NavLink } from '@remix-run/react';
import { type CartViewPayload, useAnalytics } from '@shopify/hydrogen';
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
import logoUrl from '~/assets/logo.png';
import HamburgerIcon from '../icons/HamburgerIcon';
import CartIcon from '../icons/CartIcon';
import { PromotionBoxes } from './PromotionBoxes';
import { HeaderInfo } from './HeaderInfo';


interface HeaderProps {
    header: HeaderQuery;
    cart: Promise<CartApiQueryFragment | null>;
    isLoggedIn: Promise<boolean>;
    publicStoreDomain: string;
}

export function Header({
    header,
    isLoggedIn,
    cart,
    publicStoreDomain,
}: HeaderProps) {
    const { shop, menu } = header;

    return <div>
        <div className="container">
            <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
        </div>
        <PromotionBoxes />
        <div className='mb-[30px] hidden items-center bg-[#4e4e4e] lg:block'>
            <DesktopMenu menu={menu} />
        </div>
    </div>;
}

function DesktopMenu({ menu }: {menu: HeaderProps['header']['menu']}) {
    return (
        <div className="flex justify-center">
            <ul className="up flex flex-wrap font-[Oswald] text-[14px] uppercase leading-[55px] tracking-tight text-white">
                {menu?.items.map(item => <li className="mb-0 px-[16px] xl:px-[25px]"><NavLink to={item.url} title={item.title}>{item.title}</NavLink></li>)}
            </ul>
        </div>
    )
}

function HeaderCtas({
    isLoggedIn,
    cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
    return (
        <div>
            <nav className='grid grid-cols-[40px_1fr_40px] items-center justify-between py-[20px] lg:grid-cols-[170px_1fr_50px]' role="navigation">
                <div className='lg:hidden'>
                    <HeaderMenuMobileToggle />
                </div>
                <Logo />
                <div className='hidden lg:block'>
                    <HeaderInfo />
                </div>
                <div className='flex justify-end'>
                    <CartToggle cart={cart} />
                </div>
            </nav>
        </div>
    );
}

function Logo() {
    return (
        <div className='flex justify-center'><img className='w-[150px] lg:w-[170px]' src={logoUrl} /></div>
    )
}

function HeaderMenuMobileToggle() {
    const { open } = useAside();
    return (
        <button
            className=""
            onClick={() => open('mobile')}
        >
            <HamburgerIcon />
        </button>
    );
}

function CartBadge({ count }: { count: number | null }) {
    const { open } = useAside();
    const { publish, shop, cart, prevCart } = useAnalytics();

    return (
        <a
            href="/cart"
            onClick={(e) => {
                e.preventDefault();
                open('cart');
                publish('cart_viewed', {
                    cart,
                    prevCart,
                    shop,
                    url: window.location.href || '',
                } as CartViewPayload);
            }}
            className='relative flex h-[44px] w-[44px] items-center justify-center'
        >
            <CartIcon />
            <div className='absolute bottom-[8px] right-0'><span className="flex h-[17px] w-[17px] items-center justify-center rounded-[50%] bg-primary text-center text-[10px] text-white">{count === null ? <span>&nbsp;</span> : count}</span></div>
        </a>
    );
}

function CartToggle({ cart }: Pick<HeaderProps, 'cart'>) {
    return (
        <Suspense fallback={<CartBadge count={null} />}>
            <Await resolve={cart}>
                {(cart) => {
                    if (!cart) return <CartBadge count={0} />;
                    return <CartBadge count={cart.totalQuantity || 0} />;
                }}
            </Await>
        </Suspense>
    );
}