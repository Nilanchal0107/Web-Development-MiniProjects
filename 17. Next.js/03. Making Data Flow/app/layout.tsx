import "./globals.css";
import Navbar from '@/components/Navbar'
import {Roboto} from 'next/font/google'

const roboto = Roboto({
  subsets:['latin']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
