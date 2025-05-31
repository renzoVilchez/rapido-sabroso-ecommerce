const RotatingCard = ({
  image,
  title,
  role,
  birthPlace,
  birthDate,
  studyCenter,
  technologies = {
    graphicDesign: [],
    videoEditing: [],
    webDevelopment: [],
  },
}) => {
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
        <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
        <p className="text-sm text-center mb-4 italic">{role}</p>

        <div className="text-xs space-y-1">
          <p><span className="font-semibold">Lugar de nacimiento:</span> {birthPlace}</p>
          <p><span className="font-semibold">Fecha de nacimiento:</span> {birthDate}</p>
          <p><span className="font-semibold">Centro de estudios:</span> {studyCenter}</p>
        </div>

        <div className="mt-3 text-xs space-y-2">
          <div>
            <h4 className="font-semibold underline">Diseño Gráfico</h4>
            <ul className="list-disc list-inside ml-2">
              {technologies.graphicDesign.map((tech, i) => (
                <li key={`gd-${i}`}>{tech}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold underline">Edición de Video</h4>
            <ul className="list-disc list-inside ml-2">
              {technologies.videoEditing.map((tech, i) => (
                <li key={`ve-${i}`}>{tech}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold underline">Desarrollo Web</h4>
            <ul className="list-disc list-inside ml-2">
              {technologies.webDevelopment.map((tech, i) => (
                <li key={`web-${i}`}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotatingCard;