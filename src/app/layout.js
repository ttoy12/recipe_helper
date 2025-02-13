import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer"

export const metadata = {
  title: "Recipe Helper",
  description: "Recipe generator from photo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
