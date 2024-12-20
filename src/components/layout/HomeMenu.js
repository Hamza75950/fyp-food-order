'use client'
import { useEffect, useState } from "react";
// import Image from "next/image";

import MenuItem from "../Menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu() {
  
  const [bestSellers ,setBestSeller]=useState([])
  useEffect(()=>{

    fetch('/api/menu-items').then(res =>{
      res.json().then(menuItems=>{        
        setBestSeller(menuItems.slice(-3))
      })
    })
  },[])
  
  return (
    <section>
      {/* <div className="absolute left-0 right-0 w-full justify-start ">
        <div className="  absolute left-0 -top-[70px] -z-10">
          <Image src={"/sallad1.png"} width={109} height={189} alt={"sallad"} />
        </div>
        <div className="h-48 absolute right-0 -top-[100px] -z-10">
          <Image  src={"/sallad2.png"} width={107} height={195} alt={"sallad"} />
        </div>
      </div> */}
      <div className="text-center mb-4">
        <SectionHeaders subHeader={'Check Out'} mainHeader={'Our Best Sellers'}/>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
      {bestSellers?.length>0 && bestSellers.map(item => (
        <MenuItem key={item._id} {...item}/>
      ))}
      </div>
    </section>
  );
}
