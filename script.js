document.addEventListener('DOMContentLoaded', () => {
    const cargarMasAutosBtn = document.getElementById('cargarMasAutos');
    const nuevoDatoBtn = document.getElementById('nuevoDato');
    const formularioContacto = document.getElementById('formularioContacto');
    const galeriaAutos = document.getElementById('galeriaAutos');
    const datoCurioso = document.getElementById('datoCurioso');

    const datosAutos = [
        "El primer auto producido en masa fue el Ford Model T en 1908.",
        "El logotipo de BMW representa una hélice de avión en movimiento.",
        "El auto más vendido de la historia es el Toyota Corolla.",
        "El Bugatti Chiron puede alcanzar una velocidad máxima de 490 km/h.",
        "El primer auto eléctrico se creó en la década de 1830, mucho antes que los de gasolina.",
        "El color de auto más popular en el mundo es el blanco.",
        "El primer semáforo para autos se instaló en Londres en 1868.",
        "La marca de autos Porsche también diseña cepillos de dientes."
    ];

    const autosInfo = [
        { nombre: "Audi R8", url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
        { nombre: "Ford Mustang", url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
        { nombre: "Porsche 911", url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
        { nombre: "Chevrolet Camaro", url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1283&q=80" },
        { nombre: "Lamborghini Aventador", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
        { nombre: "Ferrari 488", url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80" },
        { nombre: "McLaren 720S", url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
        { nombre: "Bugatti Chiron", url: "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
        { nombre: "Tesla Model S", url: "https://images.unsplash.com/photo-1617814076668-946f58342656?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
        { nombre: "BMW M4", url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
        { nombre: "Mercedes-AMG GT", url: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
        { nombre: "Aston Martin Vantage", url: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" }
    ];

    let indiceAutoActual = 0;

    // Función para cargar imágenes de autos
    function cargarImagenesAutos(cantidad) {
        for (let i = 0; i < cantidad && indiceAutoActual < autosInfo.length; i++) {
            const autoInfo = autosInfo[indiceAutoActual];
            const carroItem = document.createElement('div');
            carroItem.className = 'carro-item';
            
            const img = document.createElement('img');
            img.src = autoInfo.url;
            img.alt = autoInfo.nombre;
            img.loading = "lazy"; // Para cargar las imágenes de forma perezosa
            
            // Manejar errores de carga de imagen
            img.onerror = function() {
                this.src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';
                this.alt = 'Imagen no disponible';
            };
            
            const nombre = document.createElement('p');
            nombre.className = 'carro-nombre';
            nombre.textContent = autoInfo.nombre;
            
            carroItem.appendChild(img);
            carroItem.appendChild(nombre);
            galeriaAutos.appendChild(carroItem);
            
            indiceAutoActual++;
        }
        
        if (indiceAutoActual >= autosInfo.length) {
            cargarMasAutosBtn.style.display = 'none'; // Oculta el botón si no hay más imágenes
        }
    }

    // Cargar imágenes iniciales
    cargarImagenesAutos(6);

    // Evento para cargar más autos
    cargarMasAutosBtn.addEventListener('click', () => {
        cargarImagenesAutos(3);
    });

    // Función para mostrar un dato curioso aleatorio
    nuevoDatoBtn.addEventListener('click', () => {
        const datoIndex = Math.floor(Math.random() * datosAutos.length);
        datoCurioso.innerHTML = `<p>${datosAutos[datoIndex]}</p>`;
    });

    // Manejar el envío del formulario
    formularioContacto.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElentById('email').value;
        const mensaje = document.getElementById('mensaje').value;

        // Aquí normalmente enviarías los datos a un servidor
        console.log('Formulario enviado:', { nombre, email, mensaje });
        
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        formularioContacto.reset();
    });

    // Animación suave al hacer clic en los enlaces del menú
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});