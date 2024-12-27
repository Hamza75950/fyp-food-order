// import mongoose from "mongoose";
// import { getServerSession } from "next-auth";
// import {authOptions} from "@/app/api/auth/[...nextauth]/route";
// import {Order} from "../../models/Order";
// import {MenuItem} from "../../models/MenuItem";

// const stripe = require("stripe")(process.env.STRIPE_SK);
// export async function POST(req) {
//   mongoose.connect(process.env.MONGO_URL);
//   const { cartProducts, address } = await req.json();

//   const session = await getServerSession(authOptions);
//   const userEmail = session?.user?.email;

//   const orderDoc = await Order.create({
//     userEmail,
//     ...address,
//     cartProducts,
//     paid: false,
//   });

//   // const stripeLineItems = [];
//   // for (const cartProduct of cartProducts) {
//   //   // let productPrice = 0;
//   //   const productInfo = await MenuItem.findById(cartProduct._id);
//   //   let productPrice = productInfo.basePrice;
//   //   if(cartProduct.size){
//   //     const size = productInfo.sizes.find(size=>size._id.toString() === cartProduct.size._id.toString());
//   //     productPrice+=size.price; 
//   //   }
//   //   if(cartProduct.extras?.length >0 ){
//   //     for(const cartProductExtraThing of cartProduct.extras){
//   //      debugger
//   //       const productExtras = productInfo.extraIngredientsPrices
//   //      console.log('cartttttttttt'+ {productExtras})

//   //       // const extraThingInfo = productExtras.extraIngredientsPrices.find(e=>extraThingInfo._id.toString()=== extraThingInfo._id.toString());
//   //       // productPrice+=extraThingInfo.price;
//   //     }
//   //   }
//   //   const productName = cartProduct.name;
//   const stripeLineItems = [];
//   for (const cartProduct of cartProducts) {

//     const productInfo = await MenuItem.findById(cartProduct._id);

//     let productPrice = productInfo.basePrice;
//     if (cartProduct.size) {
//       const size = productInfo.sizes
//         .find(size => size._id.toString() === cartProduct.size._id.toString());
//       productPrice += size.price;
//     }
//     if (cartProduct.extras?.length > 0) {
//       for (const cartProductExtraThing of cartProduct.extras) {
//         const productExtras = productInfo.extraIngredientPrices;
//         const extraThingInfo = productExtras
//           .find(extra => extra._id.toString() === cartProductExtraThing._id.toString());
//         productPrice += extraThingInfo.price;
//       }
//     }

//     const productName = cartProduct.name;

    
//     stripeLineItems.push({
//       quantity: 1,
//       price_data: {
//         currency: "PKR",
//         product_data: {
//           name: productName,
//         },
//         unit_amount: productPrice,
//       },
//     });
//   }
 
//   // return Response.json(null);

//   const stripeSession = await stripe.checkout.sessions.create({
//     line_items: stripeLineItems,
//     mode: "payment",
//     customer_email: userEmail,
//     success_url: process.env.NEXTAUTH_URL + "cart?success=1",
//     cencel_url: process.env.NEXTAUTH_URL + "cart?cencel=1",
//     matadata: { orderId: orderDoc._id },
//     shipping_options: [
//       {
//         shipping_rate_data: {
//           display_name: "Delivery fee",
//           type: "fixed_amount",
//           fixed_amount: { amount: 150, currency: "PKR" },
//         },
//       },
//     ],
//   });
//   return Response.json(stripeSession.url);
// }



import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Order } from "../../models/Order";
import { MenuItem } from "../../models/MenuItem";

const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    // console.log(req.headers)

    const { cartProducts, address } = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    // Create order document
    const orderDoc = await Order.create({
      userEmail,
      ...address,
      cartProducts,
      paid: false,
    });

    // Fetch all products in one query
    const productIds = cartProducts.map((p) => p._id);
    const products = await MenuItem.find({ _id: { $in: productIds } });

    const stripeLineItems = cartProducts.map((cartProduct) => {
      const productInfo = products.find(
        (product) => product._id.toString() === cartProduct._id.toString()
      );

      let productPrice = productInfo.basePrice;

      if (cartProduct.size) {
        const size = productInfo.sizes.find(
          (size) => size._id.toString() === cartProduct.size._id.toString()
        );
        productPrice += size?.price || 0;
      }

      if (cartProduct.extras?.length > 0) {
        for (const extra of cartProduct.extras) {
          const extraThingInfo = productInfo.extraIngredientPrices.find(
            (extraInfo) => extraInfo._id.toString() === extra._id.toString()
          );
          productPrice += extraThingInfo?.price || 0;
        }
      }

      return {
        quantity: 1,
        price_data: {
          currency: "PKR",
          product_data: {
            name: cartProduct.name,
          },
          unit_amount: productPrice * 100, // Stripe expects amounts in cents
        },
      };
    });

    // Create Stripe session
    const stripeSession = await stripe.checkout.sessions.create({
      line_items: stripeLineItems,
      mode: "payment",
      customer_email: userEmail,
      success_url: process.env.NEXTAUTH_URL + "/orders/"+ orderDoc._id.toString()+ '?clear-cart=1',
      cancel_url: `${process.env.NEXTAUTH_URL}/cart?canceled=1`,
      metadata: { orderId: orderDoc._id.toString() },
      payment_intent_data: {
      metadata: { orderId: orderDoc._id.toString() },
        
      },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Delivery fee",
            type: "fixed_amount",
            fixed_amount: { amount: 150 * 100, currency: "PKR" },
          },
        },
      ],
    });

    return Response.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Checkout API Error:", error);
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
