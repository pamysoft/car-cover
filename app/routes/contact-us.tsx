import { Form, useActionData, useFetcher } from "@remix-run/react";
import { ActionFunctionArgs, json, redirect } from "@remix-run/server-runtime";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useProxyUrl } from "~/components/common/PageWrapper";
import TextField from "~/components/common/TextField";
import TextareaField from "~/components/common/TextareaField"; // Import the TextareaField component
import { sendContact } from "~/lib/functions";
import { ResponseResult } from '~lib/type'

// Action function to handle form submission
export async function action({ context, request }: ActionFunctionArgs) {
  // Extract form data
  const proxyUrl = context.env.PROXY_URL;
  const payload = await request.formData();

  const response = await sendContact(proxyUrl, payload);

  return json(response, { status: 200 });
}

export default function ContactUs() {
  const [name, setName] = useState(""); // Updated to 'name'
  const [email, setEmail] = useState(""); // Updated to 'email'
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState(""); // State for the comment
  const actionData = useActionData(); // Get action data for error handling  
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null);
  const fetcher = useFetcher<ResponseResult>();
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    console.log(fetcher.state)
    setIsLoading(fetcher.state == 'submitting')
  }, [fetcher.state]);

  useEffect(() => {
    const responseData = fetcher.data
    if (responseData) {
      setIsSuccess(responseData.success)
      setMessage(responseData.message)
    } else {
      setIsSuccess(false)
      setMessage('')
    }
  }, [fetcher.data])


  return (
    <div className="m-auto w-[726px] max-w-full pb-[100px]">
      <h1 className="text-[52px]">Contact</h1>
      <div className="mt-[50px]">
        {message && <>
          <div className={'mb-[15px] text-[14px] font-medium' + ' ' + ((isSuccess == true) ? 'text-green-900' : 'text-primary')}>{message}</div>
        </>}
        <fetcher.Form ref={formRef} method="post" action="" className="w-full max-w-none">
          <div className="flex flex-col gap-[20px]">
            <div className="grid grid-cols-1 gap-[15px] lg:grid-cols-2">
              {/* Name Field */}
              <TextField
                value={name}
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                label="Name"
                placeholder="Name"
              />

              {/* Email Field */}
              <TextField
                value={email}
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                label="Email *"
                placeholder="Email *"
                type="email" // Set input type to email
              />
            </div>

            {/* Phone Field */}
            <TextField
              value={phone}
              id="phone"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              label="Phone"
              placeholder="Phone"
            />

            {/* Comment Textarea Field */}
            <TextareaField
              value={comment}
              id="comment"
              name="comment"
              onChange={(e) => setComment(e.target.value)}
              label="Comment"
              placeholder="Your comment"
              rows={6} // Optional: specify rows for textarea
            />

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="mt-[20px] min-h-[45px] w-[120px] rounded bg-primary py-2 text-white"
              >
                {
                  isLoading ? 'Sending...' : 'Send'
                }
              </button>
            </div>
          </div>

          {/* Error Handling */}
          {actionData?.error && (
            <p className="mt-4 text-red-500">{actionData.error}</p>
          )}
        </fetcher.Form>
      </div>
    </div>
  );
}
