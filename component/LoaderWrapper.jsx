"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function LoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, [pathname, searchParams, mounted]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key={pathname}
          className="fixed inset-0 flex flex-col items-center justify-center bg-[#171b29] z-[9999] w-full h-screen overflow-hidden"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 90, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 3 }}
          style={{ transformOrigin: "left center" }}
        >
          <motion.div
            initial={{ scale: 0, rotate: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              rotate: 360, 
              opacity: 1,
              y: [0, -50, 0] // 🔹 Logo bhi center se upar niche slide karega
            }}
            exit={{ opacity: 0, y: -100 }} // 🔹 Jab page slide hoga to logo bhi sath move kare
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <Image
              src="/image/favicon1.webp"
              alt="Loader"
              width={160}
              height={160}
              className="rounded-xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PageLoader() {
  return (
    <Suspense fallback={null}>
      <LoaderContent />
    </Suspense>
  );
}
