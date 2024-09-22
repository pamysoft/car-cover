import { json, Link, useLoaderData, useLocation, useNavigate } from '@remix-run/react';
import { getPaginationVariables } from '@shopify/hydrogen';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

import { useInView } from "react-intersection-observer";
import { Breadcrumbs } from '~/components/carcovers/Breadcrumbs';
import { CategoryStaticContent } from '~/components/carcovers/CategoryStaticContent';
import { FilteredProducts } from '~/components/carcovers/FilteredProducts';
import { useProxyUrl } from '~/components/carcovers/PageWrapper';
import { ALL_PRODUCTS_QUERY, FETCH_PRODUCTS_QUERY } from '~/lib/fragments';
import { fetchShopifyProductsByPath, removeSlashes } from '~/lib/functions';



export async function loader({ request, context }: LoaderFunctionArgs) {
  const pathname = removeSlashes(new URL(request.url).pathname)
  
  const variables = getPaginationVariables(request, {
    pageBy: 2,
  });

  
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

  return json({ products: productsResponse['nodes'], theFilter, pathname });
}

enum DisplayLayout {
  ListProducts = 0,
  StaticContent = 1
}

export default function () {
  const { products, theFilter, pathname } = useLoaderData();
  
  const pathParts = pathname.split('/').filter(Boolean); // Remove empty strings

  const { ref, inView, entry } = useInView();
  let layout: DisplayLayout = DisplayLayout.ListProducts

  layout = (pathParts.length>2)?DisplayLayout.ListProducts:DisplayLayout.StaticContent;

  return (
    <>
      <Breadcrumbs path={pathname} />
      {/* Decide the layout */}
      {(layout === DisplayLayout.ListProducts) ? <FilteredProducts theFilter={theFilter} products={products} /> : <CategoryStaticContent path={pathname} />}
    </>
  );
}
