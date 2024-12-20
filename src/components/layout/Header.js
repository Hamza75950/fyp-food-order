"use client";
import { CartContext } from "../AppContext";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import ShoppingCart from "@/components/icons/ShoppingCart";
import Hamburger from "@/components/icons/Hamburger";

function AuthLinks({ status, userName }) {
  if (status === "authenticated") {
    return (
      <>
        <Link href={"/profile"} className="whitespace-nowrap">
          {" "}
          Hello, {userName}{" "}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Logout
        </button>
      </>
    );
  } else {
    return (
      <>
        <Link href={"/login"}> Login </Link>
        <Link
          href={"/register"}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Register
        </Link>
      </>
    );
  }
}
export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  return (
    <header>
      <div className="flex md:hidden justify-between items-center">
        <Link
          className="flex gap-2 items-center  text-primary font-semibold text-2xl"
          href={"/"}
        >
          <div>
            <Image
              src={"/pizzaicon.png"}
              width={50}
              height={50}
              alt={"pizza"}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
            />
          </div>
          <div className="mt-2">Pizzeria</div>

          {/* layout={'fill'} objectFit={'contain'} */}
        </Link>
        <div className="flex items-center gap-4">
          <Link className="relative mr-2" href={"/cart"}>
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span
                className="absolute -top-2 -right-4 bg-primary text-white text-xs
    py-1 px-1 rounded-full leading-3"
              >
                {cartProducts.length}
              </span>
            )}
          </Link>

          <button className="p-2 border-0" onClick={() => setMobileNavOpen(prev => !prev)}>
            <Hamburger />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div onClick={() => setMobileNavOpen(false)} className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col text-center gap-2">
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
        
      )}
      <div className="md:flex items-center justify-between hidden ">
        <nav className="flex items-center  gap-8 text-gray-500 font-semibold">
          <Link
            className="flex gap-2  text-primary font-semibold text-2xl"
            href={"/"}
          >
            <div>
              <Image
                src={"/pizzaicon.png"}
                height={50}
                width={50}
                alt={"pizza"}
              />
            </div>
            <div className="mt-2">Pizzeria</div>

            {/* layout={'fill'} objectFit={'contain'} */}
          </Link>
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} userName={userName} />
          <Link className="relative" href={"/cart"}>
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span
                className="absolute -top-2 -right-4 bg-primary text-white text-xs
  py-1 px-1 rounded-full leading-3"
              >
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
