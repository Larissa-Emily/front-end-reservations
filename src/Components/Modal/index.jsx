import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

export default function ModalRegister({ isOpen, onClose }) {
  const token = localStorage.getItem("access_token")

  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [functionUser, setFunctionUser] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  //  NOVOS ESTADOS PARA ERROS DE VALIDAÇÃO
  const [emailError, setEmailError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [formError, setFormError] = useState(""); // Para erros gerais do formulário

  const validateEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) {
      return "O email é obrigatório.";
    }
    if (!emailRegex.test(emailValue)) {
      return "Por favor, insira um email válido.";
    }
    return "";
  };

  const validatePassword = (passwordValue) => {
    const errors = [];
    if (!passwordValue) {
      errors.push("A senha é obrigatória.");
      return errors;
    }
    if (passwordValue.length < 8) {
      errors.push("A senha deve ter no mínimo 8 caracteres.");
    }
    if (!/[A-Z]/.test(passwordValue)) {
      errors.push("A senha deve conter pelo menos uma letra maiúscula.");
    }
    if (!/[a-z]/.test(passwordValue)) {
      errors.push("A senha deve conter pelo menos uma letra minúscula.");
    }
    if (!/[0-9]/.test(passwordValue)) {
      errors.push("A senha deve conter pelo menos um número.");
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(passwordValue)) {
      errors.push(
        "A senha deve conter pelo menos um caractere especial (ex: !@#$%...)."
      );
    }
    return errors;
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError(validateEmail(newEmail));
    setFormError(""); // Limpa erro geral ao digitar
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordErrors(validatePassword(newPassword));
    setFormError(""); // Limpa erro geral ao digitar
  };

  async function handleRegister(e) {
    e.preventDefault();
    setFormError(""); // Limpa erros anteriores do formulário

    const finalEmailError = validateEmail(email);
    const finalPasswordErrors = validatePassword(password);

    setEmailError(finalEmailError);
    setPasswordErrors(finalPasswordErrors);

    // Validação de campos obrigatórios (além de email/senha)
    if (
      !name ||
      !sector ||
      !functionUser ||
      !phone ||
      !email ||
      !password ||
      !role
    ) {
      setFormError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Se houver erros de email ou senha, impede a submissão
    if (finalEmailError || finalPasswordErrors.length > 0) {
      setFormError("Por favor, corrija os erros no formulário.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          sector,
          functionUser, // Usando functionUser
          phone,
          email,
          password,
          role,
        }),
      });

      if (response.ok) {
        toast.success("Usuário cadastrado com sucesso!");
        setName("");
        setSector("");
        setFunctionUser("");
        setPhone("");
        setEmail("");
        setPassword("");
        setRole("");
        setEmailError("");
        setPasswordErrors([]);
        setFormError("");
        onClose();
      } else {
        const errorData = await response.json().catch(() => ({
          message: "Erro desconhecido ao cadastrar usuário.",
        }));
        setFormError(errorData.message || "Erro ao cadastrar usuário!");
      }
    } catch (error) {
      setFormError(
        "Erro ao cadastrar usuário. Verifique sua conexão ou tente novamente."
      );
    }
  }

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-[#0e48868f] bg-opacity-50 z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-white/20 relative">
          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <IoClose className="text-2xl" />
          </button>

          <h1 className="text-3xl font-bold text-white mb-2">
            Cadastrar Usuário
          </h1>
          <span className="text-white/80 text-sm mb-6 block">
            Preencha os dados do novo usuário
          </span>

          {formError && (
            <div className="bg-red-500 text-white p-2 rounded-md mb-4">
              {formError}
            </div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Digite o nome completo"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setFormError("");
              }}
              className="p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              placeholder="Digite o setor"
              value={sector}
              onChange={(e) => {
                setSector(e.target.value);
                setFormError("");
              }}
              className="p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              placeholder="Digite a função"
              value={functionUser}
              onChange={(e) => {
                setFunctionUser(e.target.value);
                setFormError("");
              }}
              className="p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              placeholder="Digite o telefone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setFormError("");
              }}
              className="p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="text-left">
              <input
                type="email"
                placeholder="Digite o e-mail"
                value={email}
                onChange={handleEmailChange} // Usa o handler com validação
                className={`w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 ${
                  emailError
                    ? "focus:ring-red-400 border border-red-500"
                    : "focus:ring-blue-400"
                }`}
              />
              {emailError && (
                <p className="text-red-400 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <div className="text-left">
              <input
                type="password"
                placeholder="Digite a senha"
                value={password}
                autocomplete="current-password"
                onChange={handlePasswordChange} // Usa o handler com validação
                className={`w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 ${
                  passwordErrors.length > 0
                    ? "focus:ring-red-400 border border-red-500"
                    : "focus:ring-blue-400"
                }`}
              />
              {passwordErrors.length > 0 && (
                <ul className="text-red-400 text-sm mt-1 list-disc list-inside">
                  {passwordErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
            </div>

            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setFormError("");
              }}
              className="p-3 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" className="bg-[#0e4986]">
                Selecione o tipo de usuário
              </option>
              <option value="user" className="bg-[#0e4986]">
                Usuário
              </option>
              <option value="manager" className="bg-[#0e4986]">
                Gerente
              </option>
            </select>

            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition-all duration-200"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
