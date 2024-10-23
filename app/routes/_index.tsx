import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction } from '@remix-run/react';

import { CategoryStaticContent } from '~/components/cars/CategoryStaticContent';
import { Breadcrumbs } from '~/components/cars/Breadcrumbs';
import { StaticContentProvider } from '~/components/common/StaticContentProvider';
import { Suspense } from 'react';
import { Loading } from '~/components/common/Loading';

export const meta: MetaFunction = () => {
  return [{ title: 'Car Covers | Home' }];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({ ...deferredData, ...criticalData });
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({ context }: LoaderFunctionArgs) {
  return {}
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: LoaderFunctionArgs) {
  return {
  };
}

export default function Homepage() {
  // const data = useLoaderData<typeof loader>();
  return (
      <StaticContentProvider>
        <Breadcrumbs.Provider>
          <CategoryStaticContent />
        </Breadcrumbs.Provider>
      </StaticContentProvider>
  );
}