document.addEventListener('DOMContentLoaded', () => {
    const galeriaAutos = document.getElementById('galeria-autos');
    const cargarMasBtn = document.getElementById('cargar-mas');
    const busquedaInput = document.getElementById('busqueda');
    const filtroMarca = document.getElementById('filtro-marca');
    const filtroTipo = document.getElementById('filtro-tipo');
    const modoVistaBtn = document.getElementById('modo-vista');
    const modoOscuroToggle = document.getElementById('modo-oscuro-toggle');
    const modal = document.getElementById('modal');
    const modalContenido = document.getElementById('modal-contenido');
    const cerrarModal = document.getElementsByClassName('cerrar')[0];
    const autoDestacado = document.getElementById('auto-destacado');
    const autosComparacion = document.getElementById('autos-comparacion');
    const compararBtn = document.getElementById('comparar');
    const formularioContacto = document.getElementById('formulario-contacto');

    let indiceAutoActual = 0;
    let autosVisibles = [];
    let modoCuadricula = true;

    const autosInfo = [
        { id: 1, nombre: "Audi R8", marca: "Audi", tipo: "Deportivo", url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80", descripcion: "El Audi R8 es un superdeportivo de alto rendimiento...", especificaciones: { potencia: "562 HP", velocidadMaxima: "330 km/h", aceleracion: "3.4 segundos (0-100 km/h)" } },
        { id: 2, nombre: "Ford Mustang", marca: "Ford", tipo: "Muscle Car", url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80", descripcion: "El Ford Mustang es un icónico muscle car americano...", especificaciones: { potencia: "310-480 HP", velocidadMaxima: "250 km/h", aceleracion: "4.3 segundos (0-100 km/h)" } },
        { id: 3, nombre: "Porsche 911", marca: "Porsche", tipo: "Deportivo", url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80", descripcion: "El Porsche 911 es uno de los deportivos más emblemáticos...", especificaciones: { potencia: "379-640 HP", velocidadMaxima: "308 km/h", aceleracion: "3.2 segundos (0-100 km/h)" } },
        { id: 4, nombre: "Chevrolet Camaro", marca: "Chevrolet", tipo: "Muscle Car", url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1283&q=80", descripcion: "El Chevrolet Camaro es un potente muscle car...", especificaciones: { potencia: "275-650 HP", velocidadMaxima: "290 km/h", aceleracion: "3.5 segundos (0-100 km/h)" } },
        { id: 5, nombre: "Lamborghini Aventador", marca: "Lamborghini", tipo: "Superdeportivo", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80", descripcion: "El Lamborghini Aventador es un superdeportivo de lujo...", especificaciones: { potencia: "730-770 HP", velocidadMaxima: "350 km/h", aceleracion: "2.9 segundos (0-100 km/h)" } },
        { id: 6, nombre: "Ferrari 488", marca: "Ferrari", tipo: "Superdeportivo", url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80", descripcion: "El Ferrari 488 es un superdeportivo italiano de alto rendimiento...", especificaciones: { potencia: "661 HP", velocidadMaxima: "330 km/h", aceleracion: "3.0 segundos (0-100 km/h)" } },
        { id: 7, nombre: "McLaren 720S", marca: "McLaren", tipo: "Superdeportivo", url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80", descripcion: "El McLaren 720S es un superdeportivo británico de vanguardia...", especificaciones: { potencia: "710 HP", velocidadMaxima: "341 km/h", aceleracion: "2.9 segundos (0-100 km/h)" } },
        { id: 8, nombre: "Bugatti Chiron", marca: "Bugatti", tipo: "Hypercar", url: "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80", descripcion: "El Bugatti Chiron es uno de los autos más rápidos del mundo...", especificaciones: { potencia: "1500 HP", velocidadMaxima: "420 km/h", aceleracion: "2.4 segundos (0-100 km/h)" } },
        { id: 9, nombre: "Tesla Model S", marca: "Tesla", tipo: "Eléctrico", url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80", descripcion: "El Tesla Model S es un sedán eléctrico de alto rendimiento...", especificaciones: { potencia: "670 HP", velocidadMaxima: "250 km/h", aceleracion: "3.1 segundos (0-100 km/h)" } },
        { id: 10, nombre: "BMW M4", marca: "BMW", tipo: "Deportivo", url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80", descripcion: "El BMW M4 es un coupé deportivo de alto rendimiento...", especificaciones: { potencia: "473-503 HP", velocidadMaxima: "290 km/h", aceleracion: "3.9 segundos (0-100 km/h)" } },
        { id: 11, nombre: "Mercedes-AMG GT", marca: "Mercedes-Benz", tipo: "Deportivo", url: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80", descripcion: "El Mercedes-AMG GT es un deportivo de lujo y alto rendimiento...", especificaciones: { potencia: "523-577 HP", velocidadMaxima: "318 km/h", aceleracion: "3.6 segundos (0-100 km/h)" } },
        { id: 12, nombre: "Aston Martin Vantage", marca: "Aston Martin", tipo: "Deportivo", url: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80", descripcion: "El Aston Martin Vantage es un deportivo británico elegante y potente...", especificaciones: { potencia: "503 HP", velocidadMaxima: "314 km/h", aceleracion: "3.6 segundos (0-100 km/h)" } }
    ];

    function cargarAutos(cantidad, filtro = '') {
        const autosAMostrar = autosInfo.filter(auto => 
            auto.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
            auto.marca.toLowerCase().includes(filtro.toLowerCase()) ||
            auto.tipo.toLowerCase().includes(filtro.toLowerCase())
        );

        for (let i = indiceAutoActual; i < indiceAutoActual + cantidad && i < autosAMostrar.length; i++) {
            const auto = autosAMostrar[i];
            const carroItem = document.createElement('div');
            carroItem.className = 'carro-item';
            carroItem.innerHTML = `
                <img src="${auto.url}" alt="${auto.nombre}" loading="lazy">
                <p class="carro-nombre">${auto.nombre}</p>
            `;
            carroItem.addEventListener('click', () => mostrarDetallesAuto(auto));
            galeriaAutos.appendChild(carroItem);
            autosVisibles.push(auto);
        }
        indiceAutoActual += cantidad;

        if (indiceAutoActual >= autosAMostrar.length) {
            cargarMasBtn.style.display = 'none';
        }
    }

    function mostrarDetallesAuto(auto) {
        modalContenido.innerHTML = `
            <h2>${auto.nombre}</h2>
            <img src="${auto.url}" alt="${auto.nombre}" style="max-width: 100%;">
            <p>${auto.descripcion}</p>
            <h3>Especificaciones:</h3>
            <ul>
                <li>Potencia: ${auto.especificaciones.potencia}</li>
                <li>Velocidad Máxima: ${auto.especificaciones.velocidadMaxima}</li>
                <li>Aceleración: ${auto.especificaciones.aceleracion}</li>
            </ul>
            <div class="social-share">
                <button onclick="compartirEnFacebook('${auto.nombre}')">Compartir en Facebook</button>
                <button onclick="compartirEnTwitter('${auto.nombre}')">Compartir en Twitter</button>
            </div>
        `;
        modal.style.display = "block";
    }

    function actualizarFiltros() {
        const marcas = [...new Set(autosInfo.map(auto => auto.marca))];
        const tipos = [...new Set(autosInfo.map(auto => auto.tipo))];

        marcas.forEach(marca => {
            const option = document.createElement('option');
            option.value = marca;
            option.textContent = marca;
            filtroMarca.appendChild(option);
        });

        tipos.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo;
            option.textContent = tipo;
            filtroTipo.appendChild(option);
        });
    }

    function aplicarFiltros() {
        const busqueda = busquedaInput.value;
        const marcaSeleccionada = filtroMarca.value;
        const tipoSeleccionado = filtroTipo.value;

        galeriaAutos.innerHTML = '';
        indiceAutoActual = 0;
        autosVisibles = [];

        const autosFiltrados = autosInfo.filter(auto => 
            (auto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
             auto.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
             auto.tipo.toLowerCase().includes(busqueda.toLowerCase())) &&
            (marcaSeleccionada === '' || auto.marca === marcaSeleccionada) &&
            (tipoSeleccionado === '' || auto.tipo === tipoSeleccionado)
        );

        cargarAutos(6, '');
        cargarMasBtn.style.display = autosFiltrados.length > 6 ? 'block' : 'none';
    }

    function toggleModoVista() {
        modoCuadricula = !modoCuadricula;
        galeriaAutos.className = modoCuadricula ? 'grid-view' : 'list-view';
        modoVistaBtn.textContent = modoCuadricula ? 'Vista de Lista' : 'Vista de Cuadrícula';
    }

    function toggleModoOscuro() {
        document.body.classList.toggle('dark-mode');
    }

    function mostrarAutoDelDia() {
        const autoIndex = Math.floor(Math.random() * autosInfo.length);
        const autoDia = autosInfo[autoIndex];
        autoDestacado.innerHTML = `
            <h3>Auto del día: ${autoDia.nombre}</h3>
            <img src="${autoDia.url}" alt="${autoDia.nombre}" style="max-width: 100%;">
            <p>${autoDia.descripcion}</p>
        `;
    }

    function compararAutos() {
        if (autosVisibles.length < 2) {
            alert('Por favor, selecciona al menos dos autos para comparar.');
            return;
        }

        autosComparacion.innerHTML = '';
        for (let i = 0; i < Math.min(3, autosVisibles.length); i++) {
            const auto = autosVisibles[i];
            const autoComparacion = document.createElement('div');
            autoComparacion.className = 'auto-comparacion';
            autoComparacion.innerHTML = `
                <img src="${auto.url}" alt="${auto.nombre}">
                <h3>${auto.nombre}</h3>
                <p>Potencia: ${auto.especificaciones.potencia}</p>
                <p>Velocidad Máxima: ${auto.especificaciones.velocidadMaxima}</p>
                <p>Aceleración: ${auto.especificaciones.aceleracion}</p>
            `;
            autosComparacion.appendChild(autoComparacion);
        }
    }

    cargarMasBtn.addEventListener('click', () => cargarAutos(3));
    busquedaInput.addEventListener('input', aplicarFiltros);
    filtroMarca.addEventListener('change', aplicarFiltros);
    filtroTipo.addEventListener('change', aplicarFiltros);
    modoVistaBtn.addEventListener('click', toggleModoVista);
    modoOscuroToggle.addEventListener('click', toggleModoOscuro);
    compararBtn.addEventListener('click', compararAutos);

    cerrarModal.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    formularioContacto.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Gracias por tu mensaje. Te contactaremos pronto.');
        formularioContacto.reset();
    });

    // Inicialización
    actualizarFiltros();
    cargarAutos(6);
    mostrarAutoDelDia();
});