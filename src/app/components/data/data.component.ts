import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  formulario: FormGroup;

  usuario = {
    nombreCompleto: {
      nombre: null,
      apellido: null
    },
    correo: null,
    pasatiempos: []
  };

  constructor() {
    this.formulario = new FormGroup({
      nombreCompleto: new FormGroup({
        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        apellido: new FormControl('', Validators.required),
      }),
      correo: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]),
      pasatiempos: new FormArray([
        new FormControl('', Validators.required)
      ]),
      password1: new FormControl('', [Validators.required]),
      password2: new FormControl(),
    });

    // this.formulario.setValue(this.usuario);

    this.formulario.controls.password2.setValidators([
      Validators.required,
      this.noIgual.bind(this.formulario)
    ]);
  }

  agregarPasatiempo() {
    (this.formulario.controls.pasatiempos as FormArray).push(
      new FormControl('', Validators.required)
    );
  }

  noIgual(control: FormControl): {[s: string]: boolean} {
    const formulario = this;
    if (control.value !== formulario.controls.password1.value) {
      return {
        noIguales: true
      };
    }
    return null;
  }

  guardarCambios() {
    console.log('Formulario posteado');
    console.log(this.usuario);
    console.log(this.formulario);
    console.log(this.formulario.value);
    // this.formulario.reset();
    this.formulario.reset({
      nombreCompleto: {
        nombre: null,
        apellido: null
      },
      correo: null
    });
  }

}
