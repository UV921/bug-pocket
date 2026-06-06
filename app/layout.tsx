import "./global.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html >
      <body className="bg-gray-100">
        <div>
          
          <div > {children}</div>
          
        </div>
      </body>
    </html>
  )
}