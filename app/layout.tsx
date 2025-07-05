import "./globals.css";
import ReduxProvider from "../store/Provider";
import { Providers } from "./providers";
import ClientAuthProvider from "./ClientAuthProvider";
import SignOutButton from "./SignOutButton";
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
