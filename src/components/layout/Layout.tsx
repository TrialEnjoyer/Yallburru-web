import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "~/components/admin/Navigation";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith("/admin");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed top-0 w-full z-50">
        {isAdminRoute ? (
          <Navigation 
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        ) : (
          <Header />
        )}
      </div>
      <main className={`
        flex-grow 
        ${isAdminRoute ? "lg:ml-64 pt-[64px]" : ""}
        transition-all duration-300
      `}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
} 