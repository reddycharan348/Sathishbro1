
  import { createRoot } from "react-dom/client";
  import { ThemeProvider } from "next-themes";
  import { Analytics } from "@vercel/analytics/react";
  import { SpeedInsights } from "@vercel/speed-insights/react";
  import App from "./app/App";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <App />
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );