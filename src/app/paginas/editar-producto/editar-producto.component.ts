import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../servicios/productos.service';
import { Producto } from '../../interfaces/producto';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, CommonModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.scss'
})
export class EditarProductoComponent implements OnInit{
  productoForm: FormGroup;
  producto: Producto | undefined;


  constructor(
    private readonly productoService: ProductosService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {
    this.productoForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
      precio: [0],
      imagen_url: [''],
      etiqueta: [''], 
      descuento: [0]
    });
  }

   async ngOnInit(): Promise<void> {
    const productoId = Number(this.route.snapshot.paramMap.get('id'));
    try {
      this.producto = await this.productoService.getProductoPorId(productoId);

      const userId = Number(localStorage.getItem('userId'));
      const userType = localStorage.getItem('userType');
      if (this.producto.id_empresa !== userId || userType !== "empresa") {
        this.router.navigate(['/productos']);
        return;
      }
      this.productoForm.patchValue(this.producto);  // Precarga los datos en el formulario
    } catch (error) {
      console.error('Error al cargar el producto:', error);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.productoForm.valid && this.producto) {
      try {
        const productoActualizado: Producto = {
          ...this.producto,
          ...this.productoForm.value,
          etiqueta: this.productoForm.value.etiqueta === '' ? null : this.productoForm.value.etiqueta // Cambiar a null si es 'Ninguna'
        };

        await this.productoService.actualizarProducto(this.producto.id_producto!, productoActualizado);
        this.router.navigate(['/productos']); // Redirige a la lista de productos después de editar
      } catch (error) {
        console.error('Error al actualizar el producto:', error);
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/productos']); // Redirige a la lista de productos si se cancela
  }
}
