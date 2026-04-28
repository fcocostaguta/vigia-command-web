// ─────────────────────────────────────────────────────
// VIGÍA Command — Contenido editable
// Edita este archivo para cambiar cualquier texto de la landing.
// ─────────────────────────────────────────────────────

export const MANDO_URL = 'https://mando.vigiacommand.cl'

export const NAV_LINKS = [
  { label: 'Solución',       href: '#solucion' },
  { label: 'Cómo funciona',  href: '#como-funciona' },
  { label: 'Modo Táctico',   href: '#modo-tactico' },
  { label: 'Contacto',       href: '#contacto' },
]

export const HERO = {
  eyebrow:       'Sistema operacional · Versión de desarrollo',
  title_plain:   'Monitoreo operacional para ',
  title_em:      'bomberos',
  title_end:     ' en tiempo real',
  subtitle:      'VIGÍA entrega visibilidad fisiológica, alertas y trazabilidad al mando durante emergencias. Información que salva vidas.',
  cta_primary:   'Solicitar demo →',
  cta_secondary: 'Ingresar a Mando',
}

export const PROBLEM = {
  tag:   'El problema',
  title: 'El mando opera con información incompleta',
  items: [
    {
      n:     '01',
      title: 'Decisiones a ciegas',
      desc:  'El mando toma decisiones críticas con información incompleta sobre el estado de sus operadores en el interior.',
    },
    {
      n:     '02',
      title: 'Estado fisiológico invisible',
      desc:  'La carga cardíaca y el estrés del bombero no son visibles desde el exterior del siniestro.',
    },
    {
      n:     '03',
      title: 'Comunicación degradada',
      desc:  'Las radiocomunicaciones se saturan o pierden en estructuras. La información llega fragmentada o tarde.',
    },
    {
      n:     '04',
      title: 'Sin trazabilidad post-incidente',
      desc:  'Después del incidente, falta un registro objetivo de decisiones, asignaciones y evolución operacional.',
    },
  ],
}

export const SOLUTION = {
  tag:      'La solución',
  title:    'Visibilidad total del operador',
  subtitle: 'VIGÍA centraliza datos fisiológicos, señal, asignaciones y alertas. Permite al mando priorizar atención, detectar riesgos y registrar la evolución del incidente.',
  features: [
    {
      title: 'Datos fisiológicos centralizados',
      desc:  'Frecuencia cardíaca, temperatura y biometría del bombero, consolidados en tiempo real.',
    },
    {
      title: 'Estado y asignaciones por operador',
      desc:  'Cada bombero tiene un estado visible: activo, en alerta, en rehabilitación o fuera de zona.',
    },
    {
      title: 'Alertas tempranas automáticas',
      desc:  'Umbrales configurables para BPM, señal y batería que activan alertas antes del colapso.',
    },
    {
      title: 'Registro continuo del incidente',
      desc:  'Cada evento queda registrado con timestamp para análisis posterior y respaldo de decisiones.',
    },
  ],
  stats: [
    { label: 'Latencia de alerta',          value: '< 3 seg',          sub: 'Desde sensor hasta mando' },
    { label: 'Operadores simultáneos',       value: '32+',              sub: 'Por incidente activo' },
    { label: 'Retención de datos',           value: '100%',             sub: 'Registro completo post-incidente' },
    { label: 'Conectividad',                 value: 'BLE · WiFi · LoRa', sub: 'Según topografía del incidente' },
  ],
}

export const HOW_IT_WORKS = {
  tag:      'Cómo funciona',
  title:    'Del cuerpo del bombero al mando',
  subtitle: 'Una arquitectura diseñada para operar en entornos hostiles, con redundancia de conectividad y transmisión de baja latencia.',
  steps: [
    { n: '01', label: 'Sensor / Wearable',        sub: 'BLE · Biometría del operador',        icon: 'sensor' },
    { n: '02', label: 'Nodo Personal ESP32',       sub: 'Concentrador individual · BLE',        icon: 'node'   },
    { n: '03', label: 'Gateway Táctico',           sub: 'WiFi / LoRa según escenario',          icon: 'gateway'},
    { n: '04', label: 'Backend VIGÍA',             sub: 'Next.js · Firebase · Tiempo real',     icon: 'cloud'  },
    { n: '05', label: 'Modo Táctico',              sub: 'Tablet / iPad del mando',              icon: 'tablet' },
  ],
}

