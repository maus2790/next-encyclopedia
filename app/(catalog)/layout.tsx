import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}