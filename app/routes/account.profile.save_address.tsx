import { ActionFunctionArgs, json } from "@shopify/remix-oxygen";
import { CUSTOMER_UPDATE_MUTATION } from "~/graphql/customer-account/CustomerUpdateMutation";

export async function action({ request, context }: ActionFunctionArgs) {
    const { customerAccount } = context;
    const formData = await request.formData();
    
    console.log('Save account profile', formData);

    const firstName = formData.get('first_name');
    const lastName = formData.get('last_name');

    // Ensure firstName and lastName are available
    if (!firstName || !lastName) {
        return json({ error: 'Invalid input' }, { status: 400 });
    }

    try {
        // Perform your customer update mutation here
        const customerUpdateInput = { firstName, lastName };

        const { data, errors } = await customerAccount.mutate(
            CUSTOMER_UPDATE_MUTATION, 
            { variables: { customer: customerUpdateInput } }
        );

        if (errors?.length) {
            throw new Error(errors[0].message);
        }

        if (!data?.customerUpdate?.customer) {
            throw new Error('Customer profile update failed.');
        }

        return json({ 
            error: null, 
            customer: data.customerUpdate.customer 
        });
    } catch (error) {
        return json({ error: error.message }, { status: 500 });
    }
}
