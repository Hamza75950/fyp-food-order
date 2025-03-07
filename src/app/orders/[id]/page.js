// "use client";
// import { CartContext, cartProductPrice } from "@/components/AppContext";
// import AddressInputs from "@/components/layout/AddressInputs";
// import SectionHeaders from "@/components/layout/SectionHeaders";
// import { useParams } from "next/navigation";
// import { useContext, useEffect ,useState} from "react";
// import CartProduct from "../../../components/Menu/CartProduct";

// export default function OrderPage() {
//     const {clearCart}= useContext(CartContext)
//     const [order,setOrder]=useState()
//     const [loadingOrders, setLoadingOrders] = useState(true);
//     const {id} = useParams();

//     useEffect(()=>{
//         if(typeof window.console !== 'undefined'){
//             if(window.location.href.includes('clear-cart=1')){
//                 clearCart();
//             }
//         }
//         if(id){
//             setLoadingOrders(true);
//             fetch('/api/orders?_id='+id).then(res=>{
//                 res.json().then(orderData=>{
//                     setOrder(orderData)
//                     setLoadingOrders(false)

//                 })
//             })
//         }

//     },[])

//     let subtotal = 0
//     if(order?.cartProducts){
//         for(const product of order.cartProducts){
//             subtotal += cartProductPrice(product);
//         }
//     }
//     return(
//     <section className="max-w-2xl mx-auto text-center mt-8">
//         <SectionHeaders mainHeader= "Your Order"/>
//         <div className='text-center'>
//         <div className="mt-4 mb-8">
//         <p>Thanks for your order.</p>
//         <p>we will call you when your order will be on the way.</p>

//         </div>

//         </div>
//         {loadingOrders && (<div>Loading order...</div>)}
//         {order&&(
//             <div className="flex flex-col md:flex-row md:gap-16 gap-8">
//                 <div>
//                     {order?.cartProducts.map(product=>(
//                         <CartProduct key={product._id} product = {product}/>
//                     ))}
//                     <div className="text-right py-2 text-gray-500">
//                     Subtotal :
//                     <span className="text-black font-bold inline-block w-16"> Rs {subtotal}</span> <br/>
//                         Delivery :
//                         <span className="text-black font-bold inline-block w-16"> Rs 150</span> <br/>
//                         Total :
//                         <span className="text-black font-bold inline-block w-16"> Rs {subtotal + 150}</span> <br/>
//                     </div>
//                 </div>
//                 <div>
//                     <div className="bg-gray-100 p-4 rounded-lg">
//                         <AddressInputs disabled={true} addressProps = {...order}/>
//                     </div>
//                 </div>

//             </div>
//         )}

//     </section>

//     )
// }

"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import CartProduct from "../../../components/Menu/CartProduct";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState();
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrders(true);
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
          setLoadingOrders(false);
        });
      });
    }
  }, [id]);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <section className="max-w-2xl mx-auto text-center mt-8">
      <SectionHeaders mainHeader="Your Order" />
      <div className="text-center">
        <div className="mt-4 mb-8">
          <p>Thanks for your order.</p>
          <p>We will call you when your order is on the way.</p>
        </div>
      </div>
      {loadingOrders && <div>Loading order...</div>}
      {order && (
        <div className="flex flex-col md:flex-row md:gap-16 gap-8">
          <div>
            {order?.cartProducts.map((product) => (
              <CartProduct key={product._id} product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Subtotal:
              <span className="text-black font-bold inline-block w-16">
                {" "}
                Rs {subtotal}
              </span>{" "}
              <br />
              Delivery:
              <span className="text-black font-bold inline-block w-16">
                {" "}
                Rs 150
              </span>{" "}
              <br />
              Total:
              <span className="text-black font-bold inline-block w-16">
                {" "}
                Rs {subtotal + 150}
              </span>{" "}
              <br />
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs disabled={true} addressProps={{ ...order }} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
