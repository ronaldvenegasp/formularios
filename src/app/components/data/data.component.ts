import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';


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
      username: new FormControl('', Validators.required, this.existeUsuario),
      password1: new FormControl('', Validators.required),
      password2: new FormControl(),
    });

    // this.formulario.setValue(this.usuario);

    this.formulario.controls.password2.setValidators([
      Validators.required,
      this.noIgual.bind(this.formulario)
    ]);

    // this.formulario.valueChanges.subscribe(data => {
    //   console.log(data);
    // });

    this.formulario.controls.username.valueChanges.subscribe(data => {
      console.log(data);
    });

    this.formulario.controls.username.statusChanges.subscribe(data => {
      console.log(data);
    });
  }

  agregarPasatiempo() {
    (this.formulario.controls.pasatiempos as FormArray).push(
      new FormControl('', Validators.required)
    );
  }

  noIgual = (control: FormControl): { [s: string]: boolean } => {
    if ( control.value !== this.formulario.controls.password1.value ) {
      return{
        noigual: true
      };
    }
    return null;
  }

  existeUsuario(control: FormControl): Promise<any> | Observable<any> {
    let promesa = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'strider') {
          resolve ({
            existe: true
          });
        } else {
          resolve(null);
        }
      }, 3000);
    });
    return promesa;
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
