import "./globals.css";
import { Navbar } from "./components/Navbar";

export const metadata = {
  title: "Recipe Helper",
  description: "Recipe generator from photo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={'antialiased'}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
