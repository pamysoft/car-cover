import { json, redirect, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Link, useLoaderData, type MetaFunction } from '@remix-run/react';
import { Money, Image, flattenConnection } from '@shopify/hydrogen';
import type { OrderLineItemFullFragment } from 'customer-accountapi.generated';
import { CUSTOMER_ORDER_QUERY } from '~/graphql/customer-account/CustomerOrderQuery';
import BasketIcon from '~/components/carcovers/icons/BasketIcon';
import ArrowDownIcon from '~/components/carcovers/icons/ArrowDownIcon';
import { useEffect, useState } from 'react';
import ArrowUpIcon from '~/components/carcovers/icons/ArrowUpIcon';
import BackIcon from '~/components/carcovers/icons/BackIcon';
import CheckedIcon from '~/components/carcovers/icons/CheckedIcon';
import noImageUrl from '~/assets/no_image.svg'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `Order ${data?.order?.name}` }];
};

export async function loader({ params, context }: LoaderFunctionArgs) {
  if (!params.id) {
    return redirect('/account/orders');
  }

  const orderId = atob(params.id);
  const { data, errors } = await context.customerAccount.query(
    CUSTOMER_ORDER_QUERY,
    {
      variables: { orderId },
    },
  );

  if (errors?.length || !data?.order) {
    throw new Error('Order not found');
  }

  const { order } = data;

  const lineItems = flattenConnection(order.lineItems);
  const discountApplications = flattenConnection(order.discountApplications);
  const fulfillmentStatus = flattenConnection(order.fulfillments)[0]?.status;

  const firstDiscount = discountApplications[0]?.value;

  const discountValue =
    firstDiscount?.__typename === 'MoneyV2' && firstDiscount;

  const discountPercentage =
    firstDiscount?.__typename === 'PricingPercentageValue' &&
    firstDiscount?.percentage;

  return json({
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  });
}

export default function OrderRoute() {
  // const {
  //   order,
  //   lineItems,
  //   discountValue,
  //   discountPercentage,
  //   fulfillmentStatus,
  // } = useLoaderData<typeof loader>();
  const data = useLoaderData<typeof loader>();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();

    // Add event listener on component mount
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array to ensure the effect runs only once


  return (
    <>
      <div>
        
        {isMobile && <OrderSummaryToggle data={data} />}

        <OrderOverview data={data} />
        <div className='grid lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-[60%,40%]'>

          <div className='flex flex-col gap-[25px]'>
            
            <OrderStatus data={data} />
            
            <NewsAndOffers />
            <OrderDetails data={data} />
          </div>

          {!isMobile && <OrderSummary data={data} className='[&>div]:bg-white' />}


        </div>
      </div>

    </>
  );
}

