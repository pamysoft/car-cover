import React, { useEffect } from 'react';
import { Pagination } from '@shopify/hydrogen';
import { json, Link, useLoaderData, useLocation, useNavigate } from '@remix-run/react';
import { useInView } from 'react-intersection-observer';
import { SearchBox } from './SearchBox';
import { urlWithTrackingParams } from '~/lib/search';
import { toTitleCase } from '~/lib/functions';
import { ProductPrice } from '../ProductPrice';
import { LoopProductPrice } from './LoopProductPrice';
import { ProductInfoBottom } from './ProductInfoBottom';
import { StarRating } from './StarRating';

export function FilteredProducts({ products, theFilter }) {
  let parts: string[] = [];

  parts.push(toTitleCase(theFilter.make));
  if (theFilter.model) {
    parts.push(toTitleCase(theFilter.model));
    if (theFilter.year) {
      parts.push(toTitleCase(theFilter.year));
    }
  }
  let dynamicText: String = parts.join(' ')

  return <>
    <div className="container">
      <div className='ml:flex ml:gap-[20px]'>
        <div className='ml:order-2 ml:grow'>
          <h1 className="mt-[10px] text-[30px] font-medium tracking-tight">{dynamicText} Car Covers</h1>
          <div className='flex flex-col'>
            <div className='mt-[30px]'>
              <LoopProducts products={products} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

function LoopProducts({ products }) {
  console.log('products', products)
  if (products.length ===0) {
    return <>There is no product.</>
  }
  return <>
    {products && products.map(product =>
      <ProductCard key={product.id} product={product} />
    )}
  </>
}

function InnerFilteredProducts({ products }) {
  const { ref, inView, entry } = useInView();
  return <>
    <Pagination connection={products}>
      {({ nodes, isLoading, PreviousLink, NextLink, hasNextPage, nextPageUrl, state }) => (
        <ul>
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
        </ul>
      )}
    </Pagination>
  </>
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
      <ProductCard product={product} />
    </div>
  ));
}

function ProductCard({ product }) {
  const productUrl = `/products/${product.handle}`
  const imageurl = product.variants.nodes[0].image?.url

  return <>
    <div className='border-[1px] border-solid border-[#ebebeb] p-[15px]'>
      <div className='font-[Oswald] text-[22px] font-medium leading-[1.4] tracking-tight hover:text-[red]'>
        <Link key={product.id} to={productUrl}>{product.title} - {product.variants.nodes[0].sku}</Link>
      </div>
      <StarRating></StarRating>
      <div className="mt-[10px]">
        <span className="mr-[2px] font-['icon-dukamarket'] text-[15px] leading-4 before:content-['\e951']"></span>{product.tagline}
      </div>

      <div className='w-full nw:table'>
        <div className='nw:table-row nw:gap-[30px]'>
          <div className='max-w-full nw:table-cell nw:w-[230px] nw:align-middle'>
            <Link key={product.id} to={productUrl}><img src={imageurl} width="400" height="auto" /></Link>
          </div>
          <div className='nw:table-cell nw:pl-[25px] nw:pt-[25px] nw:align-top'>
            <div className='xl:flex xl:gap-[20px]'>
              <div className="wysiwyg xl:grow">
                <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                <ProductInfoBottom />
              </div>
              <div className="md:min-w-[245px] md:max-w-[245px]">
                <div className="mt-[45px] nw:mt-0">
                  <LoopProductPrice price={product.variants.nodes[0].price} compareAtPrice={product.variants.nodes[0].compareAtPrice}></LoopProductPrice>
                </div>
                <div className="mt-[15px]">
                  <div className="mb-[5px] font-[Oswald] text-[16px] font-medium tracking-normal text-black">
                    <span className="text-[red]">Free</span> Shipping
                  </div>
                  <div className="mb-[5px] font-[Oswald] text-[16px] font-medium tracking-normal text-black">
                    <span className="text-[red]">In</span> Stock
                  </div>
                  <div className="mb-[5px] font-[Oswald] text-[16px] font-medium tracking-normal text-black">
                    <span className="text-[red]">Lifetime</span> Warranty
                  </div>
                  <div className="mb-[5px] font-[Oswald] text-[16px] font-medium tracking-normal text-black">
                    Ships <span className="text-[red]">Same</span> Business Day
                  </div>
                </div>
                <div className="mt-[20px] flex flex-col gap-[10px]">
                  <Link key={product.id} to={productUrl} className="block bg-black px-[20px] py-[10px] text-center text-[13px] uppercase text-white">View Details</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>

}