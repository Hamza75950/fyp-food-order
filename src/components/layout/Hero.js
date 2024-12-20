"use client";
import Image from "next/image";
import Right from "../icons/Right";
import Link from "next/link";

//animation
import { useEffect, useState } from "react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger the animation when the component is mounted (page is loaded)
    setIsLoaded(true);
  }, []);

  return (
    <section className="hero mt-4">
      <div className="lg:py-12 py-8 text-center lg:text-left ">
        <h1 className="text-4xl font-semibold ">
          Everything <br />
          is better <br />
          with a&nbsp;
          <span className="text-primary ">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Pizza is the missing piece that make every day complete, a simple yet
          delicious jot in life.
        </p>
        <div className="flex flex-col md:flex-row gap-2 text-sm">
          <Link
            style={{ color: "white" }}
            className="justify-center button bg-primary text-white uppercase flex gap-2 px-4 py-2 rounded-full items-center "
            href={"/menu"}
          >
            Order Now
            <Right />
          </Link>
          {/* <button href={"/menu"} className=" justify-center bg-primary text-white uppercase flex gap-2 px-4 py-2 rounded-full items-center ">
            Order Now
            <Right />
          </button> */}

          <Link
            className="flex button items-center gap-2 border-0 px-2 text-gray-600 font-semibold  py-2"
            href={"#about"}
          >
            Learn More
            <Right />
          </Link>
        </div>
      </div>
      {/* <div className="relative">

            <Image src={'/pizza.png'} layout={'fill'} objectFit={'contain'} alt={'pizza'}/>
           </div> */}

      <div className={`relative hidden md:block ${isLoaded ? "combined-animation" : ""}`}>
        <Image
          src={"/pizza.png"}
          layout={"fill"}
          objectFit={"contain"}
          alt={"pizza"}
        />
      </div>
    </section>
  );
}
