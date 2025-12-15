'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Empresas distribuidoras de electricidad
const DISTRIBUIDORAS = [
  { id: 1, nombre: 'Enel Distribucion Chile', region: 'Metropolitana', cobertura: 'Santiago y alrededores', clientes: 2000000, telefono: '600 360 3636', web: 'enel.cl' },
  { id: 2, nombre: 'CGE Distribucion', region: 'Multiple', cobertura: 'OHiggins, Maule, Biobio, Araucania', clientes: 1500000, telefono: '600 222 2000', web: 'cge.cl' },
  { id: 3, nombre: 'Chilquinta Energia', region: 'Valparaiso', cobertura: 'Region de Valparaiso', clientes: 700000, telefono: '600 600 7000', web: 'chilquinta.cl' },
  { id: 4, nombre: 'Saesa', region: 'Sur', cobertura: 'Los Rios, Los Lagos, Aysen', clientes: 500000, telefono: '600 600 2272', web: 'saesa.cl' },
  { id: 5, nombre: 'Frontel', region: 'Araucania', cobertura: 'La Araucania', clientes: 300000, telefono: '600 600 2272', web: 'frontel.cl' },
  { id: 6, nombre: 'Luz Osorno', region: 'Los Lagos', cobertura: 'Osorno y alrededores', clientes: 80000, telefono: '600 600 2272', web: 'luzosorno.cl' },
  { id: 7, nombre: 'Edelaysen', region: 'Aysen', cobertura: 'Region de Aysen', clientes: 35000, telefono: '600 600 2272', web: 'edelaysen.cl' },
  { id: 8, nombre: 'Edelmag', region: 'Magallanes', cobertura: 'Region de Magallanes', clientes: 70000, telefono: '61 229 3000', web: 'edelmag.cl' },
  { id: 9, nombre: 'Eliqsa', region: 'Tarapaca', cobertura: 'Iquique y Alto Hospicio', clientes: 120000, telefono: '600 600 7000', web: 'eliqsa.cl' },
  { id: 10, nombre: 'Elecda', region: 'Antofagasta', cobertura: 'Antofagasta y Mejillones', clientes: 150000, telefono: '600 600 7000', web: 'elecda.cl' },
  { id: 11, nombre: 'Emelat', region: 'Atacama', cobertura: 'Copiapo y valles', clientes: 80000, telefono: '600 600 7000', web: 'emelat.cl' },
  { id: 12, nombre: 'Conafe', region: 'Coquimbo', cobertura: 'La Serena, Coquimbo', clientes: 200000, telefono: '600 600 7000', web: 'conafe.cl' },
];

// Tarifas electricas
const TARIFAS = [
  { codigo: 'BT1', nombre: 'Baja Tension 1', descripcion: 'Residencial simple, tarifa unica', potencia: 'Hasta 10 kW', uso: 'Hogares', precio: 145 },
  { codigo: 'BT2', nombre: 'Baja Tension 2', descripcion: 'Residencial con demanda', potencia: '10-50 kW', uso: 'Hogares grandes', precio: 130 },
  { codigo: 'BT3', nombre: 'Baja Tension 3', descripcion: 'Residencial horaria', potencia: 'Hasta 10 kW', uso: 'Hogares con medidor horario', precio: 120 },
  { codigo: 'BT4.1', nombre: 'Baja Tension 4.1', descripcion: 'Comercial con demanda contratada', potencia: 'Hasta 50 kW', uso: 'Comercios', precio: 125 },
  { codigo: 'BT4.2', nombre: 'Baja Tension 4.2', descripcion: 'Comercial demanda leida', potencia: 'Hasta 50 kW', uso: 'Comercios medios', precio: 120 },
  { codigo: 'BT4.3', nombre: 'Baja Tension 4.3', descripcion: 'Comercial horaria parcial', potencia: 'Hasta 50 kW', uso: 'Comercios horario flexible', precio: 115 },
  { codigo: 'AT4.3', nombre: 'Alta Tension 4.3', descripcion: 'Industrial grande', potencia: 'Mas de 500 kW', uso: 'Industrias', precio: 90 },
];

