// Objetos JSON de productos
const productos = [
    {
        nombre: 'Landing Pages',
        descripcion: 'Diseñamos páginas de aterrizaje efectivas que capturan la atención de tus visitantes y maximizan las conversiones.',
        precio: 500, // Precio sin IVA
    },
    {
        nombre: 'E-commerce',
        descripcion: 'Transformamos tu visión de negocio en una tienda en línea intuitiva y atractiva.',
        precio: 1000, // Precio sin IVA
    },
    {
        nombre: 'Páginas Institucionales',
        descripcion: 'Creamos sitios web que reflejan la identidad y valores de tu empresa.',
        precio: 1500, // Precio sin IVA
    },
    {
        nombre: 'Blogs',
        descripcion: 'Ayudamos a las marcas a contar su historia a través de blogs atractivos y bien estructurados.',
        precio: 300, // Precio sin IVA
    },
];

// Función para calcular el precio total con IVA
function calcularPrecioConIVA(precio, iva = 21) {
    const precioConIVA = precio * (1 + iva / 100);
    return precioConIVA;
}

// Función que agrega una descripción ampliada a cada producto
function agregarDescripcionAmpliada() {
    // Obtener todos los botones "Ver Más"
    const botones = document.querySelectorAll('.ver-mas');
    
    botones.forEach((boton, index) => {
        // Agregar un evento click a cada botón
        boton.addEventListener('click', () => {
            // Obtener la descripción del producto desde el array de objetos
            const producto = productos[index];
            const descripcionAmpliada = document.createElement('p');
            descripcionAmpliada.textContent = `Descripción ampliada: ${producto.descripcion}`;
            descripcionAmpliada.style.fontSize = '1.2rem';
            descripcionAmpliada.style.marginTop = '10px';

            // Agregar el párrafo a la tarjeta del producto
            boton.parentElement.appendChild(descripcionAmpliada);
        });
    });
}

// Ejecutar la función para agregar descripciones ampliadas
agregarDescripcionAmpliada();

// Mostrar el precio con IVA de cada producto en la consola
productos.forEach(producto => {
    const precioConIVA = calcularPrecioConIVA(producto.precio);
    console.log(`Precio de ${producto.nombre} con IVA: $${precioConIVA.toFixed(2)}`);
});
