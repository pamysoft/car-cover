import {Link, useLoaderData, type MetaFunction} from '@remix-run/react';
import {
  Money,
  getPaginationVariables,
  flattenConnection,
  Pagination,
} from '@shopify/hydrogen';
import {json, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {CUSTOMER_ORDERS_QUERY} from '~/graphql/customer-account/CustomerOrdersQuery';
import type {
  CustomerOrdersFragment,
  OrderItemFragment,
} from 'customer-accountapi.generated';
import { toTitleCase } from '~/lib/functions';
import noImageUrl from '~/assets/no_image.svg'

export const meta: MetaFunction = () => {
  return [{title: 'Orders'}];
};

export async function loader({request, context}: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 20,
  });

  const {data, errors} = await context.customerAccount.query(
    CUSTOMER_ORDERS_QUERY,
    {
      variables: {
        ...paginationVariables,
      },
    },
  );

  if (errors?.length || !data?.customer) {
    throw Error('Customer orders not found');
  }

  return json({customer: data.customer});
}

export default function Orders() {
  const {customer} = useLoaderData<{customer: CustomerOrdersFragment}>();
  const {orders} = customer;
  return (
    <div className="orders">
      <h2 className='mb-[30px] text-[20px]'>Orders</h2>
      {orders.nodes.length ? <OrdersTableWrapper orders={orders} /> : <EmptyOrders />}
    </div>
  );
}

function OrdersTableWrapper({orders}: Pick<CustomerOrdersFragment, 'orders'>) {
  return (
    <div className="acccount-orders">
      {orders?.nodes.length ? (
        <OrdersTable connection={orders}>
          {({node: order}) => <OrderItem key={order.id} order={order} />}
        </OrdersTable>
      ) : (
        <EmptyOrders />
      )}
    </div>
  );
}

function EmptyOrders() {
  return (
    <div>
      <p>You haven&apos;t placed any orders yet.</p>
      <br />
      <p>
        <Link to="/">Start Shopping →</Link>
      </p>
    </div>
  );
}

function OrderItem({order}: {order: OrderItemFragment}) {
  const fulfillmentStatus = flattenConnection(order.fulfillments)[0]?.status;
  return (
    <>
      <tr className='cursor-pointer text-[14px] hover:bg-[#f5f5f5]' onClick={() => redirect(`/account/orders/${btoa(order.id)}`)}>
        <td className='p-[21px]'><img className='rounded-[50%] border-[2px] border-[#ccc]' src={noImageUrl} width={40} height={40} /></td>
        <td className='p-[21px] pl-0'>
            <Link className='text-primary' to={`/account/orders/${btoa(order.id)}`}>
            <strong>#{order.number}</strong>
          </Link>
          <div className='flex gap-[10px]'>
            <div className='font-bold'>{toTitleCase(order.financialStatus)}</div>
            <div>{new Date(order.processedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
          </div>
          {fulfillmentStatus && <p>{fulfillmentStatus}</p>}
        </td>
        <td className='p-[21px]'>1</td>
        <td className='p-[21px]'>
          <Money data={order.totalPrice} />
        </td>
      </tr>
    </>
  );
}


function OrdersTable<NodesType>({
  connection,
  children,
}: {
  connection: React.ComponentProps<typeof Pagination<NodesType>>['connection'];
  children: React.FunctionComponent<{node: NodesType; index: number}>;
  resourcesClassName?: string;
}) {
  return (
    <Pagination connection={connection}>
      {({nodes, isLoading, PreviousLink, NextLink}) => {
        const resoucesMarkup = nodes.map((node, index) =>
          children({node, index}),
        );

        return (
          <div>
            <div className='overflow-hidden rounded-[10px] bg-white'>
              <table className='w-full'>
                <tr className="border-red border-b-[1px]">
                  <th className='w-[130px] px-[21px] py-[14px] text-left text-[14px] font-normal text-[#707070]'>
                  </th>
                  <th className='w-[25%] py-[14px] pr-[21px] text-left text-[14px] font-normal text-[#707070]'>
                    <div>
                      <span>Order</span>
                    </div>
                  </th>
                  <th className='w-[5%] px-[21px] py-[14px] text-left text-[14px] font-normal text-[#707070]'>
                    <div>
                      <span>Items</span>
                    </div>
                  </th>
                  <th className='px-[21px] py-[14px] text-left text-[14px] font-normal text-[#707070]'>
                    <div>
                      <span>Total</span>
                    </div>
                  </th>
                </tr>
                {resoucesMarkup}
              </table>
            </div>

            <PreviousLink>
              {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
            </PreviousLink>
            <NextLink>
              {isLoading ? 'Loading...' : <span>Load more ↓</span>}
            </NextLink>
          </div>
        );
      }}
    </Pagination>
  );
}
