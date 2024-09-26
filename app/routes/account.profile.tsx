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
  useFetcher,
  useNavigation,
  useOutletContext,
  type MetaFunction,
} from '@remix-run/react';
import EditIcon from '~/components/carcovers/icons/EditIcon';
import Modal from '~/components/carcovers/Modal';
import { useEffect, useRef, useState } from 'react';
import TextField from '~/components/carcovers/TextField';
import { Addresses } from '../components/carcovers/Addresses';


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
  console.log('form', form)

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
  const fetcher = useFetcher();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function submitHandler(e: FormEvent) {
    e.preventDefault();
  }

  const handleSaveModal = async (event: React.FormEvent) => {
    const formData = new FormData(formRef.current!);
    // modify formData here

    fetcher.submit(formData, {
      method: "POST",
      action: "/account/profile/save_profile"
    });

  }

  useEffect(() => {
    if (fetcher.state === 'submitting') {
      setIsLoading(true)
    }
    if (fetcher.state === 'idle' && fetcher.data) {
      setIsModalOpen(false);
      const result = fetcher.data;
      console.log('result submitted:', result);
      setIsLoading(false);
    }
  }, [fetcher.state, fetcher.data]);


  function ProfileEditModal() {
    const [firstName, setFirstName] = useState(customer.firstName)
    const [lastName, setLastName] = useState(customer.lastName)
    const email = customer.emailAddress.emailAddress

    useEffect(() => {
      if (fetcher.state === 'idle' && fetcher.data?.customer) {
        // Update the state with the fetched customer data
        setFirstName(fetcher.data.customer.firstName);
        setLastName(fetcher.data.customer.lastName);
      }
    }, [fetcher.data])

    return (
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Edit profile">
        <Form method="post" ref={formRef} onSubmit={submitHandler} action='/account/profile/save_profile' className='max-w-none'>
          <div className='flex flex-col gap-[15px]'>
            <div className='grid grid-cols-1 gap-[15px] lg:grid-cols-2'>
              <TextField value={firstName} id='first_name' name='first_name' onChange={(e) => setFirstName(e.target.value)} label='First name' placeholder='First name'></TextField>
              <TextField value={lastName} id='last_name' name='last_name' onChange={(e) => setLastName(e.target.value)} label='Last name' placeholder='Last name'></TextField>
            </div>
            <div>
              <TextField disabled={true} value={email} id='email' label='Email' placeholder='Email'></TextField>
              <div className='mt-[5px] text-[12px] text-[#707070]'>Email used for login can't be changed</div>
            </div>
          </div>
          <input type='hidden' name='action' value={'save_profile'} />


        </Form>

        <div className="mt-4 flex justify-end space-x-4">
          {/* {showDeleteButton && onDelete && (
            <button
              onClick={onDelete}
              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Delete
            </button>
          )} */}
          <button
            onClick={handleCloseModal}
            className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveModal}
            className="rounded bg-accent px-4 py-2 text-white hover:bg-blue-600"
          >
            {isLoading ? 'Saving..' : 'Save'}
          </button>
        </div>
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
