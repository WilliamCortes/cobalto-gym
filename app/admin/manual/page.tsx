import Link from "next/link";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ marginBottom: 48 }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: 1.5, color: "#f0f6fc", marginBottom: 20, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", gap: 10 }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ fontSize: 13, fontWeight: 700, color: "#22c55e", letterSpacing: 0.5, marginBottom: 10, textTransform: "uppercase" }}>{title}</h3>
      {children}
    </div>
  );
}

function P({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <p style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.75, marginBottom: 10, ...style }}>{children}</p>;
}

function Steps({ items }: { items: string[] }) {
  return (
    <ol style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ minWidth: 22, height: 22, borderRadius: "50%", background: "rgba(34,197,94,.15)", border: "1px solid rgba(34,197,94,.3)", color: "#22c55e", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
          <span style={{ fontSize: 13, color: "#c9d1d9", lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: item }} />
        </li>
      ))}
    </ol>
  );
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: "12px 16px", background: "rgba(245,158,11,.08)", border: "1px solid rgba(245,158,11,.25)", borderRadius: 8, fontSize: 12, color: "#fbbf24", lineHeight: 1.6, marginTop: 10 }}>
      ⚠️ {children}
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: "12px 16px", background: "rgba(34,197,94,.07)", border: "1px solid rgba(34,197,94,.2)", borderRadius: 8, fontSize: 12, color: "#86efac", lineHeight: 1.6, marginTop: 10 }}>
      💡 {children}
    </div>
  );
}

