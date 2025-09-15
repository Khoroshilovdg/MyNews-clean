import { supabase } from "../../lib/supabase";
import type { APIRoute } from "astro";

//  function that handles HTTP GET requests to the /api/register route; for testing. go to http://localhost:4321/api/register, will receive response in JSON format that API endpoint is working and ready to accept POST requests
export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
    message: "Register API endpoint is working!",
    methods: ["POST"]
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

// function processes HTTP POST requests to /api/register, { request, redirect } destructuring of object that Astro provides for API routes, 'request' contains data of the incoming request, 'redirect' allows to redirect the user to another page
export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  //receives data sent from an HTML form. Retrieves the value of the field named email and password from the form data ?.toString() safely converts it to a string
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return new Response("Email and password required", { status: 400 }); //Data validation. If one of the fields is empty, API returns error with HTTP status 400 (Bad Request)
  }
//method, uses the Supabase client's signUp method to create new user account in database, email and password are data obtained from the form
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });
//If Supabase returns error, API returns response with error and message
  if (error) {
    return new Response(error.message, { status: 500 });
  }
//If registration was successful, redirects user to the login page (/signin)
  return redirect("/signin");
};