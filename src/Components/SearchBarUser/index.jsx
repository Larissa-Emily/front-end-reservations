import React ,{ useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ onSearch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    
    // ✅ Chama a função de busca passando os filtros
    onSearch({ name, email });
  }

  function handleClear() {
    setName("");
    setEmail("");
    onSearch({ name: "", email: "" });
  }

  return (
    <form 
      onSubmit={handleSearch}
      className="flex items-end gap-4 bg-white p-4 rounded-lg shadow-sm"
    >
      {/* Campo Nome */}
      <div className="flex-1">
        <label 
          htmlFor="name" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nome
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Campo E-mail */}
      <div className="flex-1">
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          E-mail
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite o e-mail"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Botões */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FiSearch className="text-lg" />
          Buscar
        </button>

        {(name || email) && (
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            Limpar
          </button>
        )}
      </div>
    </form>
  );
}
