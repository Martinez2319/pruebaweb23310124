 
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
        "El primer auto eléctrico se creó en la década de 1830, mucho antes que los de gasolina."
    ];

    // Función para cargar imágenes de autos
    function cargarImagenesAutos(cantidad) {
        for (let i = 0; i < cantidad; i++) {
            const img = document.createElement('img');
            img.src = `/api/placeholder/200/150?text=Auto${galeriaAutos.children.length + 1}`;
            img.alt = `Auto ${galeriaAutos.children.length + 1}`;
            galeriaAutos.appendChild(img);
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
        const email = document.getElementById('email').value;
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