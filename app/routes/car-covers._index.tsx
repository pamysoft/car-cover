import { json, Link, useLoaderData, useLocation, useNavigate } from '@remix-run/react';
import { getPaginationVariables } from '@shopify/hydrogen';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

import { useInView } from "react-intersection-observer";
import { Breadcrumbs } from '~/components/cars/Breadcrumbs';
import { CategoryStaticContent } from '~/components/cars/CategoryStaticContent';
import { FilteredProducts } from '~/components/cars/FilteredProducts';
import { FETCH_PRODUCTS_QUERY } from '~/lib/fragments';
import { fetchShopifyProductsByPath, getSortedProducts, getValidProducts, stripSlashes } from '~/lib/functions';
import { DisplayLayout } from '~/lib/types';



export async function loader({ request, context }: LoaderFunctionArgs) {
  const pathname = stripSlashes(new URL(request.url).pathname)

  return json({ pathname });
}





export default function () {
  const { pathname } = useLoaderData();

  const pathParts = pathname.split('/').filter(Boolean); // Remove empty strings

  const { ref, inView, entry } = useInView();
  let layout: DisplayLayout = DisplayLayout.ListProducts

  layout = (pathParts.length > 2) ? DisplayLayout.ListProducts : DisplayLayout.StaticContent;

  return (
    <Breadcrumbs.Provider>
      <Breadcrumbs />
      {/* Decide the layout */}
      <CategoryStaticContent path={pathname} />
    </Breadcrumbs.Provider>
  );
}
