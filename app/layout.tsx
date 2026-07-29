import type { Metadata } from "next";
import "./globals.css";
import DashShell from "@/components/DashShell";
import BootScreen from "@/components/BootScreen";

export const metadata: Metadata = {
  title: "Kestrel Electric · Solo Operator OS",
  description:
    "One electrician, one office that never sleeps. Kestrel Electric runs on LEGION OS: leads captured, quotes chased, jobs tracked from first call to final payment, so the tools never leave your hands.",
};

const themeInit = `(function(){try{var t=localStorage.getItem('kestrel-theme')||'light';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <link rel="preconnect" href="https://rsms.me" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <BootScreen />
        <DashShell>{children}</DashShell>
      </body>
    </html>
  );
}
