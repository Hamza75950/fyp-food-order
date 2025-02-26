// import { metadata } from "@/app/layout";
// import { Order } from "@/app/models/Order";

// const stripe = require("stripe")(process.env.STRIPE_SK);

// export async function POST(req) {
//     const sig = req.headers.get('stripe-signature')
//     let event ;

//     try{
//         const reqBuffer = await req.text();
//         const signSecret = process.env.STRIPE_SIGN_SECRET
//         event=stripe.webhooks.constructEvent(reqBuffer,sig,signSecret)
//     }catch(e){
//         console.error('stripe error')
//         // console.log(e)
//         return Response.json(e, {status:400})
//     }
//     if(event.type === 'checkout.session.completed'){
//         const orderId = event?.data?.object?.metadata?.orderId;
//         const isPaid  = event?.data?.object?.payment_status === 'paid';
//         if(isPaid){
//            await Order.updateOne({_id:orderId},{paid:true})
//         }

//     }
//     return Response.json('ok',{status:200})

// }

import mongoose from "mongoose";
import { Order } from "@/app/models/Order";

const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    console.error("Stripe webhook error:", e);
    return Response.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }

  // Ensure database connection
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ Connected to MongoDB");
    } catch (err) {
      console.error("❌ Database connection error:", err);
      return Response.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }
  }

  if (event.type === "checkout.session.completed") {
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === "paid";

    console.log(`Order ID: ${orderId}, Is Paid: ${isPaid}`);

    if (!orderId) {
      console.error("❌ No orderId found in metadata!");
      return Response.json(
        { error: "Missing orderId in metadata" },
        { status: 400 }
      );
    }

    if (isPaid) {
      const updateResult = await Order.updateOne(
        { _id: orderId },
        { paid: true }
      );

      console.log("🛠 Database update result:", updateResult);

      if (updateResult.modifiedCount === 0) {
        console.error(
          "⚠ No document was modified. Check if orderId is correct."
        );
      }
    }
  }

  return Response.json("ok", { status: 200 });
}
