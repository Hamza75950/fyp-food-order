// import * as mongoose from 'mongoose'
// import bcrypt from "bcrypt";
// import NextAuth, { getServerSession } from "next-auth";
// import { User } from "../../../models/User";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "../../../../libs/mongoConnect";

// export const authOptions = {
//   secret: process.env.SECRET,
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),

//     CredentialsProvider({
//       // The name to display on the sign in form (e.g. 'Sign in with...')
//       name: "Credentials",
//       id: "credentials",
//       // The credentials is used to generate a suitable form on the sign in page.
//       // You can specify whatever fields you are expecting to be submitted.
//       // e.g. domain, username, password, 2FA token, etc.
//       // You can pass any HTML attribute to the <input> tag through the object.
//       credentials: {
//         username: {
//           label: "Email",
//           type: "email",
//           placeholder: "test@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials, req) {

//         const email = credentials?.email;
//         const password = credentials?.password;

//         mongoose.connect(process.env.MONGO_URL);
//         const user = await User.findOne({ email });
//         const passwordOk = user && bcrypt.compareSync(password, user.password);

//         if (passwordOk) {

//           return user;
//         }

//         // Return null if user data could not be retrieved
//         return null;
//       },
//     }),
//   ],
//   session:{
//     strategy:'jwt',
//   },
// }

// export async function isAdmin(){
//   const session = await getServerSession(authOptions);
//   const userEmail = session?.user?.email;
//   if(!userEmail){
//     return false;
//   }
//   const userInfo = await UserInfo.findOne({email:userEmail})
//   if(!userInfo){
//     return false;
//   }
//   return userInfo.admin;
// }
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// dbConnect.js (Utility for MongoDB Connection)



// NextAuth Endpoint
// import * as mongoose from "mongoose";
import bcrypt from "bcrypt";
import NextAuth, { getServerSession } from "next-auth";
import { User } from "../../../models/User";
import { UserInfo } from "../../../models/UserInfo"; // Assuming UserInfo schema exists
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../libs/mongoConnect";
import dbConnect from "../../../../libs/dbConnect";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        try {
          await dbConnect(); // Ensure MongoDB connection

          const email = credentials?.email;
          const password = credentials?.password;
          console.log(credentials);
          

          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("No user found with the provided email");
          }

          const passwordOk = bcrypt.compareSync(password, user.password);
          if (!passwordOk) {
            throw new Error("Invalid email or password");
          }

          return user; // Successful login
        } catch (error) {
          console.error("Error in authorize function:", error.message);
          return null; // Login failed
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
