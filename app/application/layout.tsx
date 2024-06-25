import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "../providers";
import { Navbar } from "../../components";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <Navbar />
        <Providers>{children}</Providers>
      </div>
    </div>
  );
}

export default AppLayout;
