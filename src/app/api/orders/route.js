// import mongoose from "mongoose";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";
// import { UserInfo } from "../../models/UserInfo";

// export async function GET(req) {
//   mongoose.connect(process.env.MONGO_URL);

//   const session = await getServerSession(authOptions);

//   const userEmail = session?.user?.email;
//   let isAdmin = false;
//   const url = new URL(req.url);
//   const _id = url.searchParams.get("_id");
//   if (_id) {
//     return Response.json(await Order.findById(_id));
//   }

//   if (userEmail) {
//     const userInfo = await UserInfo.findOne({ email: userEmail });
//     if (userInfo) {
//       isAdmin = userInfo.admin;
//     }
//   }
//   if (isAdmin) {
//     return Response.json(await Order.find());
//   }
//   if (userEmail) {
//     return Response.json(await Order.find({ userEmail }));
//   }
// }

// // import { authOptions, isAdmin } from "@/app/api/auth/[...nextauth]/route";
// // import { Order } from "../../models/Order";
// // import mongoose from "mongoose";
// // import { getServerSession } from "next-auth";

// // export async function GET(req) {
// //   mongoose.connect(process.env.MONGO_URL);

// //   const session = await getServerSession(authOptions);
// //   const userEmail = session?.user?.email;
// //   const admin = await isAdmin();

// //   const url = new URL(req.url);
// //   const _id = url.searchParams.get("_id");
// //   if (_id) {
// //     return Response.json(await Order.findById(_id));
// //   }

// //   if (admin) {
// //     return Response.json(await Order.find());
// //   }

// //   if (userEmail) {
// //     return Response.json(await Order.find({ userEmail }));
// //   }
// // }






// import mongoose from "mongoose";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";
// import { UserInfo } from "../../models/UserInfo";
// import { Order } from "../../models/Order"; // Ensure Order is correctly imported
// import { NextResponse } from "next/server";

// let isConnected = false; // To manage a single DB connection

// async function connectToDatabase() {
//   if (!isConnected) {
//     await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     isConnected = true;
//   }
// }

// export async function GET(req) {
//   try {
//     await connectToDatabase();

//     const session = await getServerSession(authOptions);

//     if (!session?.user?.email) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const userEmail = session.user.email;

//     const url = new URL(req.url);
//     const _id = url.searchParams.get("_id");

//     if (_id) {
//       const order = await Order.findById(_id);
//       if (!order) {
//         return NextResponse.json({ error: "Order not found" }, { status: 404 });
//       }
//       return NextResponse.json(order);
//     }

//     const userInfo = await UserInfo.findOne({ email: userEmail });
//     const isAdmin = userInfo?.admin || false;

//     if (isAdmin) {
//       const orders = await Order.find();
//       return NextResponse.json(orders);
//     }

//     const userOrders = await Order.find({ userEmail });
//     return NextResponse.json(userOrders);
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }




import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {isAdmin} from '../../../libs/isAdmin';
import {Order} from "../../models/Order";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (_id) {
    return Response.json( await Order.findById(_id) );
  }


  if (admin) {
    return Response.json( await Order.find() );
  }

  if (userEmail) {
    return Response.json( await Order.find({userEmail}) );
  }

}