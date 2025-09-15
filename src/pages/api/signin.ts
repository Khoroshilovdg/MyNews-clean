import { supabase } from "../../lib/supabase";
import type { APIRoute } from "astro";

//  function that handles HTTP GET requests to the /api/signin route; for testing. go to http://localhost:4321/api/signin, will receive response in JSON format that API endpoint is working and ready to accept POST requests
export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
    message: "Signin API endpoint is working!",
    methods: ["POST"]
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

// function processes HTTP POST requests to /api/register, { request, redirect } destructuring of object that Astro provides for API routes, 'request' contains data of the incoming request, 'redirect' allows to redirect the user to another page
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  //receives data sent from an HTML form. Retrieves the value of the field named email and password from the form data ?.toString() safely converts it to a string
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return new Response("Email and password required", { status: 400 }); //Data validation. If one of the fields is empty, API returns error with HTTP status 400 (Bad Request)
  }
//method for authentication, Supabase attempts to authorize the user using the entered email and password, if Supabase returns an error the API returns error message
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }
 //If the login successful, Supabase returns session object containing access tokens (access_token) and refresh tokens (refresh_token)
  const { access_token, refresh_token } = data.session;
  //store tokens in cookie files, this allows Astro and Supabase to remember that the user is authorized
  cookies.set("sb-access-token", access_token, { path: "/" });
  cookies.set("sb-refresh-token", refresh_token, { path: "/" });
  // after successfully logging in, the user redirected to (/dashboard)
  return redirect("/dashboard");
};