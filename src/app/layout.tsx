import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CRUD",
  description: "Generated user crud with NextJS 13",
}

export default function RootLayout({children}: {children: React.ReactNode }) {

  return (
    <html lang="pt-br">
      <body className={inter.className + "w-[500px] h-[calc(100vh-20px)] my-[10px] mx-auto p-5"}>
        {children}
      </body>
    </html>
  )
}