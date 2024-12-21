import { getServerSession } from "next-auth";
import { UserInfo } from "@/app/models/UserInfo";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "./dbConnect";


export async function isAdmin() {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user?.email) return false;
  
      await dbConnect(); // Ensure database connection
      const userInfo = await UserInfo.findOne({ email: session.user.email });
      return userInfo?.admin || false;
    } catch (error) {
      console.error("Error in isAdmin function:", error.message);
      return false;
    }
  }
  