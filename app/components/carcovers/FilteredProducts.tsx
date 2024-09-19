import React, { useEffect } from 'react';
import { Pagination } from '@shopify/hydrogen';
import { json, Link, useLoaderData, useLocation, useNavigate } from '@remix-run/react';
import { useInView } from 'react-intersection-observer';
import { SearchBox } from './SearchBox';
import { urlWithTrackingParams } from '~/lib/search';
import { toTitleCase } from '~/lib/functions';

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
              <InnerFilteredProducts products={products} />
            </div>
          </div>
        </div>        
      </div>
    </div>
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
      <div className='font-[Oswald] text-[22px] font-medium leading-[1.4] tracking-tight hover:text-[red]'><Link key={product.id} to={productUrl}>{product.title}</Link></div>

      {/* <div className='mr-10'><img src={product.variants.nodes[0].image?.url} width={100} /></div> */}

      <div className='w-full nw:table'>
        <div className='nw:table-row nw:gap-[30px]'>
          <div className='max-w-full nw:table-cell nw:w-[230px] nw:align-middle'>
            <Link key={product.id} to={productUrl}><img src={imageurl} width="400" height="auto" /></Link>
          </div>
        </div>
        <div className='nw:table-cell nw:pl-[25px] nw:pt-[25px] nw:align-top'>
          <div className='xl:flex xl:gap-[20px]'>
            <div className="wysiwyg xl:grow">
              <div className="metafield-rich_text_field"><p>Experience superior protection for your RV with our top-of-the-line Gold Shield 5L RV Cover.</p><ul><li>This cover is expertly crafted to withstand all weather extremities, from desert heat to severe snow storms, ensuring your RV is well-protected.</li><li>This Premium RV Cover exclusively offers a thick 5-ply fabric on the top and a 3-ply fabric on the sides, making sure to protect your RV's paint and finish.</li><li>Its standout feature is the 100% breathable, water-resistant material, which offers robust defense against the elements while maintaining the right balance of air circulation to keep your RV in prime condition.</li><li>The Gold Shield 5L RV Cover is designed to accommodate up to three AC units on its roof, featuring zippered panels for convenient access at any time and, air vents.</li><li>Our commitment to quality is backed by our full&nbsp;<strong>Lifetime Warranty</strong>.</li><li><strong>Included with your purchase</strong>:&nbsp;Free Shipping, Lifetime Warranty, Storage Bag, Buckles and Straps (front, rear and bottom), Free Patch kit for quick repairs, rain gutter covers, a ladder cap, toss bag and much more!</li></ul><p>Take advantage of our current special pricing and free shipping by ordering now!</p></div>
            </div>
          </div>
          <div className="md:min-w-[245px] md:max-w-[245px]">
            <div className="mt-[45px] nw:mt-0">
              <div className="mb-[15px] text-[30px] font-medium text-[#ff0000]">
                $299.99
              </div>
              <div>
                Regular Price: <span className="text-[18px] font-semibold text-black">$749.99</span>
              </div>
              <div className="mt-[7px]">
                You save <span className="text-[18px] font-semibold text-black">$450.00</span>
                <span className="text-[#ff0000]">(60% Off)</span>
              </div>
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
  </>

}