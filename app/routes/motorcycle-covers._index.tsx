import { json, Link, useLoaderData, useLocation, useNavigate } from '@remix-run/react';
import { getPaginationVariables } from '@shopify/hydrogen';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

import { useInView } from "react-intersection-observer";
import { Breadcrumbs } from '~/components/motocycles/Breadcrumbs';
import { CategoryStaticContent } from '~/components/motocycles/CategoryStaticContent';
import { FilteredProducts } from '~/components/motocycles/FilteredProducts';
import { FETCH_PRODUCTS_QUERY } from '~/lib/fragments';
import { fetchShopifyProductsByPath, getSortedProducts, getValidProducts, stripSlashes } from '~/lib/functions';
import { DisplayLayout } from '~/lib/types';

export async function loader({ request, context }: LoaderFunctionArgs) {
  const pathname = stripSlashes(new URL(request.url).pathname)

  const pathParts = pathname.split('/').filter(Boolean); // Remove empty strings

  const [urlMake, urlModel, urlYear, urlTrim] = pathParts;

  const { storefront } = context

  const proxyUrl = context.env.PROXY_URL;

  const productIds = await fetchShopifyProductsByPath(proxyUrl, pathname);

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
    <Breadcrumbs.Provider>
      <Breadcrumbs />
      {/* Decide the layout */}
      {(layout === DisplayLayout.ListProducts) ?
        <FilteredProducts theFilter={theFilter} products={products} /> :
        <CategoryStaticContent path={pathname} />}
    </Breadcrumbs.Provider>
  );
}
