import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Form, NavLink, Outlet, useLoaderData} from '@remix-run/react';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';
import AccountIcon from '~/components/carcovers/icons/AccountIcon';

export function shouldRevalidate() {
  return true;
}

export async function loader({context}: LoaderFunctionArgs) {
  const {data, errors} = await context.customerAccount.query(
    CUSTOMER_DETAILS_QUERY,
  );

  if (errors?.length || !data?.customer) {
    console.log('errors',errors)
    throw new Error('Customer not found');
  }

  return json(
    {customer: data.customer},
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
  );
}

export default function AccountLayout() {
  const {customer} = useLoaderData<typeof loader>();

  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}`
      : `Welcome to your account.`
    : 'Account Details';

  return (
    <>
      <div className='container mt-5'>
        <h1 className='text-[30px]'>{heading}</h1>
        <br />
        <AccountMenu />
      </div>

      <div className='bg-[#F5F5F5]'>
        <div className='container mt-5 py-[60px]'>
          <Outlet context={{customer}} />
        </div>
      </div>
    </>
  );
}

function AccountMenu() {
  function isActiveClass({
    isActive,
    isPending,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) {
    return 'text-[16px] hover:text-primary hover:no-underline font-heading' + (isActive ? ' text-primary' : '');
  }

  return (
    <nav role="navigation" className='flex gap-[30px]'>
      <NavLink to="/account/orders" className={isActiveClass}>
        Orders
      </NavLink>
      <NavLink to="/account/profile" className={isActiveClass}>
        Profile
      </NavLink>           
      <Logout className={isActiveClass({isActive:false, isPending:false})} />
    </nav>
  );
}

function Logout({className}: {className: string}) {
  return (
    <Form className={className} method="POST" action="/account/logout">
      <div className='flex items-center gap-[8px]'>
        <AccountIcon className='' width={16} height={16} /><button type="submit">Sign out</button>
      </div>
    </Form>
  );
}
