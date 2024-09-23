import { Link } from "@remix-run/react"
import { StarRating } from "./StarRating"
import { ProductInfoBottom } from "./ProductInfoBottom"
import { LoopProductPrice } from "./LoopProductPrice"
import LoopProductAddToCartButton from "./LoopProductAddToCartButton"
import {CartProvider, useCart} from '@shopify/hydrogen-react';
import { AddToCartButton } from "../AddToCartButton"

function CartComponent() {
  const {linesAdd, status} = useCart();

  const merchandise = {merchandiseId: '{id-here}'};

  return (
    <div>
      Cart Status: {status}
      <button onClick={() => linesAdd([merchandise])}>Add Line</button>
    </div>
  );
}

export function ProductCard({ product }) {
    const productUrl = `/products/${product.handle}`
    const imageurl = product.imageurl + '?width=400'
    
    

    // const {linesAdd, status} = useOptimisticCart();


    console.log('product', product)
  
    return <>
      <div className='border-[1px] border-solid border-[#ebebeb] p-[15px]'>
        <div className='font-[Oswald] text-[22px] font-medium leading-[1.4] tracking-tight hover:text-[red]'>
          <Link key={product.id} to={productUrl}>{product.title}</Link>
        </div>
        <StarRating></StarRating>
        <div className="mt-[10px]">
          <span className="mr-[2px] font-['icon-dukamarket'] text-[15px] leading-4 before:content-['\e951']"></span>{product.tagline}
        </div>
  
        <div className='w-full nw:table'>
          <div className='nw:table-row nw:gap-[30px]'>
            <div className='max-w-full nw:table-cell nw:w-[400px] nw:pt-[40px] nw:align-top'>
              <Link key={product.id} to={productUrl}><img src={imageurl} width="400" height="auto" /></Link>
            </div>
            <div className='nw:table-cell nw:pl-[25px] nw:pt-[25px] nw:align-top'>
              <div className='xl:flex xl:gap-[20px]'>
                <div className="wysiwyg text-black xl:grow">
                  <div dangerouslySetInnerHTML={{ __html: product.shortDescription }} />
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
                    {/* <LoopProductAddToCartButton product={product} /> */}

                    {/* <CartProvider
                      onLineAdd={() => {
                        console.log('a line is being added');
                      }}
                      onLineAddComplete={() => {
                        console.log('a line has been added');
                      }}
                    >
                      	<LoopProductAddToCartButton product={product}></LoopProductAddToCartButton>
                    </CartProvider>; */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  
  }