function Limit({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: "12px 16px", background: "rgba(239,68,68,.07)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 8, fontSize: 12, color: "#fca5a5", lineHeight: 1.6, marginTop: 10 }}>
      🚫 {children}
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: "auto", marginTop: 12 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,.1)" }}>
            {headers.map((h) => (
              <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#8b949e", fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", fontSize: 10, whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: "10px 12px", color: "#c9d1d9", verticalAlign: "top", lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: cell }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TOC = [
  { id: "acceso", label: "Acceso y login" },
  { id: "dashboard", label: "Dashboard" },
  { id: "usuarios", label: "Gestión de usuarios" },
  { id: "suscripciones", label: "Suscripciones" },
  { id: "planes", label: "Planes de contenido" },
  { id: "portal", label: "Portal del cliente" },
  { id: "flujos", label: "Flujos de trabajo recomendados" },
  { id: "limitaciones", label: "Limitaciones y pendientes" },
];

export default function ManualPage() {
  return (
    <div style={{ maxWidth: 860 }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#22c55e", textTransform: "uppercase", marginBottom: 8 }}>Manual de usuario</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: 2, color: "#f0f6fc", marginBottom: 12 }}>
          GUÍA DEL PANEL ADMIN
        </h1>
        <p style={{ fontSize: 14, color: "#8b949e", lineHeight: 1.7, maxWidth: 620 }}>
          Todo lo que necesitas saber para gestionar Gym Cobalto desde el panel de administración. Cubre usuarios, suscripciones, planes de nutrición/entrenamiento y el portal del cliente.
        </p>
      </div>

      {/* TOC */}
      <div style={{ background: "#0d1117", borderRadius: 12, border: "1px solid rgba(255,255,255,.07)", padding: "20px 24px", marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#8b949e", textTransform: "uppercase", marginBottom: 14 }}>Contenido</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 24px" }}>
          {TOC.map((item, i) => (
            <a key={item.id} href={`#${item.id}`} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#8b949e", textDecoration: "none" }}>
              <span style={{ fontSize: 10, color: "#22c55e", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── 1. Acceso ─────────────────────────────────────────── */}
      <Section id="acceso" title="01 · Acceso y login">
        <Sub title="Cómo entrar al panel">
          <P>Ve a <strong style={{ color: "#f0f6fc" }}>cobalto-gym.vercel.app/login</strong> e inicia sesión con tu correo y contraseña de administrador.</P>
          <Steps items={[
            'Ingresa tu correo de administrador.',
            'Escribe tu contraseña.',
            'Haz clic en <strong>Iniciar sesión</strong> — serás redirigido automáticamente a <code style="background:#161b22;padding:2px 6px;border-radius:4px;">/admin</code>.',
          ]} />
          <Warn>Si ves la página del <strong>Portal Cliente</strong> en vez del Panel Admin, tu cuenta no tiene el rol admin. Contacta al desarrollador para que ejecute la migración SQL correspondiente.</Warn>
        </Sub>
        <Sub title="Cerrar sesión">
          <P>Haz clic en el botón rojo <strong style={{ color: "#fca5a5" }}>Cerrar sesión</strong> al fondo de la barra lateral izquierda. La sesión se termina de inmediato.</P>
        </Sub>
        <Sub title="Si olvidaste tu contraseña">
          <P>Ve a <strong style={{ color: "#f0f6fc" }}>cobalto-gym.vercel.app/login</strong>, haz clic en <em>¿Olvidaste tu contraseña?</em> e ingresa tu correo. Recibirás un enlace de restablecimiento.</P>
        </Sub>
      </Section>

      {/* ── 2. Dashboard ──────────────────────────────────────── */}
      <Section id="dashboard" title="02 · Dashboard">
        <P>El dashboard es la pantalla de inicio del panel. Te da una vista rápida del estado del gimnasio.</P>
        <Table
          headers={["Tarjeta", "Qué muestra"]}
          rows={[
            ["Total Usuarios", "Cantidad de perfiles registrados en el sistema."],
            ["Suscripciones Activas", "Suscripciones pagadas cuya fecha de vencimiento es hoy o futura."],
            ["Vencen en 7 días", "Suscripciones activas que vencen en los próximos 7 días — úsalo para renovar proactivamente."],
            ["Pagos Pendientes", "Suscripciones con estado <em>pendiente</em> o <em>vencido</em>."],
            ["Planes Creados", "Total de planes de nutrición/entrenamiento en el sistema."],
          ]}
        />
        <P style={{ marginTop: 16 }}>Las secciones <strong style={{ color: "#f0f6fc" }}>Usuarios Recientes</strong> y <strong style={{ color: "#f0f6fc" }}>Suscripciones Recientes</strong> muestran los últimos 5 registros. Haz clic en cualquier fila para ir al detalle.</P>
        <Tip>Si <em>Vencen en 7 días</em> es mayor que 0, revisa esos usuarios y coordina renovaciones antes de que expiren.</Tip>
      </Section>

      {/* ── 3. Usuarios ───────────────────────────────────────── */}
      <Section id="usuarios" title="03 · Gestión de usuarios">
        <Sub title="Crear un usuario nuevo">
          <P>Los usuarios se crean directamente desde el panel, en <strong style={{ color: "#f0f6fc" }}>Usuarios → + Nuevo Usuario</strong>.</P>
          <Steps items={[
            'Ve a <strong>Usuarios</strong> y haz clic en el botón verde <strong>+ Nuevo Usuario</strong>.',
            'Completa nombre, correo, contraseña temporal, teléfono y tipo de membresía.',
            'Haz clic en <strong>Crear usuario</strong>. El cliente aparece en la lista de inmediato.',
            'Comparte el correo y la contraseña temporal con el cliente para que pueda ingresar al portal.',
          ]} />
          <Warn>El correo electrónico no se puede cambiar una vez creado el usuario. Verifica que esté correcto antes de guardar.</Warn>
        </Sub>

        <Sub title="Editar perfil de un usuario">
          <P>Ve a <strong style={{ color: "#f0f6fc" }}>Usuarios → clic en Ver →</strong> del usuario. En la columna izquierda encontrarás el formulario de perfil.</P>
          <Table
            headers={["Campo", "Descripción"]}
            rows={[
              ["Nombre completo", "Nombre que verá Edwin en el panel y que el cliente ve en el portal."],
              ["Teléfono", "Contacto interno. No se muestra al cliente."],
              ["Tipo de membresía", "<strong>basic</strong> (sin asesoría), <strong>semi-asistido</strong> (seguimiento periódico), <strong>personalizado</strong> (asesoría completa)."],
              ["Notas internas", "Observaciones privadas — el cliente no las ve. Útil para anotar restricciones, lesiones, preferencias."],
              ["Acceso activo", "Si está desmarcado, el usuario no puede entrar al portal. Úsalo para suspender temporalmente sin eliminar la cuenta."],
            ]}
          />
          <Tip>Guarda siempre con el botón verde <strong>Guardar Perfil</strong> al fondo del formulario.</Tip>
        </Sub>

        <Sub title="Estadísticas de actividad del usuario">
          <P>En la parte superior del detalle de cada usuario hay un banner con 4 indicadores calculados automáticamente:</P>
          <Table
            headers={["Indicador", "Qué muestra"]}
            rows={[
              ["Miembro desde", "Fecha de la primera suscripción pagada."],
              ["Días activos", "Suma total de días cubiertos por todas las suscripciones pagadas."],
              ["🔥 Racha actual", "Meses consecutivos activos sin interrupciones mayores a 2 días. Si la suscripción más reciente está vencida, la racha es 0."],
              ["Total pagos", "Número de suscripciones pagadas registradas."],
            ]}
          />
        </Sub>

        <Sub title="Registrar una suscripción">
          <P>En la columna derecha del detalle del usuario está la sección <strong style={{ color: "#f0f6fc" }}>Suscripción</strong>.</P>
          <Steps items={[
            'Selecciona el <strong>Tipo de plan</strong> (mensual, quincenal, semestral, etc.).',
            'La <strong>fecha de fin se calcula automáticamente</strong> según el tipo de plan y la fecha de inicio — el campo se muestra en verde con la etiqueta <em>Fin (auto)</em>. Puedes modificarla manualmente si necesitas.',
            'Ingresa el <strong>Monto COP</strong> (por defecto $70.000).',
            'Selecciona el <strong>Estado de pago</strong>: <em>Pagado</em> si ya pagó, <em>Pendiente</em> si falta confirmar.',
            'Selecciona el <strong>Método de pago</strong>: Nequi, Daviplata, Transferencia o Efectivo.',
            'Haz clic en <strong>+ Registrar Suscripción</strong>.',
          ]} />
          <Tip>Lógica de fechas automáticas: mensual = inicio + 30 días (ej. paga el 5 de marzo → acceso hasta el 4 de abril). Quincenal = +14 días. Semanal = +6 días. Trimestral = +3 meses -1 día.</Tip>
          <Tip>Un usuario puede tener múltiples suscripciones históricas. La más reciente con estado <em>Pagado</em> y fecha vigente activa el acceso al portal.</Tip>
          <Warn>Para <strong>eliminar</strong> una suscripción, haz clic en la <strong style={{ color: "#ef4444" }}>×</strong> roja al lado del registro. Esta acción es permanente.</Warn>
        </Sub>

        <Sub title="Renovar suscripción vencida rápidamente">
          <P>Las suscripciones vencidas o pendientes muestran un botón <strong style={{ color: "#22c55e" }}>🔄 Renovar</strong>. Al hacer clic, crea automáticamente una nueva suscripción pagada desde hoy con el mismo plan y monto, calculando las fechas automáticamente.</P>
          <Tip>Usa <strong>Renovar</strong> cuando el cliente ya pagó y solo necesitas registrar el nuevo período en segundos, sin llenar el formulario completo.</Tip>
        </Sub>

        <Sub title="Asignar planes de nutrición o entrenamiento">
          <P>En la columna derecha del detalle del usuario está la sección <strong style={{ color: "#f0f6fc" }}>Planes Asignados</strong>. Muestra todos los planes existentes y te permite activarlos o desactivarlos por usuario.</P>
          <Steps items={[
            'Busca el plan que quieres asignar en la lista.',
            'Haz clic en el botón verde <strong>Asignar</strong>.',
            'El plan queda activo (fondo verde) y el botón cambia a <strong style="color:#ef4444">Quitar</strong>.',
            'El cliente verá el plan en su portal de inmediato.',
          ]} />
          <Limit>Un usuario solo puede ver en su portal los planes asignados aquí. Si no tiene ninguno asignado, el portal le mostrará la lista de planes genéricos del sitio (estática).</Limit>
        </Sub>

        <Sub title="Registrar medidas y progreso">
          <P>En la columna izquierda, debajo del perfil, está la sección <strong style={{ color: "#f0f6fc" }}>Progreso</strong>. Permite llevar un historial de medidas corporales.</P>
          <Table
            headers={["Campo", "Notas"]}
            rows={[
              ["Peso (kg)", "Acepta decimales — ej. 75.5"],
              ["Cintura (cm)", "Acepta decimales — ej. 82.5"],
              ["Cadera (cm)", "Acepta decimales — ej. 95.0"],
              ["Pecho (cm)", "Acepta decimales — ej. 102.3"],
              ["Fecha", "Por defecto es hoy. Puedes registrar fechas pasadas."],
              ["Notas", "Observaciones adicionales de la sesión."],
            ]}
          />
          <P>Todos los campos son opcionales. Puedes registrar solo el peso si es lo único que mediste.</P>
          <Tip>Las entradas aparecen en orden cronológico descendente (más reciente primero). Haz clic en la <strong style={{ color: "#ef4444" }}>×</strong> para eliminar una entrada incorrecta.</Tip>
        </Sub>

        <Sub title="Tareas para el cliente">
          <P>La sección <strong style={{ color: "#f0f6fc" }}>Tareas</strong> te permite asignar compromisos al cliente que aparecen en su panel.</P>
          <Steps items={[
            'Ingresa el <strong>Título</strong> de la tarea (obligatorio).',
            'Agrega una <strong>Descripción</strong> opcional con más detalle.',
            'Establece una <strong>Fecha límite</strong> si aplica.',
            'Haz clic en <strong>+ Agregar Tarea</strong>.',
          ]} />
          <P>Para <strong>marcar una tarea como completada</strong>, haz clic en el cuadro de verificación al inicio de cada tarea. Cambia a verde con ✓ y el texto se tacha. Haz clic de nuevo para desmarcarla.</P>
          <P>Para <strong>eliminar</strong> una tarea, haz clic en la <strong style={{ color: "#ef4444" }}>×</strong> roja a la derecha.</P>
        </Sub>
      </Section>

      {/* ── 4. Suscripciones ──────────────────────────────────── */}
      <Section id="suscripciones" title="04 · Suscripciones">
        <P>La página <strong style={{ color: "#f0f6fc" }}>Suscripciones</strong> (menú lateral) muestra todas las suscripciones de todos los usuarios en una sola vista.</P>
        <Sub title="Filtros de estado">
          <Table
            headers={["Filtro", "Muestra"]}
            rows={[
              ["Todos", "Todas las suscripciones sin importar estado."],
              ["Pagados", "Solo suscripciones con pago confirmado."],
              ["Pendientes", "Suscripciones en espera de pago."],
              ["Vencidos", "Suscripciones marcadas como vencidas."],
            ]}
          />
        </Sub>
        <Sub title="Cambiar el estado de pago">
          <P>En la columna <strong style={{ color: "#f0f6fc" }}>Acciones</strong> de cada fila hay botones para cambiar el estado rápidamente sin entrar al detalle del usuario:</P>
          <Table
            headers={["Botón", "Acción"]}
            rows={[
              ["<strong style='color:#22c55e'>Marcar pagado</strong>", "Aparece cuando el estado es <em>Pendiente</em> o <em>Vencido</em>. Confirma el pago."],
              ["<strong style='color:#ef4444'>Marcar vencido</strong>", "Aparece cuando el estado es <em>Pagado</em> o <em>Pendiente</em>. Marca como expirado."],
              ["Ver usuario", "Navega al detalle del usuario para más acciones."],
            ]}
          />
        </Sub>
        <Sub title="Resumen de indicadores">
          <P>Las 3 tarjetas en la parte superior muestran conteos globales en tiempo real. Son independientes del filtro activo.</P>
        </Sub>
        <Warn>Desde esta página <strong>no se puede editar</strong> el monto, las fechas ni el método de pago de una suscripción. Para eso debes ir al detalle del usuario (botón <em>Ver usuario</em>) y eliminar y recrear la suscripción con los datos correctos.</Warn>
      </Section>

      {/* ── 5. Planes ─────────────────────────────────────────── */}
      <Section id="planes" title="05 · Planes de contenido">
        <P>Los planes son colecciones de módulos semanales que Edwin asigna a los clientes. Pueden ser de <strong style={{ color: "#22c55e" }}>Nutrición</strong>, <strong style={{ color: "#3b82f6" }}>Entrenamiento</strong> o <strong style={{ color: "#f59e0b" }}>Mixto</strong>.</P>
        <Sub title="Crear un plan">
          <Steps items={[
            'Ve a <strong>Planes</strong> en el menú lateral.',
            'En el formulario de la derecha, escribe el <strong>Título</strong> del plan.',
            'Selecciona el <strong>Tipo</strong> (Nutrición / Entrenamiento / Mixto).',
            'Agrega una <strong>Descripción</strong> opcional.',
            'Haz clic en <strong>Crear Plan →</strong> — serás redirigido automáticamente al editor del plan.',
          ]} />
        </Sub>
        <Sub title="Agregar módulos a un plan">
          <P>Los módulos son las unidades de contenido dentro del plan. Cada módulo pertenece a una semana y opcionalmente a un día de la semana.</P>
          <Steps items={[
            'En el editor del plan, completa el formulario <strong>+ Agregar Módulo</strong>:',
            '<strong>Semana</strong>: número de la semana (1, 2, 3…). Se sugiere automáticamente la siguiente semana.',
            '<strong>Día</strong>: opcional — ej. "Lunes", "Martes". Útil para planes de entrenamiento diario.',
            '<strong>Orden</strong>: número para ordenar módulos dentro de la misma semana/día.',
            '<strong>Título</strong>: nombre del módulo — ej. "Desayuno semana 1", "Pierna".',
            '<strong>Contenido</strong>: texto libre — descripción del plan, lista de alimentos, ejercicios, etc.',
            '<strong>URL de Video</strong>: pega el enlace de YouTube en formato embed (<code style="background:#161b22;padding:2px 6px;border-radius:4px;">https://www.youtube.com/embed/VIDEO_ID</code>).',
            'Haz clic en <strong>Agregar Módulo</strong>.',
          ]} />
          <Tip>Para obtener el URL embed de YouTube: abre el video → clic derecho → <em>Copiar URL de inserción</em>. O reemplaza <code style={{ background: "#161b22", padding: "2px 6px", borderRadius: 4 }}>watch?v=</code> por <code style={{ background: "#161b22", padding: "2px 6px", borderRadius: 4 }}>embed/</code> en la URL.</Tip>
        </Sub>
        <Sub title="Editar un módulo">
          <P>En cada módulo de la lista, haz clic en <strong style={{ color: "#8b949e" }}>✏️ Editar módulo</strong> para expandir el formulario de edición inline. Cambia el título, contenido o video y haz clic en <strong>Guardar cambios</strong>.</P>
          <Tip>La edición inline no recarga la página — los cambios se aplican sin perder el contexto.</Tip>
        </Sub>
        <Sub title="Eliminar un módulo">
          <P>Haz clic en el botón rojo <strong style={{ color: "#ef4444" }}>Eliminar</strong> en la cabecera de cada módulo. La acción es inmediata y permanente.</P>
          <Warn>Eliminar un módulo es irreversible. No hay confirmación — haz clic solo cuando estés seguro.</Warn>
        </Sub>
        <Sub title="Actualizar la configuración del plan">
          <P>En la columna derecha del editor, el formulario <strong style={{ color: "#f0f6fc" }}>Configuración del Plan</strong> permite cambiar el título, descripción y tipo en cualquier momento. Haz clic en <strong>Actualizar Plan</strong>.</P>
        </Sub>
        <Sub title="Eliminar un plan completo">
          <P>Desde la lista de planes (<Link href="/admin/planes" style={{ color: "#22c55e", textDecoration: "none" }}>Planes</Link>), haz clic en el botón <strong style={{ color: "#ef4444" }}>Eliminar</strong> a la derecha de cada plan. Esto elimina el plan y <strong>todos sus módulos</strong>.</P>
          <Warn>Eliminar un plan también elimina todos sus módulos y sus asignaciones a usuarios. Los usuarios ya no podrán ver ese plan en el portal.</Warn>
        </Sub>
      </Section>

      {/* ── 6. Portal ─────────────────────────────────────────── */}
      <Section id="portal" title="06 · Portal del cliente">
        <P>El portal es la vista que tienen tus clientes cuando inician sesión en <strong style={{ color: "#f0f6fc" }}>cobalto-gym.vercel.app/portal</strong>. Solo pueden ver su información.</P>
        <Sub title="Qué ve el cliente">
          <Table
            headers={["Sección del portal", "Qué muestra"]}
            rows={[
              ["Dashboard (<code>/portal</code>)", "Bienvenida con su nombre, accesos rápidos y banner motivacional."],
              ["Nutrición (<code>/portal/planes</code>)", "Lista de planes de contenido del sistema. Al hacer clic en uno ve todos sus módulos semana a semana."],
              ["Rutinas (<code>/portal/rutinas</code>)", "Planes de tipo <em>Entrenamiento</em> o <em>Mixto</em> que Edwin le ha asignado directamente. Si no tiene ninguno, ve un mensaje con botón de WhatsApp."],
              ["Progreso (<code>/portal/progreso</code>)", "Sus medidas corporales (peso, cintura, cadera, pecho) registradas por Edwin, con tarjetas de valor actual y diferencia vs. medición inicial."],
              ["Mi perfil (<code>/portal/perfil</code>)", "Sus datos personales (nombre, correo, teléfono, objetivo) y el estado de su membresía activa con días restantes y detalle del último pago."],
            ]}
          />
        </Sub>
        <Limit>
          Las estadísticas del dashboard del portal (<em>Días activos</em>, <em>Semana actual</em>) son decorativas — no se calculan dinámicamente todavía.
        </Limit>
        <Sub title="Cómo darle acceso al cliente">
          <Steps items={[
            'Crea el usuario desde <strong>Usuarios → + Nuevo Usuario</strong> (ver sección 03).',
            'Asegúrate de que el perfil tenga <strong>Acceso activo</strong> marcado.',
            'Comparte el correo y la contraseña temporal con el cliente.',
            'El cliente ingresa en <strong>cobalto-gym.vercel.app/login</strong> con esas credenciales.',
          ]} />
        </Sub>
        <Sub title="Revocar acceso">
          <P>En el detalle del usuario, desmarca la casilla <strong>Acceso activo a la plataforma</strong> y guarda. El cliente no podrá iniciar sesión hasta que lo reactives.</P>
        </Sub>
      </Section>

      {/* ── 7. Flujos ─────────────────────────────────────────── */}
      <Section id="flujos" title="07 · Flujos de trabajo recomendados">
        <Sub title="Dar de alta a un nuevo cliente">
          <Steps items={[
            'Crear cuenta desde <strong>Usuarios → + Nuevo Usuario</strong> con nombre, correo y contraseña temporal.',
            'Completar perfil: teléfono, tipo de membresía.',
            'Registrar suscripción con fechas y monto.',
            'Asignar plan de nutrición o entrenamiento si ya existe.',
            'Añadir tareas iniciales si el cliente tiene compromisos.',
            'Compartir credenciales por WhatsApp.',
          ]} />
        </Sub>
        <Sub title="Renovar suscripción mensual">
          <P><strong style={{ color: "#f0f6fc" }}>Opción rápida:</strong> En el detalle del usuario, haz clic en <strong style={{ color: "#22c55e" }}>🔄 Renovar</strong> junto a la suscripción vencida. Crea el nuevo período desde hoy en un solo clic.</P>
          <P><strong style={{ color: "#f0f6fc" }}>Opción manual:</strong> Si necesitas ajustar el monto o el método de pago:</P>
          <Steps items={[
            'Ir a <strong>Suscripciones</strong> y filtrar por <em>Vencidos</em> o revisar <em>Vencen en 7 días</em> en el dashboard.',
            'Hacer clic en <strong>Ver usuario</strong>.',
            'Usar el formulario de suscripción para registrar el nuevo período — las fechas se calculan automáticamente.',
          ]} />
        </Sub>
        <Sub title="Actualizar el plan de un cliente">
          <Steps items={[
            'Ir a <strong>Planes</strong> y editar el plan existente (o crear uno nuevo).',
            'Agregar, editar o eliminar módulos según el progreso del cliente.',
            'Si es un plan nuevo, ir al detalle del usuario y asignar el nuevo plan.',
          ]} />
        </Sub>
        <Sub title="Registrar medidas en cada sesión">
          <Steps items={[
            'Ir al detalle del usuario.',
            'En la sección <strong>Progreso</strong>, ingresar las medidas del día.',
            'Agregar notas si hubo algo relevante en la sesión.',
            'Haz clic en <strong>+ Registrar Medida</strong>.',
          ]} />
        </Sub>
      </Section>

      {/* ── 8. Limitaciones ───────────────────────────────────── */}
      <Section id="limitaciones" title="08 · Limitaciones y pendientes">
        <P>El sistema está en producción y funciona para todas las operaciones esenciales. Los siguientes puntos son limitaciones conocidas que pueden mejorarse en el futuro:</P>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
          {[
            {
              title: "No se puede editar una suscripción",
              body: "Solo se puede crear y eliminar. Para corregir datos (monto, fechas), hay que eliminar la suscripción incorrecta y crear una nueva.",
            },
            {
              title: "Planes de nutrición en el portal son estáticos",
              body: "La sección Nutrición (/portal/planes) muestra un listado general del sistema. Los planes de entrenamiento asignados sí se muestran dinámicamente en la sección Rutinas. Nutrición personalizada por usuario está pendiente.",
            },
            {
              title: "No se puede cambiar el email de un usuario",
              body: "El correo electrónico no se puede modificar una vez creado el usuario. Si el cliente cambió su correo, hay que crear una cuenta nueva.",
            },
            {
              title: "No hay historial de cambios (audit log)",
              body: "El sistema no registra quién cambió qué ni cuándo. Guarda notas en el campo 'Notas internas' del usuario si necesitas dejar constancia.",
            },
            {
              title: "No hay notificaciones automáticas",
              body: "El sistema no envía emails ni mensajes cuando vence una suscripción. Revisa el dashboard regularmente para detectar vencimientos.",
            },
            {
              title: "Las estadísticas del portal son decorativas",
              body: "'Días activos' y 'Semana actual' no calculan datos reales — muestran placeholders pendientes de implementar.",
            },
          ].map((item) => (
            <div key={item.title} style={{ padding: "14px 16px", background: "#0d1117", borderRadius: 10, border: "1px solid rgba(255,255,255,.07)" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#f0f6fc", marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "#8b949e", lineHeight: 1.65 }}>{item.body}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: "20px 24px", background: "rgba(34,197,94,.07)", border: "1px solid rgba(34,197,94,.2)", borderRadius: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#22c55e", marginBottom: 8 }}>¿Necesitas algo que no está aquí?</div>
          <div style={{ fontSize: 12, color: "#86efac", lineHeight: 1.7 }}>
            Este panel se puede extender con nuevas funcionalidades. Contacta al desarrollador con tus necesidades específicas: reportes en PDF, notificaciones por WhatsApp, módulo de pagos, galería de fotos de progreso, etc.
          </div>
        </div>
      </Section>

      <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.07)", fontSize: 11, color: "#30363d", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>Gym Cobalto · Panel Admin v1.2</span>
        <span>Última actualización: agosto 2026</span>
      </div>
    </div>
  );
}
