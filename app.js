
document.addEventListener('DOMContentLoaded', function(){ 

    // Clase Producto
    class Producto {
        constructor(id, nombre, precio, categoria, imagen = false) {
          this.id = id;
          this.nombre = nombre;
          this.precio = precio;
          this.categoria = categoria;
          this.imagen = imagen;
        }
      }
      
      // Clase BaseDeDatos
      class BaseDeDatos {
        constructor() {
          this.productos = [];
          this.agregarRegistro(1, "Remera", 5600, "Indumentaria", "remera1.png");
          this.agregarRegistro(2, "Remera", 2000, "Indumentaria", "remera2.png");
          this.agregarRegistro(3, "Remera", 3800, "Indumentaria", "remera3.png");
          this.agregarRegistro(4, "Remera", 6800, "Indumentaria", "remera4.png");
          this.agregarRegistro(5, "jogging", 6000, "Indumentaria", "jogging1.png");
          this.agregarRegistro(6, "jogging", 6000, "Indumentaria", "jogging2.png");
          this.agregarRegistro(7, "jogging", 6000, "Indumentaria", "jogging3.png");
          this.agregarRegistro(8, "Mochila", 1500, "Marroquineria", "cartera.png");
          this.agregarRegistro(9, "Camperas", 23000, "Indumentaria", "campera1.png");
          this.agregarRegistro(10, "Camperas", 12000, "Indumentaria", "campera2.png");
          this.agregarRegistro(11, "Camperas", 20000, "Indumentaria", "campera3.png");
          this.agregarRegistro(12, "Camperas", 15000, "Indumentaria", "campera4.png");
          this.agregarRegistro(13, "Camperas", 15000, "Indumentaria", "campera5.png");
          this.agregarRegistro(14, "Camperas", 15000, "Indumentaria", "campera6.png");
          this.agregarRegistro(15, "Gorro", 1000, "Accesorios", "gorro1.png");
          this.agregarRegistro(16, "Gorro", 1000, "Accesorios", "gorro2.png");
          this.agregarRegistro(17, "Bufanda", 200, "Accesorios", "bufanda1.png");
          this.agregarRegistro(18, "Bufanda", 200, "Accesorios", "bufanda1.png");
          this.agregarRegistro(19, "Medias", 200, "Accesorios", "medias.png");
          this.agregarRegistro(20, "Medias", 200, "Accesorios", "medias1.png");
          this.agregarRegistro(21, "Medias", 200, "Accesorios", "medias2.png");
          this.agregarRegistro(22, "Medias", 200, "Accesorios", "medias3.png");
          this.agregarRegistro(23, "Medias", 200, "Accesorios", "medias4.png");
          this.agregarRegistro(24, "Pollera", 3000, "Indumentaria", "pollera1.png");
          this.agregarRegistro(25, "Pollera", 3000, "Indumentaria", "pollera2.png");
          this.agregarRegistro(26, "Pollera", 3000, "Indumentaria", "pollera3.png");
          this.agregarRegistro(27, "Buzos", 4000, "Indumentaria", "buzo1.png");
          this.agregarRegistro(28, "Buzos", 6000, "Indumentaria", "buzo2.png");
          this.agregarRegistro(29, "Buzos", 5000, "Indumentaria", "buzo3.png");
          this.agregarRegistro(30, "Buzos", 6000, "Indumentaria", "buzo4.png");
          this.agregarRegistro(31, "Buzos", 4000, "Indumentaria", "buzo5.png");
          this.agregarRegistro(32, "Buzos", 8000, "Indumentaria", "buzo6.png");
          this.agregarRegistro(33, "Buzos", 9000, "Indumentaria", "buzo7.png");
          this.agregarRegistro(34, "Buzos", 4000, "Indumentaria", "buzo8.png");
          this.agregarRegistro(35, "Buzos", 4500, "Indumentaria", "buzo9.png");
          this.agregarRegistro(36, "Buzos", 4500, "Indumentaria", "buzo10.png");
          this.agregarRegistro(37,"Jeans", 10000, "Indumentaria", "jeans1.png");
          this.agregarRegistro(38,"Jeans Oversize", 11000, "Indumentaria", "jeans2.png"); 
          this.agregarRegistro(39,"Jeans Mom", 15000, "Indumentaria", "jeans3.png");
          this.agregarRegistro(40,"Jeans", 11000, "Indumentaria", "jeans4.png");
          this.agregarRegistro(41, "Bikini", 200, "Ropa Interior", "bikini1.png");
          this.agregarRegistro(42, "Bikini", 200, "Ropa Interior", "bikini2.png");
        }
      
        agregarRegistro(id, nombre, precio, categoria, imagen = false) {
          const producto = new Producto(id, nombre, precio, categoria, imagen);
          this.productos.push(producto);
        }
      
        traerRegistros() {
          return this.productos;
        }
      
        registroPorId(id) {
          return this.productos.find((producto) => producto.id === id);
        }
      
        registrosPorNombre(palabra) {
          return this.productos.filter((producto) =>
            producto.nombre.toLowerCase().includes(palabra)
          );
        }
      }
      
      // Clase Carrito
    class Carrito {
        constructor() {
          const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
          this.carrito = carritoStorage || [];
          this.total = 0;
          this.totalProductos = 0;
          this.listar();
        }
        
      
        agregar(producto) {
          const productoEnCarrito = this.estaEnCarrito(producto);
          if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
          } else {
            this.carrito.push({ ...producto, cantidad: 1 });
          }
      
          localStorage.setItem("carrito", JSON.stringify(this.carrito));
          this.listar();
        }
      
        estaEnCarrito({ id }) {
          return this.carrito.find((producto) => producto.id === id);
        }
      
        listar() {
          this.total = 0;
          this.totalProductos = 0;
          divCarrito.innerHTML = "";
      
          for (const producto of this.carrito) {
            divCarrito.innerHTML += `
              <div class="productoCarrito">
                <h2>${producto.nombre}</h2>
                <p>$${producto.precio}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <a href="#" data-id="${producto.id}" class="btn btnQuitar">Quitar del carrito</a>
              </div>
            `;
      
            this.total += producto.precio * producto.cantidad;
            this.totalProductos += producto.cantidad;
          }
      
          if (this.totalProductos > 0) {
            botonComprar.classList.remove("oculto");
          } else {
            botonComprar.classList.add("oculto");
          }
      
          const botonesQuitar = document.querySelectorAll(".btnQuitar");
          for (const boton of botonesQuitar) {
            boton.onclick = (event) => {
              event.preventDefault();
              this.quitar(Number(boton.dataset.id));
            };
          }
      
          spanCantidadProductos.innerText = this.totalProductos;
          spanTotalCarrito.innerText = this.total;
        }
      
        quitar(id) {
          const indice = this.carrito.findIndex((producto) => producto.id === id);
          if (this.carrito[indice].cantidad > 1) {
            this.carrito[indice].cantidad--;
          } else {
            this.carrito.splice(indice, 1);
          }
      
          localStorage.setItem("carrito", JSON.stringify(this.carrito));
          this.listar();
        }
      
        vaciar() {
          this.carrito = [];
          localStorage.removeItem("carrito");
          this.listar();
        }
      }

      // Base de datos
      const bd = new BaseDeDatos();
      
      // Elementos del DOM
      const divProductos = document.querySelector("#productos");
      const divCarrito = document.querySelector("#carrito");
      const spanCantidadProductos = document.querySelector("#cantidadProductos");
      const spanTotalCarrito = document.querySelector("#totalCarrito");
      const inputBuscar = document.querySelector("#inputBuscar");
      const botonCarrito = document.querySelector("section.ocultar h1");
      const botonComprar = document.querySelector("#botonComprar");
      
      // Cargar productos en el DOM
      function cargarProductos(productos) {
        divProductos.innerHTML = "";
      
        for (const producto of productos) {
          divProductos.innerHTML += `
            <div class="producto">
              <h2>${producto.nombre}</h2>
              <p class="precio">$${producto.precio}</p>
              <div class="imagen">
                <img src="img/${producto.imagen}" />
              </div>
              <a href="#" class="btn btnAgregar" data-id="${producto.id}">Agregar al carrito</a>
            </div>
          `;
        }
      
        const botonesAgregar = document.querySelectorAll(".btnAgregar");
        for (const boton of botonesAgregar) {
          boton.addEventListener("click", (event) => {
            event.preventDefault();
            const id = Number(boton.dataset.id);
            const producto = bd.registroPorId(id);
            carrito.agregar(producto);
          });
        }
      }
      
      // Objeto Carrito
      const carrito = new Carrito();
      
      // Cargar productos al iniciar la pagina
      cargarProductos(bd.traerRegistros());
      
      // Evento al buscar productos
      inputBuscar.addEventListener("keyup", () => {
        const palabra = inputBuscar.value;
        const productosEncontrados = bd.registrosPorNombre(palabra.toLowerCase());
        cargarProductos(productosEncontrados);
      });
      
      // Evento para comprar (Sweet Alert)
      botonComprar.addEventListener("click", (event) => {
        event.preventDefault();
        Swal.fire({
          title: "¡Su compra ha sido realizada con exito!",
          text: "Verifica tu correo electronico, enviaremos la factura electronica de la compra",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      
        carrito.vaciar();
        document.querySelector("section").classList.add("ocultar");
      });
    
    
    });
    
    // este es un cambio nuevo
     const botonComprar = document.querySelector("#botonComprar");
     const seccionCarrito = document.querySelector(".ocultar");
    
     botonComprar.addEventListener("click", function(event) {
       event.preventDefault();
    
      // Resto del codigo para la compra...
    
       seccionCarrito.style.display = "none";
     });
    
    // Agregar el siguiente codigo para mostrar la seccion carrito nuevamente
     const botonCarrito = document.querySelector("h1");
     botonCarrito.addEventListener("click", function() {
       seccionCarrito.style.display = "block";
    });

    