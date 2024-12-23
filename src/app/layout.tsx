import type { Metadata } from "next";
import StoreProvider from "./Storeprovider";
export const metadata: Metadata = {
  title: "Museyard Sample app",
  description: "Generated by museyard sample app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Belanosima&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Belanosima', sans-serif" }}>
        <StoreProvider>
        {children}
        </StoreProvider>
        </body>
    </html>
  );
}