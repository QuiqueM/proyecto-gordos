function productos(nombre, disponible, precio, imagen, descripcion, cantidad){
    this.nombre  = nombre
    this.disponible = disponible
    this.precio = precio
    this.imagen = imagen
    this.descripcion = descripcion
    this.cantidad = cantidad

    ko.track(this)
}

function carrito(nombre, cantidad, precio, imagen){
    this.nombre = nombre
    this.cantidad = cantidad
    this.precio = precio
    this.imagen = imagen

    ko.track(this)
}

function AppViewModel(){

    this.cerveza = []
    this.brandy = []
    this.whisky = []
    this.tequila = []
    this.refrescos = []
    //this.botanas = []
    this.vodka = []
    this.ron = []
    this.orden = []
    this.total = 0

    this.cargaProductos = () => {
        for(c of cerveza)
            this.cerveza.push(new productos(c.nombre, c.disponible,c.precio,c.imagen,c.descripcion, c.cantidad))
        for(b of brandy)
            this.brandy.push(new productos(b.nombre,b.disponible,b.precio,b.imagen,b.descripcion, b.cantidad))
        for(w of whisky)
            this.whisky.push(new productos(w.nombre,w.disponible,w.precio,w.imagen,w.descripcion, w.cantidad))
        for(t of tequila)
            this.tequila.push(new productos(t.nombre,t.disponible,t.precio,t.imagen,t.descripcion,t.cantidad))
        for(v of vodka)
            this.vodka.push(new productos(v.nombre,v.disponible,v.precio,v.imagen,v.descripcion, v.cantidad))
        for(r of ron)
            this.ron.push(new productos(r.nombre,r.disponible,r.precio,r.imagen,r.descripcion, r.cantidad))
        for(r of refrescos)
            this.refrescos.push(new productos(r.nombre, r.disponible, r.precio, r.imagen, r.descripcion, r.cantidad))
    }

    this.addToCart = (producto) => {
       
        if(validaCantidad(producto.cantidad)){
            let buscar = this.orden.find(p => p.nombre == producto.nombre)
            console.log(buscar)
            if(buscar != undefined){
                this.total -= buscar.precio
                this.total += producto.precio * parseInt(producto.cantidad)
                buscar.precio = producto.precio * parseInt(producto.cantidad)
                buscar.cantidad = parseInt(producto.cantidad)
                //this.orden.pop(buscar)
                //this.orden.push(new carrito(producto.nombre, producto.cantidad, (producto.precio * parseInt(producto.cantidad)), producto.imagen))
            } else {
                this.total += producto.precio * parseInt(producto.cantidad)
                this.orden.push(new carrito(producto.nombre, producto.cantidad, (producto.precio * parseInt(producto.cantidad)), producto.imagen))
            }     
            M.toast({html: 'Se agrego!'})
        } else {
            M.toast({html: 'Ingrese un numero valido!'})
        }
    }

    this.removeToCard = (producto) => {
        this.total -= producto.precio
        this.orden.remove(producto)
    }

    function validaCantidad(valor){
        //intento convertir a entero.
       //si era un entero no le afecta, si no lo era lo intenta convertir
       valor = parseInt(valor)
  
        //Compruebo si es un valor numérico
        if (isNaN(valor)) {
              //entonces (no es numero) devuelvo el valor cadena vacia
              return false
        }else{
              //En caso contrario (Si era un número) devuelvo el valor
              return true
        }
  }

    ko.track(this)
}

window.addEventListener('DOMContentLoaded', function (event) {
    
    const viewModel = new AppViewModel()
    
    viewModel.cargaProductos()

    ko.applyBindings(viewModel)
})