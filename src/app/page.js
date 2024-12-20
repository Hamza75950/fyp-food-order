
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";



export default function Home() {
  return (
    <>
    
      
      <Hero/>
      <HomeMenu/>
      <section className=" text-center my-16" id="about">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About Us"}/>

        {/* <SectionHeaders subHeader={"Our Story"} mainHeader={"About Us"} /> */}

        <div className="max-w-md mx-auto mt-4 text-gray-500 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum
          </p>
        </div>
      </section>

      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={"Don't Hesitate"}
          mainHeader={"Contact Us"}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+111222333">
            +111 222 333
          </a>
        </div>
      </section>

      
    </>
  );
}