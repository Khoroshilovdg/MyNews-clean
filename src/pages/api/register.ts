import { supabase } from "../../lib/supabase";
import type { APIRoute } from "astro";

// Для тестирования - GET запрос
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

// Основной POST запрос для регистрации
export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return new Response("Требуется ввести email и пароль", { status: 400 });
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect("/signin");
};