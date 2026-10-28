import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `
      @use "@/assets/variables" as *;
      @use "@/assets/mixins" as *;
    `,
  },
};

export default nextConfig;
