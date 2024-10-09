import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import { SearchBox } from '~/components/carcovers/SearchBox';
import { Slideshow } from '~/components/carcovers/Slideshow';
import { FeaturedCollection } from '~/components/carcovers/FeaturedCollection';
import { HeroSection } from '~/components/carcovers/HeroSection';
import { ValueProposition } from '~/components/carcovers/ValuePropostion';
import { CarCoverTypes } from '~/components/carcovers/CarCoverTypes';
import { CarCoverComparison } from '~/components/carcovers/CarCoverComparison';
import { FEATURED_COLLECTION_QUERY, RECOMMENDED_PRODUCTS_QUERY } from '~/lib/fragments';
import { CategoryStaticContent } from '~/components/carcovers/CategoryStaticContent';
import { Breadcrumbs } from '~/components/carcovers/Breadcrumbs';

export const meta: MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <Breadcrumbs.Provider>
    <div className="home pb-[60px]">
        <div className='container mt-[20px] lg:mt-0'>
          <div className='md:gap-0 ml:flex'>
            <SearchBox className="ml:w-1/4" />
            <Slideshow className="mt-[30px] ml:mt-0 ml:w-3/4 ml:pl-[15px]" />
          </div>
        </div>
        <CategoryStaticContent />
    </div>
    </Breadcrumbs.Provider>
  );
}