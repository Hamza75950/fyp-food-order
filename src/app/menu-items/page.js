"use client";
import { useProfile } from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function MenuItemPage() {
  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = useProfile();
  useEffect(() => {
    fetch("/api/menu-items").then(res => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "Loading User Info...";
  }
  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button flex" href={"/menu-items/new"}>
          Create new menu item <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu Item:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link key={item._id} href={"/menu-items/edit/" + item._id} 
              className="bg-gray-200 rounded-lg p-4">
                <div className="relative " >
                  <Image className="rounded-md" src={item.image} alt={''} width={200} height={200}/>
                </div>
                <div className="text-center">
                  {item.name}
                </div>
              </Link>
          ))}

        </div>

      </div>
    </section>
  );
}
