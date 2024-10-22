import { Suspense } from 'react';
import { defer, redirect, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, type MetaFunction } from '@remix-run/react';
import type { ProductFragment } from 'storefrontapi.generated';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
} from '@shopify/hydrogen';
import type { SelectedOption } from '@shopify/hydrogen/storefront-api-types';
import { getVariantUrl } from '~/lib/variants';
import { ProductPrice } from '~/components/common/ProductPrice';
import { ProductForm } from '~/components/common/ProductForm';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `Hydrogen | ${data?.product.title ?? ''}` }];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({ ...deferredData, ...criticalData });
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({
  context,
  params,
  request,
}: LoaderFunctionArgs) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{ product }] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: { handle, selectedOptions: getSelectedProductOptions(request) },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option: SelectedOption) =>
        option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    // if no selected variant was returned from the selected options,
    // we redirect to the first variant's url with it's selected options applied
    if (!product.selectedVariant) {
      throw redirectToFirstVariant({ product, request });
    }
  }

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context, params }: LoaderFunctionArgs) {
  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deffered query resolves, the UI will update.
  const variants = context.storefront
    .query(VARIANTS_QUERY, {
      variables: { handle: params.handle! },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    variants,
  };
}

function redirectToFirstVariant({
  product,
  request,
}: {
  product: ProductFragment;
  request: Request;
}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes[0];

  return redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search),
    }),
    {
      status: 302,
    },
  );
}

export default function Product() {
  const { product, variants } = useLoaderData<typeof loader>();
  const selectedVariant = useOptimisticVariant(
    product.selectedVariant,
    variants,
  );

  const { title } = product;
  const descriptionHtml = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`
  const slideImages = [
    'https://cdn.shopify.com/s/files/1/0607/7064/8154/files/chevrolet-corvette-c8-2020-2021-2022-2023-2024-custom-fit-car-cover-5l.jpg?v=1728514430',
    'https://cdn.shopify.com/s/files/1/0607/7064/8154/files/gold-shield-5-layers-buckles-and-straps.jpg?v=1728514429',
    'https://cdn.shopify.com/s/files/1/0607/7064/8154/files/gold-shield-5-layers-cover-composition.png?v=1728514429',
    'https://cdn.shopify.com/s/files/1/0607/7064/8154/files/gold-shield-5-layers-polypropylene-outer-layer.jpg?v=1728514429',
  ];

  return <div className='container pb-[60px] pt-[30px]'>
    <div className='flex flex-col md:grid md:grid-cols-2 md:gap-[40px]'>
      <div>
        <div className='md:hidden'>
          <ProductImageSlider slideImages={slideImages} />
        </div>
        <div className='hidden gap-[10px] md:flex md:flex-col'>
          <div>
            <img src={slideImages[0]} />
          </div>
          <div className='md:grid md:grid-cols-2 md:gap-[10px]'>
            {slideImages?.length>0 && slideImages.map((slideImage, index) => {
              return (
                <img key={index} src={slideImage} />
              )
            })}
          </div>
        </div>
      </div>
      <div className='mt-[30px] md:mt-0'>
        <div className='text-[10px] uppercase text-[#121212BF]'>CarCovers.com</div>
        <h1 className='text-[30px] md:text-[40px] md:leading-[52px]'>{title}</h1>
        <div className='mt-[20px] md:text-[18px]'>
          <ProductPrice
            price={selectedVariant?.price}
            compareAtPrice={selectedVariant?.compareAtPrice}
          />
        </div>
        <Suspense
          fallback={
            <ProductForm
              product={product}
              selectedVariant={selectedVariant}
              variants={[]}
            />
          }
        >
          <Await
            errorElement="There was a problem loading product variants"
            resolve={variants}
          >
            {(data) => (
              <ProductForm
                product={product}
                selectedVariant={selectedVariant}
                variants={data?.product?.variants.nodes || []}
              />
            )}
          </Await>
        </Suspense>
        {/* <div className='[&>div>p]:text-[15px] md:[&>div>p]:text-[16px] [&>div>p]:leading-[1.8] mt-[20px] text-[#121212BF]'>
          <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        </div> */}

        <div className='mt-[35px]'>
          <ShareButton />
        </div>

        <ProductAccordion />
      </div>
    </div>
  </div>
}


import useEmblaCarousel from 'embla-carousel-react'
import ShareButton from '~/components/common/ShareButton';
import { NextButton, PrevButton, usePrevNextButtons } from '~/components/common/EmblaCarouselArrowButtons';
import { SelectedSnapDisplay, useSelectedSnapDisplay } from '~/components/common/EmblaCarouselSelectedSnapDisplay';
import { ProductAccordion } from '~/components/common/ProductAccordion';


const ProductImageSlider = ({ slideImages }: { slideImages: string[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({})
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)


  return (
    <div className='embla'>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slideImages.map((slideImage, index) => (
            <div className='embla__slide relative h-[340px] w-[340px] max-w-full' key={index}>
              <img className='absolute left-[50%] h-full min-h-[300px] translate-x-[-50%]' src={slideImage} />
            </div>
          ))}
        </div>
      </div>
      <div className="embla__controls mx-auto mt-[33px] flex items-center justify-center gap-[30px]">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <SelectedSnapDisplay
          selectedSnap={selectedSnap}
          snapCount={snapCount}
        />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
` as const;