// Consumo promedio electrodomesticos (kWh/mes)
const ELECTRODOMESTICOS = [
  { nombre: 'Refrigerador', consumo: 45, horas: 720, potencia: 150 },
  { nombre: 'Televisor LED 42"', consumo: 15, horas: 150, potencia: 100 },
  { nombre: 'Lavadora', consumo: 20, horas: 20, potencia: 500 },
  { nombre: 'Microondas', consumo: 8, horas: 10, potencia: 800 },
  { nombre: 'Computador', consumo: 25, horas: 150, potencia: 200 },
  { nombre: 'Aire acondicionado', consumo: 90, horas: 120, potencia: 1500 },
  { nombre: 'Calefactor electrico', consumo: 120, horas: 100, potencia: 2000 },
  { nombre: 'Ampolleta LED', consumo: 1.5, horas: 150, potencia: 10 },
  { nombre: 'Ampolleta incandescente', consumo: 9, horas: 150, potencia: 60 },
  { nombre: 'Secadora de ropa', consumo: 45, horas: 15, potencia: 3000 },
  { nombre: 'Plancha', consumo: 8, horas: 8, potencia: 1000 },
  { nombre: 'Hervidor electrico', consumo: 12, horas: 6, potencia: 2000 },
];

// Subsidios de energia
const SUBSIDIOS = [
  { nombre: 'Subsidio Electrico', monto: 'Variable', requisito: '40% mas vulnerable RSH', descripcion: 'Descuento en boleta de luz para familias vulnerables', cobertura: 'Hasta 50% descuento' },
  { nombre: 'Subsidio Gas Licuado', monto: '$50.000/ano', requisito: 'Registro Social de Hogares', descripcion: 'Aporte para compra de gas en cilindros', cobertura: 'Zonas frias priorizadas' },
  { nombre: 'Tarifa Equidad', monto: 'Variable', requisito: 'Consumo bajo 350 kWh/mes', descripcion: 'Estabilizacion de tarifas electricas', cobertura: 'Nacional' },
  { nombre: 'Subsidio Invierno', monto: '$70.000', requisito: 'Pensionados vulnerables', descripcion: 'Bono de invierno para calefaccion', cobertura: 'Regiones frias' },
];

// Derechos del consumidor
const DERECHOS = [
  { derecho: 'Corte de suministro', descripcion: 'Solo despues de 45 dias de mora y previo aviso', plazo: '45 dias' },
  { derecho: 'Reclamo por cobro', descripcion: 'Derecho a reclamar ante la empresa y SEC', plazo: '30 dias' },
  { derecho: 'Compensacion por corte', descripcion: 'Compensacion automatica por cortes no programados', plazo: 'Automatico' },
  { derecho: 'Lectura de medidor', descripcion: 'Derecho a solicitar lectura presencial', plazo: '5 dias habiles' },
  { derecho: 'Cambio de tarifa', descripcion: 'Solicitar cambio de tarifa segun consumo', plazo: '15 dias habiles' },
];

// Glosario electrico
const GLOSARIO = [
  { termino: 'kWh', definicion: 'Kilowatt-hora, unidad de consumo electrico (potencia x tiempo)' },
  { termino: 'SEC', definicion: 'Superintendencia de Electricidad y Combustibles, fiscalizador del sector' },
  { termino: 'BT/AT', definicion: 'Baja Tension / Alta Tension, clasificacion de suministro' },
  { termino: 'Demanda', definicion: 'Potencia maxima requerida en un periodo, medida en kW' },
  { termino: 'Factor de potencia', definicion: 'Eficiencia del uso de energia electrica (ideal > 0.93)' },
  { termino: 'Hora punta', definicion: 'Periodo de mayor demanda (18:00-23:00 en invierno)' },
  { termino: 'Empalme', definicion: 'Conexion entre red publica y instalacion del cliente' },
  { termino: 'Medidor inteligente', definicion: 'Dispositivo de medicion con comunicacion remota' },
  { termino: 'Cargo fijo', definicion: 'Cobro mensual independiente del consumo' },
  { termino: 'Net Billing', definicion: 'Sistema de inyeccion de excedentes de generacion solar' },
  { termino: 'PMGD', definicion: 'Pequeno Medio de Generacion Distribuida (hasta 9 MW)' },
  { termino: 'Peaje', definicion: 'Cargo por uso de redes de transmision' },
];

