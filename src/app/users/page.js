// "use client";
// import { useProfile } from "@/components/UseProfile";
// import UserTabs from "@/components/layout/UserTabs";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function UserPage() {
//   const [users, setUsers] = useState([]);
//   const { loading, data } = useProfile();

//   useEffect(() => {
//     fetch("/api/users").then((response) => {
//       response.json().then((users) => {
//         setUsers(users);
//       });
//     });
//   }, []);

//   if (loading) {
//     return "Loading User Info...";
//   }

//   if (!data.admin) {
//     return "Not an admin";
//   }
//   return (
//     <section className="max-w-2xl mx-auto mt-8">
//       <UserTabs isAdmin={true} />
//       <div className="mt-8">
//         {users?.length > 0 &&
//           users.map((user) => (
//             <div
//               className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex
//                  items-center gap-4"
//             >
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
//                 <div className="text-gray-900">
//                   {!!user.name && <span>{user.name}</span>}
//                   {!user.name && <span className="italic">No Name</span>}
//                 </div>

//                 <span className="text-gray-500">{user.email}</span>
//               </div>
//               <div>
//                 <Link className="button" href={"/users/" + user._id}>
//                   Edit
//                 </Link>
//               </div>
//             </div>
//           ))}
//       </div>
//     </section>
//   );
// }

"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const { loading, data } = useProfile();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }
        const users = await response.json();
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading || loadingUsers) {
    return "Loading User Info...";
  }

  if (!data?.admin) {
    return "Not an admin";
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 rounded-lg mb-2 p-4 flex items-center gap-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <div className="text-gray-900">
                  {user.name ? (
                    <span>{user.name}</span>
                  ) : (
                    <span className="italic">No Name</span>
                  )}
                </div>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div>
                <Link
                  className="button bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:outline-none"
                  href={`/users/${user._id}`}
                >
                  Edit
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No users found.</p>
        )}
      </div>
    </section>
  );
}
