
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      "febb3f55-437d-4bef-8e06-d5d0a5b92137.lovableproject.com",
      "cf52ad02-b557-4a86-ae04-588f4c91f3fa.lovableproject.com", 
      "5cfaa2de-9fc8-4d68-902c-4eed1e76e9b5.lovableproject.com",
      "7ae064df-f9fc-4248-8f03-2123410d0704.lovableproject.com",
      "ebab376b-c54d-4330-a2b4-25aec7148d0d.lovableproject.com",
      "d9b71f69-443e-4541-9615-d135835a306f.lovableproject.com",
      "c3453c23-2d3f-493d-991b-b9040d78d329.lovableproject.com",
      "60434b6a-2dca-4dce-be4c-71796e816677.lovableproject.com",
      "ee6a09be-7286-40b2-a92e-84ae4933d384.lovableproject.com",
      "2086b0be-8300-4727-8553-83c0c09357e6.lovableproject.com",
      "3f23208d-d02c-4c88-b6bb-8fd28771c4c5.lovableproject.com",
      "736c50cc-c0d0-4d16-9627-9e470bc3040f.lovableproject.com",
      "c5eac818-20e2-4f64-be5d-26c7daba7c65.lovableproject.com",
      "localhost"
    ]
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
