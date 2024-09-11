import { json, Link, useLoaderData, useLocation, useNavigate } from '@remix-run/react';
import { getPaginationVariables, Pagination } from '@shopify/hydrogen';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useEffect } from 'react';
import { useInView } from "react-intersection-observer";


const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment ProductCard on Product {
    id
    title
  }
`;

const QUERY_PRODUCTS = `#graphql
  query FilteredProducts(
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;


const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts(
      $first: Int
      $last: Int
      $startCursor: String
      $endCursor: String
    ) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  fragment ProductCard on Product {
    id
    title
    variants(first: 1) {
      nodes {
        id
        image {
          url
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        product {
          handle
          title
        }
      }
    }
  }
`;


export async function loader({ request, context }: LoaderFunctionArgs) {
  const pathname = new URL(request.url).pathname
  const variables = getPaginationVariables(request, {
    pageBy: 2,
  });
  console.log('variables')
  console.log(variables)

  const pathParts = pathname.split('/').filter(Boolean); // Remove empty strings
  if (pathParts.length === 4) {
    const [urlMake, urlModel, urlYear, urlTrim] = pathParts;

    const { storefront } = context
    const { products } = await storefront.query(ALL_PRODUCTS_QUERY, {
      variables
    })

    const theFilter =  {make: urlMake, year: urlYear, model: urlModel, trim: urlTrim}

    return json({products, theFilter});
  } else {
    throw new Response(`${new URL(request.url).pathname} not found`, {
      status: 404,
    });
  }
}

export default function () {
  const { products, theFilter } = useLoaderData();
  const { ref, inView, entry } = useInView();
  

  return (
    <div className="container">
      <div>
        <h2 className='mb-5'>Filter:</h2>
        <div>Year: {theFilter.year}</div>
        <div>Make: {theFilter.make}</div>
        <div>Model: {theFilter.model}</div>
        <div>Trim: {theFilter.trim}</div>
      </div>
      <h1 className='mb-5 mt-10'>Results:</h1>
      <Pagination connection={products}>
        {({ nodes, isLoading, PreviousLink, NextLink, hasNextPage, nextPageUrl, state }) => (
          <>
            <ProductsLoadedOnScroll
              nodes={nodes}
              inView={inView}
              hasNextPage={hasNextPage}
              nextPageUrl={nextPageUrl}
              state={state}
            />

            <div className='mt-5'>
              <PreviousLink>
                {isLoading ? "Loading..." : "Load previous products"}
              </PreviousLink>
              <NextLink ref={ref}>Load more</NextLink>
            </div>
          </>
        )}
      </Pagination>
    </div>
  );
}
function ProductsLoadedOnScroll({ nodes, inView, hasNextPage, nextPageUrl, state }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (inView && hasNextPage) {
      navigate(nextPageUrl, {
        replace: true,
        preventScrollReset: true,
        state,
      });
    }
  }, [inView, navigate, state, nextPageUrl, hasNextPage]);

  return nodes.map((product) => (
    <div className='mb-5'>
      <Link key={product.id} to={product.id}>
        <div className='flex border-b-2'>
          <div className='mr-10'><img src={product.variants.nodes[0].image?.url} width={100} /></div>
          <div>{product.title}</div>
        </div>
      </Link>
    </div>
  ));
}