import React from "react";
export default function Dashboard() {
  return (
    <>
      <header className="flex justify-between">
        <div className="flex flex-col">
          <ul>
            <li>
              <h1 className=" text-[#232323] text-[32px] font-bold">
                Bem vindo-(a) de volta
              </h1>
            </li>
          </ul>
        </div>
      </header>
      <main>
        <section className="mt-[20px] flex gap-x-20 ">
          {/* Esquerda - Salas disponíveis */}
          <div className="w-[686px] h-full flex flex-col">
            <div className="w-full h-[262px] bg-[#6d919d9d] rounded-lg text-white text-start flex flex-col justify-center leading-10 pl-[24px]">
              <h3 className="text-[24px] w-[440px] font-semibold">
                Não é mais preciso verificar manualmente
              </h3>
              <p className="text-[20px]">
                Agende suas reuniões de forma rápida e segura
              </p>
            </div>
            <div>
              <header className="flex justify-between pt-[20px] pb-[20px]">
                <h2 className="text-[#232323] text-[24px] font-semibold">
                  Salas disponíveis
                </h2>
                <a href="#" className="text-[#4cb269] text-[14px] font-bold">
                  Ver todas
                </a>
              </header>
              <div className="w-[686px] h-[140px] flex flex-col bg-amber-50"></div>
            </div>
          </div>
          <div className="w-[600px] h-[483px] bg-amber-50">
            <header className="flex justify-between pt-[20px] pb-[20px]">
              <h2 className="text-[#232323] text-[24px] font-semibold">
                Próximas Reuniões
              </h2>
              <a href="#" className="text-[#4cb269] text-[14px] font-bold">
                Ver todas
              </a>
            </header>
          </div>
        </section>
      </main>
      <footer className="w-[100%] h-[325px] bg-amber-50 mt-[20px]">
        <header className="flex justify-between pt-[20px] pb-[20px]">
          <h2 className="text-[#232323] text-[24px] font-semibold">
            Salas recomendadas
          </h2>
          <a href="#" className="text-[#4cb269] text-[14px] font-bold">
            Ver todas
          </a>
        </header>
      </footer>
    </>
  );
}
