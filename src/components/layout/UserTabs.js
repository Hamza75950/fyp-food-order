// 'use client';
// import Link from "next/link"
// import { usePathname } from "next/navigation"

// export default function UserTabs(isAdmin){
//     const path =  usePathname()
    
//     return(
//         <div className="flex mx-auto gap-2 tabs justify-center">
//         <Link 
//         className={path === '/profile' ? 'active' : ''} 
//         href={'/profile'}>
//             Profile
//             </Link>
//         {isAdmin && (
//           <>
//             <Link className={path === '/catagories' ? 'active' : ''}  href={'/catagories'}>Catagories</Link>
//             <Link className={path.includes('menu-items') ? 'active' : ''}  href={'/menu-items'}>Menu Items</Link>
//             <Link className={path === '/users' ? 'active' : ''}  href={'/users'}>Users</Link>
//             <Link className={path === '/orders' ? 'active' : ''}  href={'/orders'}>Orders</Link>


//           </>
//         )}
//       </div>
//     )
// }


'use client';
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function UserTabs({isAdmin}) {
  const path = usePathname();
  return (
    <div className="flex mx-auto gap-2 tabs justify-center flex-wrap">
      <Link
        className={path === '/profile' ? 'active' : ''}
        href={'/profile'}
      >
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            href={'/catagories'}
            className={path === '/catagories' ? 'active' : ''}
          >
            Categories
          </Link>
          <Link
            href={'/menu-items'}
            className={path.includes('menu-items') ? 'active' : ''}
          >
            Menu Items
          </Link>
          <Link
            className={path.includes('/users') ? 'active' : ''}
            href={'/users'}
          >
            Users
          </Link>


        </>
      )}
          <Link
            className={path === '/orders' ? 'active' : ''}
            href={'/orders'}
          >
            Orders
          </Link>
    </div>
  );
}