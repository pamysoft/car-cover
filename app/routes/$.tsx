import { json, Link, useLoaderData, useLocation, useNavigate } from '@remix-run/react';
import { getPaginationVariables } from '@shopify/hydrogen';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

import { useInView } from "react-intersection-observer";
import { Breadcrumbs } from '~/components/carcovers/Breadcrumbs';
import { CategoryStaticContent } from '~/components/carcovers/CategoryStaticContent';
import { FilteredProducts } from '~/components/carcovers/FilteredProducts';
import { ALL_PRODUCTS_QUERY } from '~/lib/fragments';
import { removeSlashes } from '~/lib/functions';



export async function loader({ request, context }: LoaderFunctionArgs) {
  const pathname = removeSlashes(new URL(request.url).pathname)
  
  const variables = getPaginationVariables(request, {
    pageBy: 2,
  });

  
  const pathParts = pathname.split('/').filter(Boolean); // Remove empty strings

  const [urlMake, urlModel, urlYear, urlTrim] = pathParts;

  const { storefront } = context
  const { products } = await storefront.query(ALL_PRODUCTS_QUERY, {
    variables
  })

  const theFilter = { make: urlMake, year: urlYear, model: urlModel, trim: urlTrim }

  return json({ products, theFilter, pathname });
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
      {(layout == DisplayLayout.ListProducts) ? <FilteredProducts theFilter={theFilter} products={products} /> : <CategoryStaticContent path={pathname} />}
    </>
  );
}
