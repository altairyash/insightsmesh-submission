import "./globals.css";
import ReduxProvider from "../store/Provider";
import { Providers } from "./wrappers/providers";
import ClientAuthProvider from "./wrappers/ClientAuthProvider";
import GlobalThemeToggle from "../components/GlobalThemeToggle";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <ReduxProvider>
            <ClientAuthProvider>
              <GlobalThemeToggle />
              {children}
            </ClientAuthProvider>
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
