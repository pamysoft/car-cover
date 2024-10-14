import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import { FETCH_PRODUCTS_QUERY } from '~/lib/fragments';

export async function loader({params, context}: LoaderFunctionArgs) {
    const products = await context.storefront.query(FETCH_PRODUCTS_QUERY, {
        variables: {
          ids: [`${params.productId}`]
        },
      })


    return json({
        product: products.nodes[0]
    })
}