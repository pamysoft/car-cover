// NOTE: https://shopify.dev/docs/api/customer/latest/mutations/customerAddressUpdate
export const UPDATE_ADDRESS_MUTATION = `#graphql
  mutation customerAddressUpdate(
    $address: CustomerAddressInput!
    $addressId: ID!
    $defaultAddress: Boolean
 ) {
    customerAddressUpdate(
      address: $address
      addressId: $addressId
      defaultAddress: $defaultAddress
    ) {
      customerAddress {
        id
      }
      userErrors {
        code
        field
        message
      }
    }
  }
` as const;

export const UPDATE_ADDRESS_MUTATION_WITHOUT_DEFAULT = `#graphql
  mutation customerAddressUpdateWithoutDefault(
    $address: CustomerAddressInput!
    $addressId: ID!
 ) {
    customerAddressUpdate(
      address: $address
      addressId: $addressId
    ) {
      customerAddress {
        id
      }
      userErrors {
        code
        field
        message
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/customer/latest/mutations/customerAddressDelete
export const DELETE_ADDRESS_MUTATION = `#graphql
  mutation customerAddressDelete(
    $addressId: ID!,
  ) {
    customerAddressDelete(addressId: $addressId) {
      deletedAddressId
      userErrors {
        code
        field
        message
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/customer/latest/mutations/customerAddressCreate
export const CREATE_ADDRESS_MUTATION = `#graphql
  mutation customerAddressCreate(
    $address: CustomerAddressInput!
    $defaultAddress: Boolean
  ) {
    customerAddressCreate(
      address: $address
      defaultAddress: $defaultAddress
    ) {
      customerAddress {
        id
      }
      userErrors {
        code
        field
        message
      }
    }
  }
` as const;
