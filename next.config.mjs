// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images:{
//         remotePatterns:[
//             {
//                 protocol:'https',
//                 hostname: '*.googleusercontent.com',
//             },
//             {
//                 protocol:'https',
//                 hostname: 'hk-food-ordering.s3.amazonaws.com',
//             },

//         ]
//     }
// };

// export default nextConfig;

// next.config.mjs
export default {
    eslint: {
      ignoreDuringBuilds: true, // Disables ESLint during builds
    },
    typescript: {
      ignoreBuildErrors: true, // This will skip TypeScript validation entirely during build
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "*.googleusercontent.com",
        },
        {
          protocol: "https",
          hostname: "hk-food-ordering.s3.amazonaws.com",
        },
      ],
    },
  };

  
  