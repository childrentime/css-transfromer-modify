import { Inter } from "next/font/google";
import "../public/antd.min.css"
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CSS Transfromer Modify",
  description: "Modify CSS Transfroms in ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          padding: 0,
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}
