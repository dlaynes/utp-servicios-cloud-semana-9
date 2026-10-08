const cargar = async (url) => {
  const respuesta = await fetch(url, { cache: 'no-store' });
  if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
  return await respuesta.json();
};

const mostrarEstado = async () => {
  const elemento = document.getElementById('estado');
  try {
    const datos = await cargar('/api/estado');
    elemento.textContent = `API activa: ${datos.mensaje}`;
    elemento.className = `estado Activa`;
  } catch (error) {
    elemento.textContent = `API no disponible: ${error.message}`;
    elemento.className = 'estado Error';
  }
};

const mostrarCursos = async () => {
  const contenedor = document.getElementById('cursos');
  try {
    const cursos = await cargar('/api/cursos');
    contenedor.innerHTML = '';
    cursos.forEach(curso => {
      const item = document.createElement('article');
      item.className = 'curso';
      item.innerHTML = `<strong>${curso.nombre}</strong><span>${curso.carrera}</span>`;
      contenedor.appendChild(item);
    });
  } catch (error) {
    contenedor.innerHTML = `<p class="error">No se pudieron cargar los cursos.</p>`;
  }
};

const mostrarEstudiantes = async () => {
  const cuerpo = document.getElementById('estudiantes');
  try {
    const estudiantes = await cargar('/api/estudiantes');
    cuerpo.innerHTML = '';
    estudiantes.forEach(estudiante => {
      const fila = document.createElement('tr');
      fila.innerHTML = `<td>${estudiante.codigo}</td><td>${estudiante.nombre}</td><td>${estudiante.carrera}</td>`;
      cuerpo.appendChild(fila);
    });
  } catch (error) {
    cuerpo.innerHTML = `<tr><td colspan="3" class="error">No se pudieron cargar los estudiantes.</td></tr>`;
  }
};

const mostrarResumen = async () => {
  try {
    const datos = await cargar('/api/estadisticas');
    document.getElementById('card-estudiantes').textContent = datos.estudiantes;
    document.getElementById('card-cursos').textContent = datos.cursos;
    document.getElementById('card-promedio').textContent = datos.promedio;
  } catch (error) {
    document.getElementById('card-estudiantes').textContent = '--';
    document.getElementById('card-cursos').textContent = '--';
    document.getElementById('card-promedio').textContent = '--';
  }
};

const iniciar = async () => {
  await Promise.allSettled([mostrarEstado(), mostrarCursos(), mostrarEstudiantes(), mostrarResumen()]);
};

iniciar();
