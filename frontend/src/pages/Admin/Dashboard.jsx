import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  AreaChart, Area,
  XAxis, YAxis, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts';

const ventasMensuales = [
  { mes: 'Ene', ventas: 4000 },
  { mes: 'Feb', ventas: 3000 },
  { mes: 'Mar', ventas: 5000 },
  { mes: 'Abr', ventas: 2780 },
  { mes: 'May', ventas: 3900 },
];

const pedidosPorDia = [
  { dia: 'Lun', pedidos: 30 },
  { dia: 'Mar', pedidos: 45 },
  { dia: 'Mié', pedidos: 32 },
  { dia: 'Jue', pedidos: 60 },
  { dia: 'Vie', pedidos: 80 },
  { dia: 'Sáb', pedidos: 90 },
  { dia: 'Dom', pedidos: 70 },
];

const productosMasVendidos = [
  { name: 'Hamburguesa Clásica', value: 400 },
  { name: 'Hamburguesa Vegana', value: 300 },
  { name: 'Bebida Cola', value: 300 },
  { name: 'Hamburguesa BBQ', value: 200 },
];

const ingresosPorMes = [
  { mes: 'Ene', ingresos: 2400 },
  { mes: 'Feb', ingresos: 2210 },
  { mes: 'Mar', ingresos: 2290 },
  { mes: 'Abr', ingresos: 2000 },
  { mes: 'May', ingresos: 2780 },
];

const colores = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

function Dashboard() {
  return (
    <div className="p-4 space-y-12">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Ventas por mes */}
      <div className="h-72">
        <h2 className="text-lg font-semibold mb-2">Ventas por Mes</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ventasMensuales}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ventas" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pedidos por día */}
      <div className="h-72">
        <h2 className="text-lg font-semibold mb-2">Pedidos por Día</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={pedidosPorDia}>
            <XAxis dataKey="dia" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pedidos" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Productos más vendidos */}
      <div className="h-72">
        <h2 className="text-lg font-semibold mb-2">Productos más Vendidos</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={productosMasVendidos}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {productosMasVendidos.map((entry, index) => (
                <Cell key={index} fill={colores[index % colores.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Ingresos acumulados */}
      <div className="h-72">
        <h2 className="text-lg font-semibold mb-2">Ingresos por Mes</h2>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={ingresosPorMes}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="ingresos" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;