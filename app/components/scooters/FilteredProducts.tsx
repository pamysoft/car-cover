import React, { useEffect } from 'react';
import { Pagination } from '@shopify/hydrogen';
import { useNavigate } from '@remix-run/react';
import { useInView } from 'react-intersection-observer';
import { toTitleCase } from '~/lib/functions';
import { ProductCard } from '../common/ProductCard';
import { useBreadcrumbs } from './Breadcrumbs';

export function FilteredProducts({ products }) {
  const breadcrumbs = useBreadcrumbs()
  
  return <>
    <div className="container">
      <div className='ml:flex ml:gap-[20px]'>
        <div className='pb-[80px] ml:order-2 ml:grow'>
          <h1 className="mt-[10px] text-[30px] font-medium tracking-tight">{breadcrumbs.isLoading?'...':breadcrumbs.catalogTitle} </h1>
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
