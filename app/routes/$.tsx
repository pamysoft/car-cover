import { json, Link, useLoaderData, useLocation, useNavigate } from '@remix-run/react';
import { getPaginationVariables } from '@shopify/hydrogen';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

import { useInView } from "react-intersection-observer";
import { CategoryStaticContent } from '~/components/carcovers/CategoryStaticContent';
import { FilteredProducts } from '~/components/carcovers/FilteredProducts';
import { ALL_PRODUCTS_QUERY } from '~/lib/fragments';
import { toTitleCase } from '~/lib/functions';

export async function loader({ request, context }: LoaderFunctionArgs) {
  const pathname = new URL(request.url).pathname
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

  return json({ products, theFilter });
}

enum DisplayLayout {
  ListProducts = 0,
  StaticContent = 1
}

export default function () {
  const { products, theFilter } = useLoaderData();
  const { ref, inView, entry } = useInView();
  let layout: DisplayLayout = DisplayLayout.ListProducts

  layout = (theFilter.trim)?DisplayLayout.ListProducts:DisplayLayout.StaticContent;

  return (
    <>
      <Breadcrumbs theFilter={theFilter} />
      {/* Decide the layout */}
      {(layout == DisplayLayout.ListProducts) ? <FilteredProducts theFilter={theFilter} products={products} /> : <CategoryStaticContent theFilter={theFilter} />}
    </>
  );
}


function Breadcrumbs({ theFilter }) {

  return <div className="container font-[Oswald] text-[#666]">
    <ul className="mb-[20px] flex">
      <li className="flex items-center after:mt-[3px] after:inline-block after:font-[icons-blank-theme] after:text-[24px] after:leading-[18px] after:text-[#999] after:content-['\e608']">
        <a href="/" title="Go to Home Page">Car Covers</a>
      </li>
      {theFilter.make &&
        <>
          <li className="flex items-center after:mt-[3px] after:inline-block after:font-[icons-blank-theme] after:text-[24px] after:leading-[18px] after:text-[#999] after:content-['\e608']">
            <a href={'/' + theFilter.make}>{toTitleCase(theFilter.make)}</a>
          </li>
          {theFilter.model &&
            <>
              <li className="flex items-center after:mt-[3px] after:inline-block after:font-[icons-blank-theme] after:text-[24px] after:leading-[18px] after:text-[#999] after:content-['\e608']">
                <a href={'/' + theFilter.make + '/' + theFilter.model}>{toTitleCase(theFilter.model)}</a>
              </li>
              {theFilter.year &&
                <>
                  <li className="flex items-center after:mt-[3px] after:inline-block after:font-[icons-blank-theme] after:text-[24px] after:leading-[18px] after:text-[#999] after:content-['\e608']">
                    <a href={'/' + theFilter.make + '/' + theFilter.model + '/' + theFilter.year}>{toTitleCase(theFilter.year)}</a>
                  </li>
                  {theFilter.year &&
                    <>
                      <li className="flex items-center">
                        <strong>
                          {toTitleCase(theFilter.trim)}
                        </strong>
                      </li>
                    </>
                  }
                </>
              }
            </>
          }
        </>
      }
    </ul>
  </div>
}