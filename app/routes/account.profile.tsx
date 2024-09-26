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
import Modal from '~/components/carcovers/Modal';
import { useRef, useState } from 'react';
import TextField from '~/components/carcovers/TextField';

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

export async function action_backup({ request, context }: ActionFunctionArgs) {
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
  const { customer } = useOutletContext<{ customer: CustomerFragment }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useRef<HTMLFormElement>()

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveModal = (event: React.FormEvent) => {
    
  }

  function ProfileEditModal() {
    const [firstName, setFirstName] = useState(customer.firstName)
    const [lastName, setLastName] = useState(customer.lastName)
    const email = customer.emailAddress.emailAddress
    return (
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Edit profile" onSave={handleSaveModal}>
        <Form method="PUT" ref={form}>
          <div className='flex flex-col gap-[15px]'>
            <div className='grid grid-cols-1 gap-[15px] lg:grid-cols-2'>
              <TextField value={firstName} id='first_name' onChange={setFirstName} label='First name' placeholder='First name'></TextField>
              <TextField value={lastName} id='last_name' onChange={setLastName} label='Last name' placeholder='Last name'></TextField>
            </div>
            <div>
              <TextField disabled={true} value={email} id='email' onChange={setLastName} label='Email' placeholder='Email'></TextField>
              <div className='mt-[5px] text-[12px] text-[#707070]'>Email used for login can't be changed</div>
            </div>
          </div>
          <input type='hidden' name='action' value={'profile_edit_save'} />
        </Form>
      </Modal>
    )
  }

  return (
    <div>
      <div className='rounded-[10px] bg-white p-[21px] text-[14px]'>
        <h2 className='flex items-center gap-[10px] text-[16px]'><span>{customer.firstName} {customer.lastName}</span><div>
          <button onClick={handleOpenModal}>
            <EditIcon className='text-primary' />
          </button>
        </div></h2>
        <div className='mt-[25px]'>
          Email<br />
          {customer.emailAddress.emailAddress}
        </div>
      </div>
      <ProfileEditModal />
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
            <AddressItem address={address}></AddressItem>
          ))}
        </div>
      </div>
    </div>
  )
}

function AddressItem({ className, address }: { className?: string, address?: any }) {
  console.log('address', address)
  return (
    <div className='text-[14px] after:block after:content-[""]'>
      <div className='flex items-center gap-[10px]'><span>{address.firstName} {address.lastName}</span><div>
        <button>
          <EditIcon className='text-primary' />
        </button>
      </div></div>

      <div className='mt-[10px]'>
        {address.formatted.map(item => <>{item}<br /></>)}
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
