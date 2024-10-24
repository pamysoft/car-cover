import { Await, Link } from '@remix-run/react';
import { Suspense } from 'react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';

import { CartMain } from '~/components/common/CartMain';

import { AnnouncementBar } from './common/AnnouncementBar';
import { TopBar } from './common/TopBar';
import { Header } from './common/Header';
import { Footer } from './common/Footer';
import { CategoryType, PageWrapper } from './common/PageWrapper';
import { Drawer } from './common/Drawer';
import HamburgerDrawer from './common/HamburgerDrawer';
import { Loading } from './common/Loading';

export interface PageLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  children?: React.ReactNode;
  proxyUrl: string;
  serverUrl: string;
  category: CategoryType
}

export function PageLayout({
  cart,
  children = null,
  header,
  isLoggedIn,
  publicStoreDomain,
  proxyUrl,
  serverUrl,
  category
}: PageLayoutProps) {
  return (
    <PageWrapper.Provider data={{ "breadcrumbs": [], "proxyUrl": proxyUrl, "serverUrl": serverUrl, category: category }}>
        <Drawer.Provider>
          
            <CartDrawer cart={cart} />
            <HamburgerDrawer header={header} isLoggedIn={isLoggedIn} />

            <AnnouncementBar />
            <TopBar />

            {header && (
              <Header
                header={header}
                cart={cart}
                isLoggedIn={isLoggedIn}
                publicStoreDomain={publicStoreDomain}
              />
            )}

              <main className='m-0 p-0'>{children}</main>
            
            <Footer />

        </Drawer.Provider>
    </PageWrapper.Provider>
  );
}

function CartDrawer({ cart }: { cart: PageLayoutProps['cart'] }) {
  return (
    <Drawer type="cart">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Drawer>
  );
}

