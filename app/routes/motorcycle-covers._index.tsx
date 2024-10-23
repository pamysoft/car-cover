import { json, Link, useLoaderData, useLocation, useNavigate } from '@remix-run/react';
import { getPaginationVariables } from '@shopify/hydrogen';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

import { useInView } from "react-intersection-observer";
import { StaticContentProvider } from '~/components/common/StaticContentProvider';
import { Breadcrumbs } from '~/components/motorcycles/Breadcrumbs';
import { CategoryStaticContent } from '~/components/motorcycles/CategoryStaticContent';
import { stripSlashes } from '~/lib/functions';
import { DisplayLayout } from '~/lib/types';

export async function loader({ request, context }: LoaderFunctionArgs) {
  const pathname = stripSlashes(new URL(request.url).pathname)

  return json({ pathname });
}

export default function () {
  const { pathname } = useLoaderData();

  return (
    <StaticContentProvider>
      <Breadcrumbs.Provider>
        <Breadcrumbs />
        {/* Decide the layout */}
        <CategoryStaticContent path={pathname} />
      </Breadcrumbs.Provider>
    </StaticContentProvider>
  );
}
