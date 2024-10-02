import { Form, useActionData } from "@remix-run/react";
import { ActionFunctionArgs, json, redirect } from "@remix-run/server-runtime";
import { useState } from "react";
import TextField from "~/components/carcovers/TextField";
import TextareaField from "~/components/carcovers/TextareaField"; // Import the TextareaField component
import { sendContact } from "~/lib/functions";

// Action function to handle form submission
export async function action({ request }: ActionFunctionArgs) {
  // Extract form data
  const proxyUrl = context.env.PROXY_URL;
  const payload = await request.formData();

  

  try {
    // Send data to external API
    const response = await sendContact(proxyUrl, payload)
    console.log('response: ',response);
    if (!response.ok) {
      throw new Error("Failed to submit form.");
    }

    // Redirect or return a success message if the submission is successful
    return redirect("/thank-you");
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}

export default function ContactUs() {
  const [name, setName] = useState(""); // Updated to 'name'
  const [email, setEmail] = useState(""); // Updated to 'email'
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState(""); // State for the comment
  const actionData = useActionData(); // Get action data for error handling

  return (
    <div className="m-auto w-[726px] max-w-full pb-[100px]">
      <h1 className="text-[52px]">Contact</h1>
      <div className="mt-[50px]">
        <Form method="post" className="w-full max-w-none">
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
                Send
              </button>
            </div>
          </div>

          {/* Error Handling */}
          {actionData?.error && (
            <p className="mt-4 text-red-500">{actionData.error}</p>
          )}
        </Form>
      </div>
    </div>
  );
}
