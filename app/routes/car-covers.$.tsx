import { json, Link, useLoaderData, useLocation, useNavigate } from '@remix-run/react';
import { getPaginationVariables } from '@shopify/hydrogen';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

import { useInView } from "react-intersection-observer";
import { Breadcrumbs } from '~/components/cars/Breadcrumbs';
import { CategoryStaticContent } from '~/components/cars/CategoryStaticContent';
import { FilteredProducts } from '~/components/cars/FilteredProducts';
import { FETCH_PRODUCTS_QUERY } from '~/lib/fragments';
import { fetchData, getSortedProducts, getValidProducts, isArrayOfStrings, stripSlashes } from '~/lib/functions';
import { DisplayLayout } from '~/lib/types';



export async function loader({ request, context }: LoaderFunctionArgs) {
  const pathname = stripSlashes(new URL(request.url).pathname)

  const variables = getPaginationVariables(request, {
    pageBy: 2,
  });


  const pathParts = pathname.split('/').filter(Boolean); // Remove empty strings

  const { storefront } = context

  const proxyUrl = context.env.PROXY_URL;

  const productIds = await fetchShopifyProductsByPath(proxyUrl, pathname);

  const shopifyProductIds = productIds.map(productId => "gid://shopify/Product/" + productId)

  const productsResponse = await storefront.query(FETCH_PRODUCTS_QUERY, {
    variables: {
      ids: shopifyProductIds
    }
  })


  const validProducts = getValidProducts(productsResponse)
  const sortedProducts = getSortedProducts(validProducts)

  return json({ products: sortedProducts, pathname });
}


export default function () {
  const { products, pathname } = useLoaderData();

  const pathParts = pathname.split('/').filter(Boolean); // Remove empty strings

  const { ref, inView, entry } = useInView();
  let layout: DisplayLayout = DisplayLayout.ListProducts

  layout = (pathParts.length > 2) ? DisplayLayout.ListProducts : DisplayLayout.StaticContent;

  return (
    <Breadcrumbs.Provider>
      <Breadcrumbs />
      {/* Decide the layout */}
      {(layout === DisplayLayout.ListProducts) ?
        <FilteredProducts products={products} /> :
        <CategoryStaticContent path={pathname} />}
    </Breadcrumbs.Provider>
  );
}


const fetchShopifyProductsByPath = async (
  proxyUrl: string,
  path: string
): Promise<string[]> => {
  const endpoint = `cars-shopify-products-by-path/${encodeURIComponent(path)}`;
  const result = await fetchData<string[]>(proxyUrl, endpoint);

  return result && isArrayOfStrings(result) ? result : [];
};