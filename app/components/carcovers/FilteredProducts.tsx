import React, { useEffect } from 'react';
import { Pagination } from '@shopify/hydrogen';
import { useNavigate } from '@remix-run/react';
import { useInView } from 'react-intersection-observer';
import { toTitleCase } from '~/lib/functions';
import { ProductCard } from './ProductCard';

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
  if (products.length ===0) {
    return <>There is no product.</>
  }
  return <>
    {products && products.map(product =>
      <ProductCard key={product.id} product={product} />
    )}
  </>
}