export default function EnergiaChile() {
  const [busqueda, setBusqueda] = useState('');
  const [seccionActiva, setSeccionActiva] = useState('buscador');

  // Calculadora
  const [electroSeleccionados, setElectroSeleccionados] = useState<string[]>(['Refrigerador', 'Televisor LED 42"', 'Lavadora']);
  const [precioKwh, setPrecioKwh] = useState('145');
  const [horasUsoExtra, setHorasUsoExtra] = useState<Record<string, string>>({});

  const distribuidorasFiltradas = DISTRIBUIDORAS.filter(dist =>
    dist.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    dist.region.toLowerCase().includes(busqueda.toLowerCase()) ||
    dist.cobertura.toLowerCase().includes(busqueda.toLowerCase())
  );

  const toggleElectro = (nombre: string) => {
    setElectroSeleccionados(prev =>
      prev.includes(nombre)
        ? prev.filter(e => e !== nombre)
        : [...prev, nombre]
    );
  };

  const calcularConsumo = () => {
    let consumoTotal = 0;
    const detalles: { nombre: string; consumo: number; costo: number }[] = [];

    electroSeleccionados.forEach(nombre => {
      const electro = ELECTRODOMESTICOS.find(e => e.nombre === nombre);
      if (electro) {
        const horasExtra = parseFloat(horasUsoExtra[nombre] || '0');
        const horasReales = electro.horas + horasExtra;
        const consumo = (electro.potencia * horasReales) / 1000;
        const costo = consumo * parseFloat(precioKwh);
        consumoTotal += consumo;
        detalles.push({ nombre, consumo, costo });
      }
    });

    const costoTotal = consumoTotal * parseFloat(precioKwh);
    return { consumoTotal, costoTotal, detalles };
  };

  const consumo = calcularConsumo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-yellow-900 to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-700 to-orange-700 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-5xl mb-4 block">⚡</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Energia Chile
            </h1>
            <p className="text-yellow-100">
              Distribuidoras, tarifas, calculadora de consumo y subsidios
            </p>
          </motion.div>
        </div>
      </header>

      {/* Navegacion */}
      <nav className="bg-slate-800/50 backdrop-blur sticky top-0 z-40 border-b border-yellow-500/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3">
            {[
              { id: 'buscador', icon: '🔍', label: 'Distribuidoras' },
              { id: 'tarifas', icon: '💰', label: 'Tarifas' },
              { id: 'calculadora', icon: '🧮', label: 'Calculadora' },
              { id: 'subsidios', icon: '🎁', label: 'Subsidios' },
              { id: 'derechos', icon: '⚖️', label: 'Derechos' },
              { id: 'glosario', icon: '📖', label: 'Glosario' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSeccionActiva(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  seccionActiva === tab.id
                    ? 'bg-yellow-600 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Buscador de Distribuidoras */}
        {seccionActiva === 'buscador' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 mb-6 border border-yellow-500/30">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🔍</span> Buscador de Distribuidoras Electricas
              </h2>

              <input
                type="text"
                placeholder="Buscar por nombre, region o cobertura..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
              />

              <p className="text-sm text-yellow-400 mt-4">
                {distribuidorasFiltradas.length} distribuidoras encontradas
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {distribuidorasFiltradas.map((dist, i) => (
                <motion.div
                  key={dist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-800/50 backdrop-blur rounded-xl p-5 border border-slate-700 hover:border-yellow-500/50 transition-all"
                >
                  <h3 className="font-bold text-white mb-3">{dist.nombre}</h3>

                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400">
                      <span className="text-yellow-400">Region:</span> {dist.region}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-yellow-400">Cobertura:</span> {dist.cobertura}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-yellow-400">Clientes:</span> {dist.clientes.toLocaleString('es-CL')}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-yellow-400">Telefono:</span> {dist.telefono}
                    </p>
                    <a
                      href={`https://${dist.web}`}
                      target="_blank"
                      className="text-yellow-400 hover:underline block"
                    >
                      {dist.web}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Tarifas */}
        {seccionActiva === 'tarifas' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>💰</span> Tarifas Electricas
            </h2>

            <div className="space-y-4">
              {TARIFAS.map((tarifa, i) => (
                <motion.div
                  key={tarifa.codigo}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur rounded-xl p-5 border border-slate-700"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-yellow-600 text-white rounded-lg font-mono font-bold">
                          {tarifa.codigo}
                        </span>
                        <h3 className="text-lg font-bold text-white">{tarifa.nombre}</h3>
                      </div>
                      <p className="text-gray-400 mt-1">{tarifa.descripcion}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-yellow-400">${tarifa.precio}</p>
                      <p className="text-sm text-gray-400">por kWh aprox.</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full">
                      Potencia: {tarifa.potencia}
                    </span>
                    <span className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full">
                      Uso: {tarifa.uso}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 bg-yellow-900/30 rounded-xl p-4 border border-yellow-500/30">
              <p className="text-yellow-300 text-sm">
                <strong>Nota:</strong> Los precios son referenciales y varian segun la empresa distribuidora
                y periodo de facturacion. Consulte su boleta para el precio exacto.
              </p>
            </div>
          </motion.section>
        )}

        {/* Calculadora */}
        {seccionActiva === 'calculadora' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🧮</span> Calculadora de Consumo Electrico
            </h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-yellow-500/30">
                <h3 className="text-lg font-bold text-white mb-4">Selecciona tus electrodomesticos</h3>

                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-2">Precio kWh ($)</label>
                  <input
                    type="number"
                    value={precioKwh}
                    onChange={(e) => setPrecioKwh(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:border-yellow-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                  {ELECTRODOMESTICOS.map((electro) => (
                    <div
                      key={electro.nombre}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        electroSeleccionados.includes(electro.nombre)
                          ? 'bg-yellow-600/30 border border-yellow-500'
                          : 'bg-slate-700/50 border border-slate-600 hover:border-slate-500'
                      }`}
                      onClick={() => toggleElectro(electro.nombre)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white">{electro.nombre}</span>
                        <span className="text-yellow-400 text-sm">{electro.potencia}W</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Uso promedio: {electro.horas} hrs/mes = {electro.consumo} kWh
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 backdrop-blur rounded-2xl p-6 border border-yellow-500/30">
                <h3 className="text-lg font-bold text-white mb-4">Resumen de consumo mensual</h3>

                {consumo.detalles.length > 0 ? (
                  <div className="space-y-4">
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                      {consumo.detalles.map((item) => (
                        <div key={item.nombre} className="flex justify-between text-gray-300 text-sm">
                          <span>{item.nombre}</span>
                          <span>{item.consumo.toFixed(1)} kWh (${Math.round(item.costo).toLocaleString('es-CL')})</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-yellow-500/30 pt-4">
                      <div className="flex justify-between text-lg text-white mb-2">
                        <span>Consumo total</span>
                        <span className="font-bold text-yellow-400">{consumo.consumoTotal.toFixed(1)} kWh</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold text-white">
                        <span>Costo estimado</span>
                        <span className="text-yellow-400">${Math.round(consumo.costoTotal).toLocaleString('es-CL')}</span>
                      </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="text-sm text-gray-400">
                        Este calculo no incluye cargos fijos, impuestos ni otros servicios.
                        El monto real puede variar.
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">
                    Selecciona electrodomesticos para calcular tu consumo
                  </p>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* Subsidios */}
        {seccionActiva === 'subsidios' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🎁</span> Subsidios de Energia
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {SUBSIDIOS.map((subsidio, i) => (
                <motion.div
                  key={subsidio.nombre}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur rounded-xl p-5 border border-slate-700"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">{subsidio.nombre}</h3>
                    <span className="px-3 py-1 bg-green-600/30 text-green-300 rounded-full text-sm">
                      {subsidio.monto}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-3">{subsidio.descripcion}</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-yellow-400">Requisito: <span className="text-gray-300">{subsidio.requisito}</span></p>
                    <p className="text-yellow-400">Cobertura: <span className="text-gray-300">{subsidio.cobertura}</span></p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">Como postular a subsidios</h3>
              <ol className="space-y-3 text-gray-400">
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-yellow-600 text-white flex items-center justify-center text-sm flex-shrink-0">1</span>
                  Actualiza tu Registro Social de Hogares en registrosocial.gob.cl
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-yellow-600 text-white flex items-center justify-center text-sm flex-shrink-0">2</span>
                  Verifica si cumples los requisitos de vulnerabilidad
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-yellow-600 text-white flex items-center justify-center text-sm flex-shrink-0">3</span>
                  Postula en tu municipalidad o a traves del sitio del Ministerio de Energia
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-yellow-600 text-white flex items-center justify-center text-sm flex-shrink-0">4</span>
                  El beneficio se aplica automaticamente en tu boleta
                </li>
              </ol>
            </div>
          </motion.section>
        )}

        {/* Derechos */}
        {seccionActiva === 'derechos' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>⚖️</span> Derechos del Consumidor Electrico
            </h2>

            <div className="space-y-4">
              {DERECHOS.map((item, i) => (
                <motion.div
                  key={item.derecho}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur rounded-xl p-5 border border-slate-700"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{item.derecho}</h3>
                      <p className="text-gray-400">{item.descripcion}</p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-600/30 text-yellow-300 rounded-full text-sm whitespace-nowrap">
                      {item.plazo}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 bg-red-900/30 rounded-xl p-4 border border-red-500/30">
              <h4 className="font-bold text-red-400 mb-2">Para reclamar ante la SEC:</h4>
              <p className="text-red-200/80 text-sm mb-2">
                Si la empresa no responde satisfactoriamente en 10 dias habiles, puedes reclamar en:
              </p>
              <a
                href="https://www.sec.cl"
                target="_blank"
                className="text-red-400 hover:underline text-sm"
              >
                www.sec.cl - Superintendencia de Electricidad y Combustibles
              </a>
            </div>
          </motion.section>
        )}

        {/* Glosario */}
        {seccionActiva === 'glosario' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📖</span> Glosario Electrico
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {GLOSARIO.map((item, i) => (
                <motion.div
                  key={item.termino}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700"
                >
                  <h3 className="font-bold text-yellow-400 mb-2">{item.termino}</h3>
                  <p className="text-sm text-gray-400">{item.definicion}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-yellow-500/30 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h4 className="font-bold text-white mb-2">SEC</h4>
              <a href="https://www.sec.cl" target="_blank" className="text-yellow-400 hover:underline text-sm">
                sec.cl
              </a>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Ministerio de Energia</h4>
              <a href="https://www.energia.gob.cl" target="_blank" className="text-yellow-400 hover:underline text-sm">
                energia.gob.cl
              </a>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">CNE</h4>
              <a href="https://www.cne.cl" target="_blank" className="text-yellow-400 hover:underline text-sm">
                cne.cl
              </a>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-6 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              Parte de{' '}
              <a href="https://newcool-informada.vercel.app" className="text-yellow-400 hover:underline">
                NewCooltura Informada
              </a>
              {' '}- Informacion ciudadana
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
