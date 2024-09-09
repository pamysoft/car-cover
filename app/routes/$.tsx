import { useLoaderData } from '@remix-run/react';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({request}: LoaderFunctionArgs) {
  // throw new Response(`${new URL(request.url).pathname} not found`, {
  //   status: 404,
  // });
  const url = new URL(request.url).pathname
  return url
}

export default function CatchAllPage() {  
  const url = useLoaderData<typeof loader>();
  return (<div>This is filter page: {url}</div>)
}
