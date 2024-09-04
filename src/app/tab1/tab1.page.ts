import { Component } from '@angular/core';
import { UsuarioService } from '../api/usuario.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public dados: any = { data: [] }; 
  public paginaAtual: number = 1; 
  public limite: number = 4;
  public totalPaginas: number = 0;
  private carregando: boolean = false;

  constructor(private usuarioService: UsuarioService) {
    this.carregarUsuarios();
  }

  private carregarUsuarios() {
    if (this.carregando) return; 

    this.carregando = true;
    this.usuarioService.obterTodos(this.paginaAtual, this.limite)
      .subscribe((resposta) => {
        this.dados.data = resposta.data;
        this.totalPaginas = Math.ceil(resposta.total / this.limite);
        this.carregando = false;
      });
  }

  public irParaPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaAtual = pagina;
    this.carregarUsuarios();
  }

  public paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.irParaPagina(this.paginaAtual - 1);
    }
  }

  public proximaPagina() {
    if (this.paginaAtual < this.totalPaginas) {
      this.irParaPagina(this.paginaAtual + 1);
    }
  }
}