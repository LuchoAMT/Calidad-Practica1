import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil-negocio',
  // standalone: true,
  // imports: [BrowserModule,FormsModule],
  templateUrl: './perfil-negocio.component.html',
  styleUrls: ['./perfil-negocio.component.scss']
})


export class PerfilNegocioComponent implements OnInit {
  nombreNegocio: string = 'Nombre del Negocio';
  descripcionNegocio: string = 'Descripción del negocio';
  imagenNegocio: string = 'assets/images/logo-placeholder.png';
  premios = [
    { titulo: 'Certificación', imagen: 'assets/images/certificacion.svg' },
    { titulo: 'Premio', imagen: 'assets/images/premio.svg' },
    { titulo: 'Premio', imagen: 'assets/images/premio.svg' }
  ];
  productos = [
    { nombre: 'Producto 1', imagen: 'assets/images/producto1.svg' },
    { nombre: 'Producto 2', imagen: 'assets/images/producto2.svg' }
  ];
  metricas = [
    { nombre: 'Metrica 1', valor: '2%' },
    { nombre: 'Metrica 2', valor: '87%' },
    { nombre: 'Metrica 3', valor: '$5000' },
    { nombre: 'Metrica 4', valor: '43,770' }
  ];
  ubicacion = {
    latitud: '41.440153',
    longitud: '-65.364104'
  };

  constructor() { }

  ngOnInit(): void {
  }


  editarNombre() {
    const nuevoNombre = prompt('Introduce el nuevo nombre del negocio:', this.nombreNegocio);
    if (nuevoNombre !== null && nuevoNombre.trim() !== '') {
      this.nombreNegocio = nuevoNombre;
    }
  }

  editarDescripcion() {
    const nuevaDescripcion = prompt('Introduce la nueva descripción:', this.descripcionNegocio);
    if (nuevaDescripcion !== null && nuevaDescripcion.trim() !== '') {
      this.descripcionNegocio = nuevaDescripcion;
    }
  }

  editarImagen() {
    // Lógica para cambiar la imagen (podría ser con un input de tipo file)
    console.log('Cambiar imagen');
  }

  modalAbierto: boolean = false;
  campoEdicion: string = '';
  valorEdicion: string = '';

  abrirModal(campo: string) {
    this.modalAbierto = true;
    this.campoEdicion = campo === 'nombre' ? 'Nombre' : 'Descripción';
    this.valorEdicion = campo === 'nombre' ? this.nombreNegocio : this.descripcionNegocio;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.campoEdicion = '';
    this.valorEdicion = '';
  }

  guardarCambios() {
    if (this.campoEdicion === 'Nombre') {
      this.nombreNegocio = this.valorEdicion;
    } else if (this.campoEdicion === 'Descripción') {
      this.descripcionNegocio = this.valorEdicion;
    }
    this.cerrarModal();
  }


}

