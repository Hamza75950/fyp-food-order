'use client'
import { useEffect, useState } from "react"
import SectionHeaders from "../../components/layout/SectionHeaders";
import MenuItem from "@/components/Menu/MenuItem";

export default function MenuPage(){

    const [catagories,setCatagories]=useState([]);
    const [menuItems,setMenuItems]=useState([]);


    useEffect(()=>{
        fetch('/api/catagories').then(res => {
            res.json().then(catagories => setCatagories(catagories)) 
        })
        fetch('/api/menu-items').then(res =>{
            res.json().then(menuItems=> setMenuItems(menuItems));
        })
    },[])

    return(
        <section className="mt-8">
            {
                catagories?.length > 0 && catagories.map(c => (
                    <div key={c._id}>
                        <div className="text-center">
                            <SectionHeaders mainHeader={c.name}/>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
                            {menuItems.filter(item => item.catagory === c._id).map(item => (
                                <MenuItem key={item._id} {...item}/>
                            ))}

                        </div>
                    </div>
                ))
            }
        </section>
    )
}