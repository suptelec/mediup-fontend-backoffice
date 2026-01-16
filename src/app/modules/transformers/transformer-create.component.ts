import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransformerService } from '../../services/transformer.service';
import { TransformerCreatePayload } from '../../model/interfaces/transformers/transformer.interfaces';

@Component({
  selector: 'app-transformer-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transformer-create.component.html',
  styleUrl: './transformer-create.component.css'
})
export class TransformerCreateComponent {
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  readonly transformerForm = this.fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
    capacityKva: [null as number | null, Validators.min(0)],
    description: ['']
  });

  constructor(private fb: FormBuilder, private transformerService: TransformerService) {}

  submit(): void {
    if (this.transformerForm.invalid) {
      this.transformerForm.markAllAsTouched();
      return;
    }

    const payload: TransformerCreatePayload = {
      name: this.transformerForm.value.name ?? '',
      code: this.transformerForm.value.code ?? '',
      capacityKva: this.normalizeCapacity(this.transformerForm.value.capacityKva),
      description: this.transformerForm.value.description || null
    };

    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;

    this.transformerService.createTransformer(payload).subscribe({
      next: (response) => {
        const succeeded = response.succeed ?? response.success ?? true;
        if (!succeeded) {
          this.errorMessage = response.message || 'No se pudo crear el transformador.';
        } else {
          this.successMessage = response.message || 'Transformador creado correctamente.';
          this.transformerForm.reset();
        }
        this.isSubmitting = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo crear el transformador. Verifica los datos e intenta nuevamente.';
        this.isSubmitting = false;
      }
    });
  }

  private normalizeCapacity(value: number | null | undefined): number | null {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return null;
    }
    return Number(value);
  }
}
