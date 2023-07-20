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
        
        }
      
        async traerRegistros() {
        const response = await fetch("./productos.json");
        this.productos = await response.json();
          return this.productos;
        }
        
        registrosPorCategoria(categoria) {
            return this.productos.filter((producto) => producto.categoria == categoria);
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
      const botonCarrito = document.querySelector("#btn-cart");
      const botonComprar = document.querySelector("#botonComprar");
      const botonesCategorias = document.querySelectorAll(".btnCategoria");
      
      botonesCategorias.forEach((boton) => {
        boton.addEventListener("click" , (event) => {
            event.preventDefault();
            const productosPorCategoria = bd.registrosPorCategoria(boton.innerText);
            cargarProductos(productosPorCategoria);
        });
      });

      

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
      bd.traerRegistros().then((productos) => cargarProductos(productos));
      
      // Evento al buscar productos
      inputBuscar.addEventListener("keyup", () => {
        const palabra = inputBuscar.value;
        const productosEncontrados = bd.registrosPorNombre(palabra.toLowerCase());
        cargarProductos(productosEncontrados);
      });
      
      // Evento para comprar (Sweet Alert)
      botonComprar.addEventListener("click", () => {

        Swal.fire({
          title: "¡Su compra ha sido realizada con exito!",
          text: "Verifica tu correo electronico, enviaremos la factura electronica de la compra",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      
        carrito.vaciar();
        document.querySelector("section").classList.add("ocultar");
      });
    
      var showCart = true;

      botonCarrito.addEventListener("click", () => {
        var sectionCart = document.querySelector(".cart-container");

        if(showCart) {
          sectionCart.style.display = "none";
          botonCarrito.style.right = "12px"
          showCart = false;
        }else {
          sectionCart.style.display = "block";
          botonCarrito.style.right = "360px";
          showCart = true;
        }
      })
    });

    