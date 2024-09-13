import { useLoaderData } from "@remix-run/react"
import { LoaderFunctionArgs } from "@remix-run/server-runtime";
// import { PrismaClient } from '@prisma/client'
// ​import { Database } from 'sqlite3';



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

    // console.log(Database)

    // const db = await open({
    //     filename: './prisma/data.db',
    //     driver: sqlite3.Database,
    //   })
    

    // console.log(PrismaClient)

    // let year = await prisma.year.findFirst()
    // const prisma = new PrismaClient()
    // const users = await prisma.year.findMany()
    // console.log('year')
    // console.log(year)
    // console.log(users)

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