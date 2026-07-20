import "./globals.css"
export const metadata = {
  title: "Vendix payment",
  description: "Pay with vendix",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body>{children}</body>
    </html>
  );
}
