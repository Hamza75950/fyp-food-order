// import { User } from "../../models/User";
// import mongoose from "mongoose";
// import { isAdmin } from "../auth/[...nextauth]/route";

// export async function GET() {
//   mongoose.connect(process.env.MONGO_URL);
//   if (!isAdmin()) {
//     const users = await User.find();
//     return Response.json(users);
//   }
//   else{
//     return Response.json([])
//   }
// }

import { User } from "../../models/User";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET(request) {
  try {
    // Connect to MongoDB (reuse the connection if already connected)
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    // Check if the user is an admin
    if (!(await isAdmin(request))) {
      return new Response("Unauthorized", { status: 403 });
    }

    // Fetch all users from the database
    const users = await User.find();
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
