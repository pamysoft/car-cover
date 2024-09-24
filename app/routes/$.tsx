import { json, Link, useLoaderData, useLocation, useNavigate } from '@remix-run/react';
import { getPaginationVariables } from '@shopify/hydrogen';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

import { useInView } from "react-intersection-observer";
import { Breadcrumbs } from '~/components/carcovers/Breadcrumbs';
import { CategoryStaticContent } from '~/components/carcovers/CategoryStaticContent';
import { FilteredProducts } from '~/components/carcovers/FilteredProducts';
import { FETCH_PRODUCTS_QUERY } from '~/lib/fragments';
import { fetchShopifyProductsByPath, stripSlashes } from '~/lib/functions';



export async function loader({ request, context }: LoaderFunctionArgs) {
  const pathname = stripSlashes(new URL(request.url).pathname)
  
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
      product.shortDescription = getProductShortDescription(productSku)

      product.trim = product.metafields[0].value
      product.quality = product.metafields[1].value
      product.imageurl = `https://cdn.shopify.com/s/files/1/0607/7064/8154/files/${product.trim}${product.quality}.jpg`

      validProducts.push(product)
    }
  }
  return validProducts
}

function getProductShortDescription(productSku: string) {
  let productDescription = '';  // Default value for description

  // Check the start of the SKU and return appropriate description
  if (productSku.startsWith('5L')) {
    productDescription = `
      <p>Experience superior protection for your vehicle with our top-of-the-line Gold Shield 5L Car Cover.</p>
      <ul>
        <li>This five (5) layers car cover is expertly crafted to withstand all weather extremities, from desert heat to severe snow storms, ensuring your car is well-protected.</li>
        <li>Its standout feature is the 100% breathable, water-resistant material, which offers robust defense against the elements while maintaining the right balance of air circulation to keep your car in prime condition.</li>
        <li>The cover's inner layer is lined with a soft cotton fleece, thoughtfully designed to safeguard the paint and finish of your vehicle.</li>
        <li>We guarantee a perfect fit on your vehicle, or you will receive a full refund.</li>
        <li>Our commitment to quality is backed by our full <strong>Lifetime Warranty</strong>.</li>
        <li><u>Included with your purchase:</u> Free Shipping, Lifetime Warranty, Storage Bag, Cable and Lock, Buckles and Straps, and an Antenna Patch.</li>
      </ul>
      <p><strong>Take advantage of our current special pricing and free shipping by ordering now!</strong></p>
    `;
  } else if (productSku.startsWith('4BL')) {
    productDescription = `
      <p>Introducing the all new Black Satin Car Cover, the ultimate solution for indoor protection of your vehicle.</p>
      <ul>
        <li>The fine woven threads and silky smooth fabric with a glossy finish will preserve the finish and detailing of your car, keeping it looking showroom-new.</li>
        <li>The cover provides protection against dust, dirt, and scratches, ensuring your vehicle stays in pristine condition.</li>
        <li>The Black Satin Car Cover not only offers a perfect fit but also comes with a money-back guarantee for your satisfaction.</li>
        <li>We are so confident in the quality of our cover that we offer a full <strong>Lifetime Warranty</strong>, giving you peace of mind with your purchase.</li>
        <li><u>Included with your purchase:</u> Free Shipping, Lifetime Warranty, Storage Bag, and an Antenna Patch.</li>
      </ul>
      <p><strong>Take advantage of our current special pricing and free shipping by ordering now!</strong></p>
    `;
  } else if (productSku.startsWith('3L')) {
    productDescription = `
      <p>The Silver Shield 3L Car Cover is designed to offer top-notch protection whether you're storing your vehicle indoors or using it outdoors in typical weather conditions.</p>
      <ul>
        <li>Constructed with three (3) layers of materials, including a Micro-Porous film, this car cover not only securely envelops your vehicle but also allows it to breathe safely.</li>
        <li>This cover provides consistent and trustworthy protection for your car when it's left outdoors in standard weather conditions.</li>
        <li>The Silver Shield 3L Car Cover not only offers a perfect fit but also comes with a money-back guarantee for your satisfaction.</li>
        <li>We are so confident in the quality of our cover that we offer a <strong>5-Year Warranty</strong>, giving you peace of mind with your purchase.</li>
        <li><u>Included with your purchase:</u> Free Shipping, 5-Year Warranty, Storage Bag, Buckles and Straps, and an Antenna Patch.</li>
      </ul>
      <p><strong>Take advantage of our current special pricing and free shipping by ordering now!</strong></p>
    `;
  } else if (productSku.startsWith('2L')) {
    productDescription = `
      <p>If you're looking for a car cover specifically made for indoor storage that is lightweight, then the Bronze Shield 2L Car Cover is the perfect choice.</p>
      <ul>
        <li>Crafted with two (2) layers of Polypropylene PLUS, this car cover is an ideal choice for basic indoor protection.</li>
        <li>The cover provides protection against dust, dirt, and scratches, ensuring your vehicle stays in pristine condition.</li>
        <li>The Bronze Shield 2L Car Cover not only offers a perfect fit but also comes with a money-back guarantee for your satisfaction.</li>
        <li>We are so confident in the quality of our cover that we offer a <strong>3-Year Warranty</strong>, giving you peace of mind with your purchase.</li>
        <li><u>Included with your purchase:</u> Free Shipping, 3-Year Warranty, Storage Bag, Buckles and Straps, and an Antenna Patch.</li>
      </ul>
      <p><strong>Take advantage of our current special pricing and free shipping by ordering now!</strong></p>
    `;
  }

  return productDescription;  // Return the product description based on SKU
}


function getProductTagLine(productSku: string) {
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
    <Breadcrumbs.Provider>
      <Breadcrumbs />
      {/* Decide the layout */}
      {(layout === DisplayLayout.ListProducts) ? <FilteredProducts theFilter={theFilter} products={products} /> : <CategoryStaticContent path={pathname} />}
    </Breadcrumbs.Provider>
  );
}
