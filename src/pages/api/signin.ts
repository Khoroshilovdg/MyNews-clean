import { supabase } from "../../lib/supabase";
import type { APIRoute } from "astro";

// Для тестирования - GET запрос
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

// Основной POST запрос для входа
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return new Response("Требуется ввести email и пароль", { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  const { access_token, refresh_token } = data.session;
  cookies.set("sb-access-token", access_token, { path: "/" });
  cookies.set("sb-refresh-token", refresh_token, { path: "/" });
  
  return redirect("/dashboard");
};