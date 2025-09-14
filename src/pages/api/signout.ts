import type { APIRoute } from "astro";

// GET запрос для выхода
export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });
  
  return redirect("/signin");
};

// POST запрос для выхода (альтернативный метод)
export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });
  
  return redirect("/signin");
};