function OrderRoute_Backup() {
  const {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  } = useLoaderData<typeof loader>();
  return (
    <div className="account-order">
      <h2>Order {order.name}</h2>
      <p>Placed on {new Date(order.processedAt!).toDateString()}</p>
      <br />
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((lineItem, lineItemIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <OrderLineRow key={lineItemIndex} lineItem={lineItem} />
            ))}
          </tbody>
          <tfoot>
            {((discountValue && discountValue.amount) ||
              discountPercentage) && (
                <tr>
                  <th scope="row" colSpan={3}>
                    <p>Discounts</p>
                  </th>
                  <th scope="row">
                    <p>Discounts</p>
                  </th>
                  <td>
                    {discountPercentage ? (
                      <span>-{discountPercentage}% OFF</span>
                    ) : (
                      discountValue && <Money data={discountValue!} />
                    )}
                  </td>
                </tr>
              )}
            <tr>
              <th scope="row" colSpan={3}>
                <p>Subtotal</p>
              </th>
              <th scope="row">
                <p>Subtotal</p>
              </th>
              <td>
                <Money data={order.subtotal!} />
              </td>
            </tr>
            <tr>
              <th scope="row" colSpan={3}>
                Tax
              </th>
              <th scope="row">
                <p>Tax</p>
              </th>
              <td>
                <Money data={order.totalTax!} />
              </td>
            </tr>
            <tr>
              <th scope="row" colSpan={3}>
                Total
              </th>
              <th scope="row">
                <p>Total</p>
              </th>
              <td>
                <Money data={order.totalPrice!} />
              </td>
            </tr>
          </tfoot>
        </table>
        <div>
          <h3>Shipping Address</h3>
          {order?.shippingAddress ? (
            <address>
              <p>{order.shippingAddress.name}</p>
              {order.shippingAddress.formatted ? (
                <p>{order.shippingAddress.formatted}</p>
              ) : (
                ''
              )}
              {order.shippingAddress.formattedArea ? (
                <p>{order.shippingAddress.formattedArea}</p>
              ) : (
                ''
              )}
            </address>
          ) : (
            <p>No shipping address defined</p>
          )}
          <h3>Status</h3>
          <div>
            <p>{fulfillmentStatus}</p>
          </div>
        </div>
      </div>
      <br />
      <p>
        <a target="_blank" href={order.statusPageUrl} rel="noreferrer">
          View Order Status →
        </a>
      </p>
    </div>
  );
}

function OrderLineRow({ lineItem }: { lineItem: OrderLineItemFullFragment }) {
  return (
      <div key={lineItem.id} className='grid grid-cols-[80px,1fr,70px] items-center justify-between'>
        <div>
          <div className='relative float-left'>
            <img className='overflow-hidden rounded-[5px] border-[1px] border-border' width={64} height={64} src={noImageUrl} />
            <div className='absolute right-0 top-0 flex h-[22px] w-[22px] translate-x-[50%] translate-y-[-50%] items-center justify-center rounded-[50%] bg-[#707070] text-[12px] text-white'>{lineItem.quantity}</div>
          </div>
        </div>
        <div>
          <p>{lineItem.title}</p>
          <small>{lineItem.variantTitle}</small>
        </div>
        <div className='text-right'><Money data={lineItem.price!} /></div>
      </div>
  );
}



