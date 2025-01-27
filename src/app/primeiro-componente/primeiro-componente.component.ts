import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pessoa } from '../modelo/Pessoa';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-primeiro-componente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './primeiro-componente.component.html',
  styleUrls: ['./primeiro-componente.component.css'] // Correção aqui
})
export class PrimeiroComponenteComponent {
  
  // Objeto de formulario
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    idade: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(120)]),
    cidade: new FormControl('', [Validators.required, Validators.minLength(3)]),
    campo1: new FormControl('', [Validators.required]), // Novo campo string
    campo2: new FormControl('', [Validators.required]), // Novo campo string
    genero: new FormControl('', [Validators.required]) // Novo campo radio
  });

  // Visibilidade dos botões
  btnCadastrar: boolean = true;

  // Vetor
  vetor: Pessoa[] = [];

  // Armazenar índice da pessoa selecionada
  indice: number = -1;

  // Função Cadastrar
  cadastrar() {
    // Cadastro no vetor
    this.vetor.push(this.formulario.value as Pessoa);

    // Limpeza dos inputs
    this.formulario.reset();

    // Visualização no console
    // console.table(this.vetor);
  }

  selecionar(indice: number) {
    // Atribuir o índice da pessoa.
    this.indice = indice;

    // Atribuir os dados da pessoa no formulario.
    this.formulario.setValue({
      nome: this.vetor[indice].nome,
      idade: this.vetor[indice].idade,
      cidade: this.vetor[indice].cidade,
      campo1: this.vetor[indice].campo1,
      campo2: this.vetor[indice].campo2,
      genero: this.vetor[indice].genero
    });

    // Visibilidade dos botões
    this.btnCadastrar = false;
  }

  // Função de alteração
  alterar() {
    this.btnCadastrar = true;
  }

  remover() {
    this.vetor.splice(this.indice, 1);

    // Limpeza dos inputs
    this.formulario.reset();

    // Visibilidade dos botões
    this.btnCadastrar = true;
  }

  cancelar() {
    // Limpeza dos inputs
    this.formulario.reset();

    // Visibilidade dos botões
    this.btnCadastrar = true;
  }
}
