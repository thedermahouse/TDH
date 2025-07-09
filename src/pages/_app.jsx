import "@/assets/styles/admin.css";
import { montserrat } from "@/lib/fonts";
import { SessionProvider } from "next-auth/react";

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={`${montserrat.className}`} data-theme="dim">
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
}
