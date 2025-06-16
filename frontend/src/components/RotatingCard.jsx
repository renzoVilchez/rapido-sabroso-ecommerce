const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, " $1") // Convierte camelCase a palabras separadas
    .replace(/^./, (str) => str.toUpperCase()); // Primera letra mayúscula
};

const RotatingCard = ({
  image,
  title,
  role,        // tu subtítulo
  data = {},   // objeto con datos (ej: { edad: 25, ciudad: "Lima" })
  showFields = [], // campos que quieres mostrar (ej: ["edad", "ciudad"])
}) => {
  const renderField = (key) => {
    if (data[key] === undefined || data[key] === null) return null;

    const value = data[key];

    if (Array.isArray(value)) {
      return (
        <div key={key} className="mt-2 text-xs">
          <h4 className="font-semibold underline">{formatLabel(key)}</h4>
          <ul className="list-disc list-inside ml-4">
            {value.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      );
    }

    if (typeof value === "object") {
      return (
        <div key={key} className="mt-2 text-xs">
          <h4 className="font-semibold underline">{formatLabel(key)}</h4>
          <ul className="list-disc list-inside ml-4">
            {Object.entries(value).map(([subKey, subVal], i) => (
              <li key={i}>
                <strong>{formatLabel(subKey)}:</strong>{" "}
                {Array.isArray(subVal) ? subVal.join(", ") : subVal}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    // Valor simple (string, número)
    return (
      <p key={key} className="text-xs mt-1">
        <span className="font-semibold">{formatLabel(key)}:</span> {value}
      </p>
    );
  };

  return (
    <div className="relative w-full max-w-[300px] aspect-[3/4] m-5 group [perspective:1000px]">
      {/* Cara frontal */}
      <div className="absolute w-full h-full rounded-[10px] overflow-hidden transition-transform duration-500 [backface-visibility:hidden] shadow-md group-hover:rotate-y-180">
        <img src={image} alt={title} className="absolute w-full h-full object-cover" />
        <h3 className="absolute bottom-0 w-full h-[45px] leading-[45px] text-white text-center bg-black/80">
          {title}
        </h3>
      </div>

      {/* Cara trasera */}
      <div className="absolute w-full h-full rounded-[10px] overflow-hidden transition-transform duration-500 [backface-visibility:hidden] rotate-y-180 bg-[#032336] text-[#f3f3f3] shadow-md flex flex-col text-left p-4 group-hover:rotate-y-[360deg] overflow-y-auto">
        <h3 className="text-xl font-bold text-center mb-1">{title}</h3>
        {role && <p className="text-sm text-center italic mb-4">{role}</p>}

        <div className="flex flex-col">
          {showFields.map((field) => renderField(field))}
        </div>
      </div>
    </div>
  );
};

export default RotatingCard;