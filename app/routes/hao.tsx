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

const FRAGMENT_COLLECTION_CARD = `#graphql
    fragment CollectionCard on Collection {
        id
        title
        metafields(
        identifiers: [
            { key: "level_1", namespace: "cat_filter" }
            { key: "level_1_url", namespace: "cat_filter" }
            { key: "level_2", namespace: "cat_filter" }
            { key: "level_2_url", namespace: "cat_filter" }
            { key: "level_3", namespace: "cat_filter" }
            { key: "level_3_url", namespace: "cat_filter" }
            { key: "level_4", namespace: "cat_filter" }
            { key: "level_4_url", namespace: "cat_filter" }
            { key: "level_5", namespace: "cat_filter" }
            { key: "level_5_url", namespace: "cat_filter" }
        ]
        ) {
        value
        }
    } 
`

const GET_COLLECTIONS = `#graphql
    query GetCollections($after: String = null) {
    collections(first: 250, after: $after) {
        edges {
            cursor
            node {
                ...CollectionCard
            }
        }
        pageInfo {
            hasNextPage
        }
    }
    }
    ${FRAGMENT_COLLECTION_CARD}
`

type CollectionInfo = {
    id: string;
    title: string;

    level_1?: string;
    level_2?: string;
    level_3?: string;
    level_4?: string;
    level_5?: string;

    level_1_url?: string;
    level_2_url?: string;
    level_3_url?: string;
    level_4_url?: string;
    level_5_url?: string;
}

// Corrected loadCollections function
const loadCollections = async (storefront: any, allCollections: CollectionInfo[], after?: string): Promise<void> => {
    console.log('after:', after);

    // Adjust the query to possibly include 'after'
    const result = await storefront.query(GET_COLLECTIONS, {
        variables: {
            after: after || null,
        },
        cache: storefront.CacheLong()
    });

    // Iterate over the result and build CollectionInfo objects
    for (const collection of result.collections.edges) {
        let info: CollectionInfo = {
            id: collection.node.id,
            title: collection.node.title,
        };

        if (collection.node.metafields[0]) {
            info.level_1 = collection.node.metafields[0].value
        }
        if (collection.node.metafields[1]) {
            info.level_1_url = collection.node.metafields[1].value
        }
        if (collection.node.metafields[2]) {
            info.level_2 = collection.node.metafields[2].value
        }
        if (collection.node.metafields[3]) {
            info.level_2_url = collection.node.metafields[3].value
        }
        if (collection.node.metafields[4]) {
            info.level_3 = collection.node.metafields[4].value
        }
        if (collection.node.metafields[5]) {
            if (!info.level_3) {
                info.level_3 = collection.node.metafields[5].value
            }
            info.level_3_url = collection.node.metafields[5].value
        }
        if (collection.node.metafields[6]) {
            info.level_4 = collection.node.metafields[6].value
        }
        if (collection.node.metafields[7]) {
            info.level_4_url = collection.node.metafields[7].value
        }
        if (collection.node.metafields[8]) {
            info.level_5 = collection.node.metafields[8].value
        }
        if (collection.node.metafields[9]) {
            info.level_5_url = collection.node.metafields[9].value
        }

        // Push each collection info object to the allCollections array
        allCollections.push(info);
    }

    if (result.collections.pageInfo.hasNextPage) {
        const nextAfter: string = result.collections.edges[result.collections.edges.length - 1].cursor;
        await loadCollections(storefront, allCollections, nextAfter)
    }
};

export const loader = async ({ context }: LoaderFunctionArgs) => {
    const { storefront } = context
    const data = await storefront.query(GET_MENU, {
        variables: {
            handle: "footer"
        },
        cache: storefront.CacheLong()
    })

    let allCollections: CollectionInfo[] = [];
    await loadCollections(storefront, allCollections, "eyJsYXN0X2lkIjoyNzk1ODA1NzM3ODYsImxhc3RfdmFsdWUiOjI3OTU4MDU3Mzc4Nn0=")

    console.log('collections')
    console.log(JSON.stringify(allCollections))

    return data
}

export default function HaoPage() {
    return <div>Test</div>
}