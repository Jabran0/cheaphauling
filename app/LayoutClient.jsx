"use client";
import Navigation from "@/component/Navigation.jsx";
import Footer from "@/component/Footer.jsx";
import AOSProvider from "@/component/AOSProvider.jsx";
import FullScreenLoader from "@/component/LoaderWrapper.jsx";
import TawkToChat from "@/component/TawkToChat.jsx";
import { usePathname } from "next/navigation";

export default function LayoutClient({ children }) {
  const pathname = usePathname();

  // ✅ ye pages par header/footer hide karna hai
  const noLayoutPages = ["/contractform"];
  const hideLayout = noLayoutPages.includes(pathname);

  return (
    <>
      <FullScreenLoader />
      <AOSProvider>
        {!hideLayout && <Navigation />}
        {children}
        {!hideLayout && <Footer />}
      </AOSProvider>
      <TawkToChat />
    </>
  );
}
