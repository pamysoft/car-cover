import { CustomerAddressInput } from "@shopify/hydrogen/customer-account-api-types";
import { ActionFunctionArgs, json } from "@shopify/remix-oxygen";
import { CREATE_ADDRESS_MUTATION, DELETE_ADDRESS_MUTATION, UPDATE_ADDRESS_MUTATION, UPDATE_ADDRESS_MUTATION_WITHOUT_DEFAULT } from "~/graphql/customer-account/CustomerAddressMutations";

export async function action({ request, context }: ActionFunctionArgs) {
    const { customerAccount } = context;

    try {
        const form = await request.formData();
        const addressId = form.has('addressId')
            ? String(form.get('addressId'))
            : null;
        if (!addressId) {
            throw new Error('You must provide an address id.');
        }

        // this will ensure redirecting to login never happen for mutatation
        const isLoggedIn = await customerAccount.isLoggedIn();
        if (!isLoggedIn) {
            return json(
                { error: { [addressId]: 'Unauthorized' } },
                {
                    status: 401,
                },
            );
        }

        const defaultAddress = form.has('defaultAddress')
            ? String(form.get('defaultAddress')) === 'on'
            : false;
        const address: CustomerAddressInput = {};
        const keys: (keyof CustomerAddressInput)[] = [
            'address1',
            'address2',
            'city',
            'company',
            'territoryCode',
            'firstName',
            'lastName',
            'phoneNumber',
            'zoneCode',
            'zip',
        ];

        for (const key of keys) {
            const value = form.get(key);
            if (typeof value === 'string') {
                address[key] = value;
            }
        }

        console.log('request.method:', request.method)
        switch (request.method) {
            case 'POST': {
                // handle new address creation
                try {
                    const { data, errors } = await customerAccount.mutate(
                        CREATE_ADDRESS_MUTATION,
                        {
                            variables: { address, defaultAddress },
                        },
                    );

                    if (errors?.length) {
                        throw new Error(errors[0].message);
                    }

                    if (data?.customerAddressCreate?.userErrors?.length) {
                        throw new Error(data?.customerAddressCreate?.userErrors[0].message);
                    }

                    if (!data?.customerAddressCreate?.customerAddress) {
                        throw new Error('Customer address create failed.');
                    }

                    return json({
                        error: null,
                        createdAddress: data?.customerAddressCreate?.customerAddress,
                        defaultAddress,
                    });
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        return json(
                            { error: { [addressId]: error.message } },
                            {
                                status: 400,
                            },
                        );
                    }
                    return json(
                        { error: { [addressId]: error } },
                        {
                            status: 400,
                        },
                    );
                }
            }

            case 'PUT': {
                // handle address updates
                console.log('addressId', addressId)
                console.log('address', address)
                try {
                    const { data, errors } = (defaultAddress) ? await customerAccount.mutate(
                        UPDATE_ADDRESS_MUTATION,
                        {
                            variables: {
                                address,
                                addressId: decodeURIComponent(addressId),
                                defaultAddress,
                            },
                        },
                    ):  await customerAccount.mutate(
                        UPDATE_ADDRESS_MUTATION_WITHOUT_DEFAULT,
                        {
                            variables: {
                                address,
                                addressId: decodeURIComponent(addressId),
                            },
                        },
                    );

                    if (errors?.length) {
                        throw new Error(errors[0].message);
                    }

                    if (data?.customerAddressUpdate?.userErrors?.length) {
                        throw new Error(data?.customerAddressUpdate?.userErrors[0].message);
                    }

                    if (!data?.customerAddressUpdate?.customerAddress) {
                        throw new Error('Customer address update failed.');
                    }

                    return json({
                        error: null,
                        updatedAddress: address,
                        defaultAddress,
                    });
                } catch (error: unknown) {
                    console.log('error:', JSON.stringify(error))
                    if (error instanceof Error) {
                        return json(
                            { error: { [addressId]: error.message } },
                            {
                                status: 400,
                            },
                        );
                    }
                    return json(
                        { error: { [addressId]: error } },
                        {
                            status: 400,
                        },
                    );
                }
            }

            case 'DELETE': {
                // handles address deletion
                try {
                    const { data, errors } = await customerAccount.mutate(
                        DELETE_ADDRESS_MUTATION,
                        {
                            variables: { addressId: decodeURIComponent(addressId) },
                        },
                    );

                    if (errors?.length) {
                        throw new Error(errors[0].message);
                    }

                    if (data?.customerAddressDelete?.userErrors?.length) {
                        throw new Error(data?.customerAddressDelete?.userErrors[0].message);
                    }

                    if (!data?.customerAddressDelete?.deletedAddressId) {
                        throw new Error('Customer address delete failed.');
                    }

                    return json({ error: null, deletedAddress: addressId });
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        return json(
                            { error: { [addressId]: error.message } },
                            {
                                status: 400,
                            },
                        );
                    }
                    return json(
                        { error: { [addressId]: error } },
                        {
                            status: 400,
                        },
                    );
                }
            }

            default: {
                return json(
                    { error: { [addressId]: 'Method not allowed' } },
                    {
                        status: 405,
                    },
                );
            }
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return json(
                { error: error.message },
                {
                    status: 400,
                },
            );
        }
        return json(
            { error },
            {
                status: 400,
            },
        );
    }
}