export const TACTICAL_MODE = {
  tag:      'Modo Táctico',
  title:    'La consola del mando',
  subtitle: 'Diseñado para tablet en campo, con interfaz de alta legibilidad en cualquier condición de luz.',
  cells: [
    { title: 'Emergencia activa',       desc: 'Vista consolidada del incidente en curso con tipo, nivel de alarma y tiempo transcurrido.', icon: 'alert'  },
    { title: 'Bomberos asignados',      desc: 'Registro de quién está adentro, en qué zona y en qué momento ingresó.',                     icon: 'map'    },
    { title: 'Estado fisiológico',      desc: 'BPM, temperatura y biometría de cada operador en tiempo real, con umbrales configurables.',  icon: 'heart'  },
    { title: 'Alertas',                 desc: 'Notificaciones automáticas por umbral fisiológico, pérdida de señal o inactividad prolongada.', icon: 'alert' },
    { title: 'Señal y conectividad',    desc: 'Calidad de enlace de cada nodo personal con el gateway táctico, por operador.',              icon: 'wifi'   },
    { title: 'Rehabilitación',          desc: 'Control de rotación y descanso del personal, con registro de tiempo en intervención.',       icon: 'rehab'  },
    { title: 'Historial del incidente', desc: 'Línea de tiempo de eventos, alertas y decisiones durante el desarrollo de la emergencia.',   icon: 'hist'   },
    { title: 'Registro post-incidente', desc: 'Exportación estructurada del incidente para informes, auditoría y análisis institucional.',  icon: 'doc'    },
    { title: 'Acceso por mando',        desc: 'El Modo Táctico es accesible sólo para el oficial de mando autorizado, sin exposición pública.', icon: 'lock' },
  ],
}

export const BLACK_BOX = {
  tag:   'Caja negra',
  title: 'El registro objetivo del incidente',
  body: [
    'VIGÍA registra de forma continua todos los eventos relevantes durante una emergencia: alertas fisiológicas, decisiones de mando, cambios de asignación y evolución de la señal.',
    'Este registro es la base para el análisis post-incidente, el aprendizaje institucional y el respaldo objetivo de las decisiones tomadas en campo.',
  ],
  stats: [
    { label: 'Retención',    value: 'Permanente' },
    { label: 'Granularidad', value: 'Por evento'  },
    { label: 'Exportación',  value: 'JSON · PDF'  },
  ],
  logs: [
    { ts: '14:22:07', type: 'INGRESO',         msg: 'B-02 · Cap. Herrera ingresa a zona interior — ACTIVO' },
    { ts: '14:24:53', type: 'BPM ALERT',       msg: 'B-02 · Frecuencia cardíaca supera umbral: 127 bpm' },
    { ts: '14:25:11', type: 'DECISIÓN MANDO',  msg: 'Retiro preventivo B-02 desde zona interior' },
    { ts: '14:26:02', type: 'SEÑAL',           msg: 'B-03 · Degradación de señal BLE → RSSI -82 dBm' },
    { ts: '14:28:47', type: 'REHAB',           msg: 'B-02 · Inicia período de rehabilitación — 15 min' },
    { ts: '14:31:00', type: 'REINGRESO',       msg: 'B-05 · Brig. Torres asignado a zona interior en reemplazo' },
  ],
}

export const BENEFITS = {
  tag:   'Beneficios',
  title: 'Por qué VIGÍA cambia la operación',
  items: [
    { title: 'Mayor seguridad operacional',         desc: 'El mando puede detectar y actuar ante señales de riesgo fisiológico antes de que ocurra un evento crítico.' },
    { title: 'Decisiones informadas en tiempo real', desc: 'Información consolidada y actualizada permite tomar decisiones con mayor certeza y menor latencia.' },
    { title: 'Alertas tempranas automáticas',        desc: 'Umbrales configurables que notifican al mando sin depender de la comunicación verbal del bombero.' },
    { title: 'Trazabilidad operacional completa',    desc: 'Cada asignación, ingreso, alerta y decisión queda registrada con timestamp, sin depender de la memoria humana.' },
    { title: 'Profesionalización del mando',         desc: 'Herramientas de gestión táctica equivalentes a los estándares de otras operaciones críticas.' },
    { title: 'Base para análisis post-incidente',    desc: 'Datos estructurados del incidente para informes, auditoría, formación y mejora continua institucional.' },
  ],
}

