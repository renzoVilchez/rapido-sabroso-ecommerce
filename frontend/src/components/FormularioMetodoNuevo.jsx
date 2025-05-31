const FormularioMetodoNuevo = ({
  mostrar,
  nuevoMetodo,
  isLoading,
  onChange,
  onCrear,
  onCancelar, // <-- nuevo prop
}) => {
  if (!mostrar) return null;

  return (
    <div className="mb-6 bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-bold mb-4">Nuevo Método de Pago</h3>
      
      <label className="block mb-2 text-[#1f1f1f] font-semibold">Nombre del método</label>
      <input
        type="text"
        name="nombre"
        value={nuevoMetodo.nombre}
        onChange={onChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <label className="block mb-2 text-[#1f1f1f] font-semibold">Número o cuenta</label>
      <input
        type="text"
        name="numero"
        value={nuevoMetodo.numero}
        onChange={onChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancelar}
          disabled={isLoading}
          className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-gray-400 transition-colors"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={onCrear}
          disabled={isLoading}
          className="bg-[#facc15] text-[#1f1f1f] font-semibold py-2 px-4 rounded hover:bg-[#fef08a] transition-colors"
        >
          {isLoading ? "Guardando..." : "Guardar Método"}
        </button>
      </div>
    </div>
  );
};

export default FormularioMetodoNuevo;