const SelectorMetodoPago = ({ metodos, selectedId, onChange, onNuevo }) => {
  return (
    <div className="mb-6">
      <label htmlFor="metodoPago" className="block font-semibold text-[#1f1f1f] mb-2">
        Método de Pago *
      </label>
      <select
        id="metodoPago"
        name="metodoPago"
        value={selectedId || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded border border-gray-300 mb-2"
      >
        <option value="">Selecciona un método</option>
        {metodos.map((metodo) => (
          <option key={metodo.id_metodo_pago} value={String(metodo.id_metodo_pago)}>
            {metodo.nombre} - {metodo.numero}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={onNuevo}
        className="text-sm text-blue-600 hover:underline"
      >
        + Agregar nuevo método
      </button>
    </div>
  );
};

export default SelectorMetodoPago;