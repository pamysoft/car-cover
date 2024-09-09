import { useLoaderData } from "@remix-run/react"
import { LoaderFunctionArgs } from "@remix-run/server-runtime";

const GET_MENU = `#graphql 
    query GetTopMenus($handle: String!) {
        menu(handle: $handle) {
            items {
                title
                url
            }
        }
    }
`

export const loader = async ({ context }: LoaderFunctionArgs) => {
    const { storefront } = context
    const data = await storefront.query(GET_MENU, {
        variables: {
            handle: "footer"
        },
        cache: storefront.CacheLong()
    })
    return data
}

export default function HaoPage() {
    const house = {
        'phong': 'phong khach',
        'den': '8 bong'
    }
    let a: Pick<typeof house, 'phong' | 'den'> = {
        'phong': '8aaa',
        'den': 'test'
    }

    // a = house
    console.log('a===')
    console.log(a)

    const data = useLoaderData<typeof loader>();
    for (const item of data.menu.items) {
        console.log(item.title, item.url)
    }
    return <div>Test</div>
}