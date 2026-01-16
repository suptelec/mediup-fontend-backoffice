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
    serial: ['', Validators.required],
    codigo: ['', Validators.required],
    model: ['', Validators.required],
    brand: ['', Validators.required],
    class: ['', Validators.required],
    lastCalibrationDate: ['', Validators.required],
    nextCalibrationDate: ['', Validators.required],
    urlPicture: [''],
    type: [0, [Validators.required, Validators.min(0)]],
    primaryCurrent: [0, Validators.min(0)],
    secondaryCurrent: [0, Validators.min(0)],
    primaryVoltage: [0, Validators.min(0)],
    secondaryVoltage: [0, Validators.min(0)],
    electricCompanyId: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(private fb: FormBuilder, private transformerService: TransformerService) {}

  submit(): void {
    if (this.transformerForm.invalid) {
      this.transformerForm.markAllAsTouched();
      return;
    }

    const payload: TransformerCreatePayload = {
      serial: this.transformerForm.value.serial ?? '',
      codigo: this.transformerForm.value.codigo ?? '',
      model: this.transformerForm.value.model ?? '',
      brand: this.transformerForm.value.brand ?? '',
      class: this.transformerForm.value.class ?? '',
      lastCalibrationDate: this.normalizeDate(this.transformerForm.value.lastCalibrationDate),
      nextCalibrationDate: this.normalizeDate(this.transformerForm.value.nextCalibrationDate),
      urlPicture: this.transformerForm.value.urlPicture ?? '',
      type: this.normalizeNumber(this.transformerForm.value.type),
      primaryCurrent: this.normalizeNumber(this.transformerForm.value.primaryCurrent),
      secondaryCurrent: this.normalizeNumber(this.transformerForm.value.secondaryCurrent),
      primaryVoltage: this.normalizeNumber(this.transformerForm.value.primaryVoltage),
      secondaryVoltage: this.normalizeNumber(this.transformerForm.value.secondaryVoltage),
      electricCompanyId: this.normalizeNumber(this.transformerForm.value.electricCompanyId)
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

  private normalizeNumber(value: number | null | undefined): number {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return 0;
    }
    return Number(value);
  }

  private normalizeDate(value: string | null | undefined): string | null {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return null;
    }
    const normalized = new Date(value);
    if (Number.isNaN(normalized.getTime())) {
      return null;
    }
    return normalized.toISOString();
  }
}
