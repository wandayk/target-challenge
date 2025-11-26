import "./App.css";
import { useState } from "react";
import { Header } from "./components/Header";
import { Vendas } from "./pages/Vendas";
import { Estoque } from "./pages/Estoque";

function App() {
  const [activeTab, setActiveTab] = useState<"vendas" | "estoque">("vendas");

  return (
    <div className="min-h-screen w-full">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="container mx-auto px-4 pt-28 py-6">
        {activeTab === "vendas" ? <Vendas /> : <Estoque />}
      </div>
    </div>
  );
}

export default App;
