// import NavigateBar from "../components/navigateBar";
import { SidebarProvider } from "@/context/minimized";
import dynamic from "next/dynamic";

export default function UserLayout({ children }) {
  const NavigateBar = dynamic(() => import('../components/navigateBar'), { ssr: false });

  return (
    <div>
      <SidebarProvider>
        <NavigateBar />
        {children}
      </SidebarProvider>
    </div>
  );
    
}