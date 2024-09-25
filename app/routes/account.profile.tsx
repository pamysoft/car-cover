import type { CustomerFragment } from 'customer-accountapi.generated';
import type { CustomerUpdateInput } from '@shopify/hydrogen/customer-account-api-types';
import { CUSTOMER_UPDATE_MUTATION } from '~/graphql/customer-account/CustomerUpdateMutation';
import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
  type MetaFunction,
} from '@remix-run/react';
import EditIcon from '~/components/carcovers/icons/EditIcon';
import AddIcon from '~/components/carcovers/icons/AddIcon';

export type ActionResponse = {
  error: string | null;
  customer: CustomerFragment | null;
};

export const meta: MetaFunction = () => {
  return [{ title: 'Profile' }];
};

export async function loader({ context }: LoaderFunctionArgs) {
  await context.customerAccount.handleAuthStatus();

  return json({});
}

export async function action({ request, context }: ActionFunctionArgs) {
  const { customerAccount } = context;

  if (request.method !== 'PUT') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  const form = await request.formData();

  try {
    const customer: CustomerUpdateInput = {};
    const validInputKeys = ['firstName', 'lastName'] as const;
    for (const [key, value] of form.entries()) {
      if (!validInputKeys.includes(key as any)) {
        continue;
      }
      if (typeof value === 'string' && value.length) {
        customer[key as (typeof validInputKeys)[number]] = value;
      }
    }

    // update customer and possibly password
    const { data, errors } = await customerAccount.mutate(
      CUSTOMER_UPDATE_MUTATION,
      {
        variables: {
          customer,
        },
      },
    );

    if (errors?.length) {
      throw new Error(errors[0].message);
    }

    if (!data?.customerUpdate?.customer) {
      throw new Error('Customer profile update failed.');
    }

    return json({
      error: null,
      customer: data?.customerUpdate?.customer,
    });
  } catch (error: any) {
    return json(
      { error: error.message, customer: null },
      {
        status: 400,
      },
    );
  }
}

export default function AccountProfile() {
  return (
    <div>
      <h2 className='mb-[30px] text-[20px]'>Profile</h2>
      <div className='flex flex-col gap-[25px]'>
        <ProfileEdit />
        <Addresses />
      </div>
    </div>
  )
}

function ProfileEdit() {
  return (
    <div className='rounded-[10px] bg-white p-[21px] text-[14px]'>
      <h2 className='flex items-center gap-[10px] text-[16px]'><span>Hao Hoang</span><div>
        <button>
          <EditIcon className='text-primary' />
        </button>
      </div></h2>

      <div className='mt-[25px]'>
        Email<br />
        test1@pamysoft.com
      </div>
    </div>
  )
}

function Addresses({ className }: { className?: string }) {
  const { customer } = useOutletContext<{ customer: CustomerFragment }>();
  const { defaultAddress, addresses } = customer;

  return (
    <div className={className}>
      <div className='rounded-[10px] bg-white p-[21px] text-[14px]'>
        <div className='flex items-center gap-[10px] text-[16px]'>
          <h2><span>Addresses</span></h2>
          <div>
            <button className='flex items-center gap-[5px] text-[14px]'>
              <AddIcon className='text-primary' /> Add
            </button>
          </div>
        </div>

        <div className='mt-[30px] grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-4'>
          {addresses.nodes.map((address) => (
            <AddressItem></AddressItem>
          ))}
        </div>
      </div>
    </div>
  )
}

function AddressItem({ className }: { className?: string }) {
  return (
    <div className='text-[14px] after:block after:content-[""]'>
      <div className='flex items-center gap-[10px]'><span>Default address</span><div>
        <button>
          <EditIcon className='text-primary' />
        </button>
      </div></div>

      <div className='mt-[10px]'>
        Hao Hoang<br />
        Pamysoft<br />
        58 Tran Binh<br />
        12/14/131 Phan Dinh Giot<br />
        Hanoi New York 10001<br />
        United States<br />
      </div>
    </div>
  )
}

function AccountProfileBackup() {
  const account = useOutletContext<{ customer: CustomerFragment }>();
  const { state } = useNavigation();
  const action = useActionData<ActionResponse>();
  const customer = action?.customer ?? account?.customer;

  return (
    <div className="account-profile">
      <h2>My profile</h2>
      <br />
      <Form method="PUT">
        <legend>Personal information</legend>
        <fieldset>
          <label htmlFor="firstName">First name</label>
          <input
            className='p-2'
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            aria-label="First name"
            defaultValue={customer.firstName ?? ''}
            minLength={2}
          />
          <label htmlFor="lastName" className='mt-2'>Last name</label>
          <input
            className='p-2'
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Last name"
            aria-label="Last name"
            defaultValue={customer.lastName ?? ''}
            minLength={2}
          />
        </fieldset>
        {action?.error ? (
          <p>
            <mark>
              <small>{action.error}</small>
            </mark>
          </p>
        ) : (
          <br />
        )}
        <button className='bg-primary px-5 py-2 text-white' type="submit" disabled={state !== 'idle'}>
          {state !== 'idle' ? 'Updating' : 'Update'}
        </button>
      </Form>
    </div>
  );
}
