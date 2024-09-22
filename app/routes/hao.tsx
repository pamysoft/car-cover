import { useLoaderData } from "@remix-run/react"
import { LoaderFunctionArgs } from "@remix-run/server-runtime";

export const loader = async ({ context }: LoaderFunctionArgs) => {
    console.log('process.env', context.env.PROXY_URL)
    return {'ok': 'Hoang Xuan Hao'}
}

export default function HaoPage() {
    return <div>Test</div>
}