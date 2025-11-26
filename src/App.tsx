import "./App.css";
import { useState } from "react";
import { Header } from "./components/Header";
import { Vendas } from "./pages/Vendas";
import { Estoque } from "./pages/Estoque";

function App() {
  const [activeTab, setActiveTab] = useState<"vendas" | "estoque">("vendas");

  return (
    <div className="min-h-screen w-full">
      <Header />

      <div className="container mx-auto px-4 pt-28 py-6">
        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg border shadow-sm mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("vendas")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "vendas"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              Vendas
            </button>
            <button
              onClick={() => setActiveTab("estoque")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "estoque"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              Estoque
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="py-4">
          {activeTab === "vendas" ? <Vendas /> : <Estoque />}
        </div>
      </div>
    </div>
  );
}

export default App;
