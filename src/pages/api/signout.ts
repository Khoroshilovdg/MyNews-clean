import type { APIRoute } from "astro";

// function processes HTTP GET requests to the route /api/signout
//Deletes cookie file “sb-access-token” contains access token, “/” ensures cookies deleted across entire site, 
export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });
  // after deleting cookies user redirected to the login page
  return redirect("/signin");
};

// function performs same logic but for HTTP POST requests
export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });
  
  return redirect("/signin");
};