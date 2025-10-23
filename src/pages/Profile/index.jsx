import React, { useState} from "react";
import MyProfile from "../../Components/MyProfile/myprofile";
import MyHistory from "../../Components/MyHistory/myHistory"
export default function Profile() {
  // Estado que controla qual aba está ativa
  const [activeTab, setActiveTab] = useState("geral");

  return (
    <section className="pt-[20px]">
        <div className="pb-[20px]">
            <h3 className="font-bold text-[32px] text-[#232323]">Perfil</h3>
        </div>
      <div className="flex border border-solid border-[#0000001A] rounded-lg">
        {/* Abas laterais */}
        <div className="w-[350px] h-[728px] border-r border-gray-300 text-[#7a7d84] p-[24px] rounded-lg">
          <button
            className={`w-full p-4 text-left ${
              activeTab === "geral"
                ? "bg-[#e7e7e794] text-[#3b9abb] font-bold"
                : ""
            } cursor-pointer `}
            onClick={() => setActiveTab("geral")}
          >
            Geral
          </button>
          <button
            className={`w-full p-4 text-left ${
              activeTab === "history"
                ? "bg-[#e7e7e794] font-bold  text-[#3b9abb]"
                : ""
            } cursor-pointer`}
            onClick={() => setActiveTab("history")}
          >
            Historico de reservas
          </button>
        </div>

        {/* Conteúdo da aba */}
        <div className="flex-1 p-6">
          {activeTab === "geral" && (
            <div>
              <MyProfile />
            </div>
          )}
          {activeTab === "history" && (
            <div>
              <MyHistory/>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
