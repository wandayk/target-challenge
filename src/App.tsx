import "./App.css";
import { useState } from "react";
import { Header } from "./components/Header";
import { Vendas } from "./pages/Vendas";
import { Estoque } from "./pages/Estoque";
import { Juros } from "./pages/Juros";
import { Spinner } from "@/components/ui/spinner";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [activeTab, setActiveTab] = useState<"vendas" | "estoque" | "juros">("vendas");
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab: "vendas" | "estoque" | "juros") => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="h-screen w-full pt-[2rem]">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="flex justify-center pt-26 pb-0">
        <div className="mx-[0rem] w-full px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Spinner className="h-8 w-8" />
            </div>
          ) : activeTab === "vendas" ? (
            <Vendas />
          ) : activeTab === "estoque" ? (
            <Estoque />
          ) : (
            <Juros />
          )}
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
