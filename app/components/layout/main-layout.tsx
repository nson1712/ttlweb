import { Providers } from "@/app/providers";
import { SettingsProvider } from "@/app/context/setting-context";
import { LayoutInner } from "./main-layout-inner";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <Providers>
      <SettingsProvider>
        <LayoutInner>{children}</LayoutInner>
      </SettingsProvider>
    </Providers>
  );
}
