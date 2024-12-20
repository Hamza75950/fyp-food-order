"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import { useProfile } from "@/components/UseProfile";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CartProduct from "../../components/Menu/CartProduct";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, SetAddress] = useState({});
  const { data: profileData } = useProfile();
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, postalCode, city, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        postalCode,
        city,
        country,
      };
      SetAddress(addressFromProfile);
    }
  }, [profileData]);

  let subTotal = 0;
  for (const p of cartProducts) {
    subTotal += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    SetAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();

    // Prepare address and cart products for the request body
    const requestData = {
      address,
      cartProducts,
    };

    // Create a promise for the toast feedback
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          const data = await response.json(); // Expecting { url: 'Stripe URL' } in response
          if (data.url) {
            resolve(); // Indicate success for the toast
            window.location = data.url; // Redirect to Stripe Checkout
          } else {
            reject(new Error("Invalid response format")); // Trigger error toast
          }
        } else {
          reject(new Error(`HTTP Error: ${response.status}`)); // Trigger error toast
        }
      } catch (error) {
        reject(error); // Handle fetch or parsing errors
      }
    });

    // Display toast notifications
    await toast.promise(promise, {
      loading: "Preparing your order...",
      success: "Redirecting to payment...",
      error: "Something went wrong... Please try again later.",
    });
  }

  // async function proceedToCheckout(ev) {
  //   ev.preventDefault();

  //   try {
  //     const response = await fetch('/api/checkout', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         address,
  //         cartProducts,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json(); // Make sure the API sends { url: stripeSession.url }
  //     if (data.url) {
  //       window.location.href = data.url; // Redirect to Stripe Checkout
  //     } else {
  //       console.error("Invalid response data", data);
  //       alert("Failed to proceed to checkout. Please try again.");
  //     }
  //     await toast.promise(promise, {
  //       loading: 'Preparing your order...',
  //       success: 'Redirecting to payment...',
  //       error: 'Something went wrong... Please try again later',
  //     })
  //   } catch (error) {
  //     console.error("Error during checkout:", error);
  //     alert("Something went wrong. Please try again.");
  //   }
  // }

  // async function proceedToCheckout(ev) {
  //   ev.preventDefault();

  //   try {
  //     const response = await fetch('/api/checkout', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         address,
  //         cartProducts,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     if (data.link) {
  //       window.location = data.link; // Redirect to Stripe
  //     } else {
  //       console.error("Invalid response data", data);
  //     }
  //   } catch (error) {
  //     console.error("Error during checkout:", error);
  //     alert("Something went wrong. Please try again.");
  //   }
  // }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your Shopping Cart is empty</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className=" mt-8 flex gap-4 md:flex-row flex-col">
        <div>
          {cartProducts?.length === 0 && <div>No product in Shopping cart</div>}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => <CartProduct key={index} product = {product} index = {index} onRemove = {removeCartProduct} />)}
          <div className="py-2 text-right pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal: <br />
              Delivery: <br />
              Total:
            </div>

            <div className=" font-semibold pl-2 text-right">
              Rs{subTotal} <br />
              Rs 150 <br />
              Rs {subTotal + 150}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type="submit"> Pay Rs{subTotal + 150}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
