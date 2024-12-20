"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { redirect } from "next/dist/server/api-utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handelFormSubmit(ev) {
    ev.preventDefault();

    setLoginInProgress(true);
    await signIn('credentials', { email, password, callbackUrl:'/'});
    // const response = await signIn("credentials", { email, password });
    setLoginInProgress(false);

    if(response.ok){
      return redirect('/')
    }
  }

  return (
    <section className="mt-8">
      <h1 className=" mb-4 text-center text-primary text-4xl">Login</h1>
      <form className="max-w-xs mx-auto" onSubmit={handelFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          disabled={loginInProgress}
          onChange={(ev) => setEmail(ev.target.value)}
        />

        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          disabled={loginInProgress}
          onChange={(ev) => setPassword(ev.target.value)}
        />

        <button disabled={loginInProgress} type="submit">
          Login
        </button>

        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center"
        >
          <Image src={"/google.png"} alt={""} width={"24"} height={"24"} />
          Login with Google
        </button>
      </form>
    </section>
  );
}
