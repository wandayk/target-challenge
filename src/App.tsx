import "./App.css";
import { useState } from "react";
import { Header } from "./components/Header";
import { Vendas } from "./pages/Vendas";
import { Estoque } from "./pages/Estoque";
import { Spinner } from "@/components/ui/spinner";

function App() {
  const [activeTab, setActiveTab] = useState<"vendas" | "estoque">("vendas");
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab: "vendas" | "estoque") => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen w-full">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="flex justify-center pt-28 py-6">
        <div className="mx-[10rem] w-full px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Spinner className="h-8 w-8" />
            </div>
          ) : (
            activeTab === "vendas" ? <Vendas /> : <Estoque />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