export const DEV_STATUS = {
  tag:          'Estado actual',
  title:        'En desarrollo activo',
  status_label: 'Validación técnica',
  body:         'VIGÍA se encuentra en etapa de desarrollo y validación técnica. Trabajamos con sensores BLE, hardware ESP32 y protocolos LoRa, realizando pruebas de integración antes de iniciar validación en terreno. Creemos en la honestidad sobre el estado real del sistema.',
  stack: [
    { label: 'Sensor BLE / Wearable',         status: 'PROTOTIPO'      },
    { label: 'Nodo personal ESP32',            status: 'EN PRUEBAS'     },
    { label: 'Gateway LoRa / WiFi',            status: 'EN DESARROLLO'  },
    { label: 'Backend Next.js / Firebase',     status: 'EN DESARROLLO'  },
    { label: 'Modo Táctico (iPad)',            status: 'PROTOTIPO'      },
    { label: 'Pruebas en terreno',             status: 'PLANIFICADO'    },
  ],
  milestones: [
    { state: 'done',    label: 'Arquitectura conceptual definida', desc: 'Flujo completo de datos desde sensor hasta consola de mando documentado y validado.' },
    { state: 'done',    label: 'Prototipo de sensor BLE',          desc: 'Dispositivo wearable con lectura de BPM sobre ESP32 y transmisión por BLE.' },
    { state: 'active',  label: 'Integración gateway y backend',    desc: 'Transmisión extremo a extremo desde nodo personal hasta visualización en tiempo real.' },
    { state: 'pending', label: 'Validación en ejercicios reales',  desc: 'Pruebas de campo con cuerpos de bomberos en ejercicios controlados.' },
    { state: 'pending', label: 'Versión piloto institucional',      desc: 'Despliegue supervisado con un cuerpo de bomberos para validación operacional completa.' },
  ],
}

export const CTA = {
  tag:      'Contacto',
  title:    'Conversemos sobre una demo',
  subtitle: 'Si representas un cuerpo de bomberos, municipalidad, institución de emergencia o eres un potencial colaborador, nos interesa conocerte.',
  cta_primary:   'Solicitar demo →',
  cta_secondary: 'Ingresar a Mando',
}

export const FOOTER = {
  tagline: 'Tecnología para seguridad operacional. Sistema de monitoreo fisiológico y táctico para bomberos en emergencias activas.',
  domain:  'vigiacommand.cl',
  email:   'contacto@vigiacommand.cl',
  nav_col: [
    { label: 'Solución',       href: '#solucion'      },
    { label: 'Cómo funciona',  href: '#como-funciona' },
    { label: 'Modo Táctico',   href: '#modo-tactico'  },
    { label: 'Estado actual',  href: '#estado'        },
  ],
}

// ─── Tactical Panel (datos de prueba) ───
export const INIT_OPERATORS = [
  { id: 'B-01', name: 'Sgt. Morales',  bpm: 88,  sig: 4, status: 'ACTIVO', batt: 92, zone: 'INT-1' },
  { id: 'B-02', name: 'Cap. Herrera',  bpm: 127, sig: 3, status: 'ALERTA', batt: 78, zone: 'INT-2' },
  { id: 'B-03', name: 'Brig. Soto',    bpm: 74,  sig: 4, status: 'ACTIVO', batt: 88, zone: 'INT-1' },
  { id: 'B-04', name: 'Sub. Vásquez',  bpm: 96,  sig: 2, status: 'REHAB',  batt: 65, zone: 'REHAB' },
  { id: 'B-05', name: 'Brig. Torres',  bpm: 82,  sig: 4, status: 'ACTIVO', batt: 95, zone: 'INT-1' },
  { id: 'B-06', name: 'Cap. Núñez',    bpm: 109, sig: 3, status: 'ACTIVO', batt: 71, zone: 'INT-2' },
]

export const PANEL_INCIDENT = {
  status: 'EMERGENCIA ACTIVA',
  type:   'INCENDIO ESTRUCTURAL · 3° ALARMA',
}