function OrderSummaryToggle({ className, data }: { className?: string, data: any }) {
  const [isShow, setIsShow] = useState(false);
  const {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  } = data;
  
  return (
    <div className={className}>
      <div className='flex justify-between border-b-[1px] border-border py-[21px]' onClick={() => setIsShow(!isShow)}>
          <div className='flex items-center gap-x-[10px] text-primary'>
            <span><BasketIcon width={16} height={16} /></span>
            <span className='text-[14px]'>{isShow?'Hide order summary':'Show order summary'}</span>
            <span>{!isShow && <ArrowDownIcon width={12} height={12} />}{isShow && <ArrowUpIcon width={12} height={12} />}</span>
          </div>
          <div><span className='font-bold'><Money data={order.totalPrice} /></span></div>
      </div>
      {isShow && <OrderSummary data={data} className='[&>div]:bg-red [&>div]:px-[0]' />}
    </div>
  );
}
function OrderOverview({ className, data }: { className?: string, data: any }) {
  const {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  } = data;


  console.log('order', order)
  console.log('fulfillmentStatus', fulfillmentStatus)

  return (
    <div className={className}>
      <div className='flex flex-col gap-[30px] py-[21px] lg:flex-row lg:justify-between'>
            <div className='flex items-start gap-x-[10px]'>
              <Link to={'/account/orders'} className='mt-[8px]'><BackIcon /></Link>
              <div>
                <div className='text-[21px] font-bold'>Order {order.name}</div>
                <div className='text-[14px] text-[#666666]'>Confirmed {new Date(order.processedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</div>
              </div>
            </div>
            <div className='hidden'><button className='w-full rounded-[5px] border-[1px] border-border bg-white p-[14px] text-[14px] font-semibold text-primary'>Buy Again</button></div>
      </div>
    </div>
  )
}

function OrderStatus({ className, data }: { className?: string, data: any }) {
  const {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  } = data;
  return (
    <div className={className}>
      <div className='rounded-[10px] bg-white p-[21px]'>
            <div className='flex gap-x-[5px]'>
              <CheckedIcon className='mt-[5px]' />
              <div>
                <div className='font-semibold'>Confirmed</div>
                <div className='mt-[5px] text-[14px] text-[#707070]'>Updated {new Date(order.processedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                <div className='mt-[20px] text-[14px] text-[#707070]'>We've received your order.</div>
              </div>
            </div>
            <div className='mt-[25px] hidden'><button className='rounded-[5px] border-[1px] border-border bg-white p-[14px] text-[14px] font-semibold text-primary'>Track order with shop</button></div>
          
      </div>
    </div>
  )
}


function NewsAndOffers({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className='rounded-[10px] bg-white p-[21px]'>
        <div className='font-semibold'>News and offers</div>
        <div className='mt-[25px] text-[14px] text-[#707070]'>You'll receive marketing emails. You can unsubscribe at any time.</div>
        <label className='mt-[10px] block text-[14px]'><input type="checkbox" name='email_me' className='mr-[5px]' />Email me with news and offers</label>
      </div>
    </div>
  )
}



function OrderDetails({ className, data }: { className?: string, data: any }) {
  const {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  } = data;
  return (
    <div className={className}>
      <div className='rounded-[10px] bg-white p-[21px]'>
        <div className='font-semibold'>Order details</div>
        <div className='mt-[25px] flex flex-col gap-[30px] text-[14px] lg:grid lg:grid-cols-2'>
          <div className='flex flex-col gap-[30px]'>
            <div>
              <div className='mb-[15px] text-[#707070]'>Contact information</div>
              <div>
                {order.shippingAddress.name}<br/>
                test1@pamysoft.com
              </div>
            </div>
            
            <div>
              <div className='mb-[15px] text-[#707070]'>Shipping address</div>
              <div>
                {order.shippingAddress.formatted.map(item => <div>{item}</div>)}
              </div>
            </div>
            
            <div>
              <div className='mb-[15px] text-[#707070]'>Shipping method</div>
              <div>Free Shipping</div>
            </div>
          </div>
          
          <div className='flex flex-col gap-[30px]'>
            <div>
              <div className='mb-[15px] text-[#707070]'>Payment</div>
              <div>
                Bogus
                ending with 1 - $159.99
                September 25, 2024
              </div>
            </div>
            
            <div>
              <div className='mb-[15px] text-[#707070]'>Billing address</div>
              <div>
                Hao Hoang<br/>
                58 Tran Binh<br/>
                12/14/131 Phan Dinh Giot<br/>
                Hanoi New York 10001<br/>
                United States
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderSummary({ className, data }: { className?: string, data: any }) {
  const {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  } = data;
  return (
    <div className={className}>
      <div className='rounded-[10px] p-[21px]'>
        <div className='font-semibold'>Order summary</div>
        <div className='mt-[10px] flex flex-col gap-[20px] text-[14px]'>
          <div className='flex flex-col gap-[20px] py-[15px]'>
            {lineItems.map((lineItem, lineItemIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <OrderLineRow key={lineItemIndex} lineItem={lineItem} />
            ))}
          </div>
          
          <div className='flex justify-between'>
            <div>Subtotal</div>
            <div><Money data={order.subtotal!} /></div>
          </div>
          <div className='flex justify-between'>
            <div>Shipping</div>
            <div>Free</div>
          </div>

          <div className='mt-[15px] flex justify-between'>
            <div className='text-[19px] font-semibold'>Total</div>
            <div className='flex items-center'>
              <span>USD</span>
              <span className='ml-[10px] text-[19px] font-semibold'><Money data={order.totalPrice!} /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
