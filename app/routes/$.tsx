import { json, Link, useLoaderData, useLocation, useNavigate } from '@remix-run/react';
import { getPaginationVariables } from '@shopify/hydrogen';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

import { useInView } from "react-intersection-observer";
import { Breadcrumbs } from '~/components/carcovers/Breadcrumbs';
import { CategoryStaticContent } from '~/components/carcovers/CategoryStaticContent';
import { FilteredProducts } from '~/components/carcovers/FilteredProducts';
import { FETCH_PRODUCTS_QUERY } from '~/lib/fragments';
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

  const validProducts = getValidProducts(productsResponse)
  const sortedProducts = getSortedProducts(validProducts)

  return json({ products: sortedProducts, theFilter, pathname });
}

function getValidProducts(productsResponse)
{
  const products = productsResponse['nodes'];
  const validProducts = []
  for (const product  of products) {
    if (product ) {
      const productSku = product.variants.nodes[0].sku
      product.sku = productSku
      product.tagline = getProductTagLine(productSku)
      validProducts.push(product)
    }
  }
  return validProducts
}

function getProductTagLine(productSku) {
  let productTagline = '';  // Default value for tagline

  // Check the start of the SKU and assign appropriate tagline
  if (productSku.startsWith('5L')) {
    productTagline = '100% Water-Resistant Fabric with Super Soft Inner Lining';
  } else if (productSku.startsWith('4BL')) {
    productTagline = 'Satin Fabric for Indoor Use Only';
  } else if (productSku.startsWith('3L')) {
    productTagline = 'All-Weather Outdoor Protection for Everyday Use';
  } else if (productSku.startsWith('2L')) {
    productTagline = 'Made for Indoor Use Only';
  }

  return productTagline;  // Return the tagline for the given SKU
}


function getSortedProducts(products) {
  return products.sort((a, b) => {
    // Compare SKUs in descending order
    if (a.sku > b.sku) return -1;
    if (a.sku < b.sku) return 1;
    return 0;
  });
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
