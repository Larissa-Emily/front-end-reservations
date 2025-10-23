import React from "react";
import { useState, useEffect } from "react";
import Image from "../../assets/Image.jpg";
import { TbPencilMinus } from "react-icons/tb";
import { authService } from "../../services/auth.service";

export default function MyProfile() {
  const [notificacoes, setNotificacoes] = useState(true);
  const [user, setUser] = useState("")
  useEffect(() => {
    const userData = authService.getUser();
    setUser(userData);
  }, []);
  return (
    <div>
      <header>
        <h1 className="text-[24px] font-bold text-[#232323] pb-[20px]">
          Meu perfil
        </h1>
      </header>
      <section className="border border-solid border-[#0000001A] rounded-lg w-[90%] h-[140px] items-center flex justify-between">
        <div className="flex items-center p-[20px]">
          <img
            src={Image}
            alt="perfil"
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
          <div className="pl-[20px]">
            <h3 className="text-[#434966] text-[16px] font-bold">
             {user.name}
            </h3>
            <p className="text-[#82889c]">{user.sector}</p>
          </div>
        </div>
        <div>
          <button className="border border-solid border-[#434966] w-[117px] h-[40px] rounded-lg flex justify-around items-center mr-[15px] cursor-pointer">
            Editar <TbPencilMinus />
          </button>
        </div>
      </section>
      <section className="border border-solid border-[#0000001A] rounded-lg w-[90%] h-[214px] mt-[20px]">
        <header className="flex justify-between items-center p-[20px]">
          <h3 className="text-[#434966] text-[18px] font-semibold">
            Informações Pessoais
          </h3>

          <button className="border border-solid border-[#434966] w-[117px] h-[40px] rounded-lg flex justify-around items-center text-[#434966] cursor-pointer">
            Editar <TbPencilMinus />
          </button>
        </header>

        {/* Conteúdo dos dados */}
        <div className="px-[20px] pb-[10px]">
          <div className="grid grid-cols-3 gap-y-4 text-sm text-gray-600">
            {/* Nome */}
            <div>
              <p className="text-[#9CA3AF]">Nome</p>
              <p className="text-[#1F2937] font-medium">{user.name}</p>
            </div>

            {/* Função */}
            <div>
              <p className="text-[#9CA3AF]">Função</p>
              <p className="text-[#1F2937] font-medium">{user.sector}</p>
            </div>

            {/* Telefone */}
            <div>
              <p className="text-[#9CA3AF]">Telefone</p>
              <p className="text-[#1F2937] font-medium">+55 (31) 99999-9999</p>
            </div>

            {/* E-mail */}
            <div>
              <p className="text-[#9CA3AF]">E-mail</p>
              <p className="text-[#1F2937] font-medium">{user.email}</p>
            </div>

            {/* Setor */}
            <div>
              <p className="text-[#9CA3AF]">Setor</p>
              <p className="text-[#1F2937] font-medium">{user.sector}</p>
            </div>
            {/* Tipo de usuario */}
            <div>
              <p className="text-[#9CA3AF]">Tipo de usuario</p>
              <p className="text-[#1F2937] font-medium">{user.role}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border border-solid border-[#0000001A] rounded-lg w-[90%] h-[127px] items-center flex mt-[20px]">
        <div>
          <div className="flex justify-between items-center px-[20px]">
            <h3 className="text-[#1F2937] text-[16px] font-semibold">
              Informações Gerais
            </h3>
          </div>

          <div className="flex items-center justify-between px-[20px] mt-[10px]">
            {/* Alterar senha */}
            <div className="flex items-center gap-3">
              <p className="text-[#1F2937] font-medium">Alterar Senha</p>
              <button className="border border-[#2D9CDB] text-[#2D9CDB] text-[14px] font-medium px-3 py-1 rounded-md hover:bg-[#E6F4FA] transition cursor-pointer">
                Alterar
              </button>
            </div>

            {/* Divisor vertical */}
            <div className="h-6 w-[1px] bg-[#E5E7EB] mx-6"></div>

            {/* Notificações */}
            <div className="flex items-center gap-3">
              <p className="text-[#1F2937] font-medium">Notificações</p>

              {/* Switch simples em Tailwind */}
              <button
                onClick={() => setNotificacoes(!notificacoes)}
                className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${
                  notificacoes ? "bg-[#2D9CDB]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    notificacoes ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
