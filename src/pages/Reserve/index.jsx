import React from "react";
import SearchBar from "../../Components/SearchBar/searchBar";
export default function Reserve() {
  return (
    <>
      <header className="flex justify-between">
        <div className="flex flex-col">
          <ul>
            <li>
              <h1 className=" text-[#232323] text-[32px] font-bold">
                Reservar sala
              </h1>
            </li>
          </ul>
        </div>
      </header>
      <section>
        <SearchBar/>
      </section>
    </>
  );
}
