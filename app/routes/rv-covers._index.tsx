import { json, Link, useLoaderData, useLocation, useNavigate } from '@remix-run/react';
import { getPaginationVariables } from '@shopify/hydrogen';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

import { useInView } from "react-intersection-observer";
import { Breadcrumbs } from '~/components/cars/Breadcrumbs';
import { CategoryStaticContent } from '~/components/cars/CategoryStaticContent';
import { FilteredProducts } from '~/components/cars/FilteredProducts';
import { RVCoversBreadcrumbs } from '~/components/rvs/RVCoversBreadcrumbs';
import { RVCoversCategoryStaticContent } from '~/components/rvs/RVCoversCategoryStaticContent';
import { RVCoversFilteredProducts } from '~/components/rvs/RVCoversFilteredProducts';
import { FETCH_PRODUCTS_QUERY } from '~/lib/fragments';
import { fetchRvcoverShopifyProductsByPath, fetchShopifyProductsByPath, getSortedProducts, getValidProducts, stripSlashes } from '~/lib/functions';
import { DisplayLayout } from '~/lib/types';


export async function loader({ request, context }: LoaderFunctionArgs) {
  const pathname = stripSlashes(new URL(request.url).pathname)

  const variables = getPaginationVariables(request, {
    pageBy: 2,
  });


  const pathParts = pathname.split('/').filter(Boolean); // Remove empty strings

  const [urlMake, urlModel, urlYear, urlTrim] = pathParts;

  const { storefront } = context

  const proxyUrl = context.env.PROXY_URL;

  const productIds = await fetchRvcoverShopifyProductsByPath(proxyUrl, pathname);

  const shopifyProductIds = productIds.map(productId => "gid://shopify/Product/" + productId)

  const productsResponse = await storefront.query(FETCH_PRODUCTS_QUERY, {
    variables: {
      ids: shopifyProductIds
    }
  })

  const theFilter = { make: urlMake, year: urlYear, model: urlModel, trim: urlTrim }

  const validProducts = getValidProducts(productsResponse)
  const sortedProducts = getSortedProducts(validProducts)

  return json({ products: sortedProducts, theFilter, pathname });
}

export default function () {
  const { products, theFilter, pathname } = useLoaderData();

  const pathParts = pathname.split('/').filter(Boolean); // Remove empty strings

  const { ref, inView, entry } = useInView();
  let layout: DisplayLayout = DisplayLayout.ListProducts

  layout = (pathParts.length > 2) ? DisplayLayout.ListProducts : DisplayLayout.StaticContent;

  return (
      <RVCoversBreadcrumbs.Provider>
        <RVCoversBreadcrumbs />
        {/* Decide the layout */}
        {(layout === DisplayLayout.ListProducts) ? <RVCoversFilteredProducts theFilter={theFilter} products={products} /> : <CategoryStaticContent path={pathname} />}
      </RVCoversBreadcrumbs.Provider>
  );
}
