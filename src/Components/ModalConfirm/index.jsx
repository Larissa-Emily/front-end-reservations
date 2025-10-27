import React from "react";
import { IoClose, IoWarning } from "react-icons/io5";

export default function ModalConfirm({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-[#0e48868f] bg-opacity-50 z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IoClose className="text-2xl" />
          </button>

          {/* Ícone de aviso */}
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-4 rounded-full">
              <IoWarning className="text-5xl text-red-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            {title}
          </h2>

          <p className="text-gray-600 text-center mb-6">
            {message}
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 px-4 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
