import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <div className="pt-15">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
