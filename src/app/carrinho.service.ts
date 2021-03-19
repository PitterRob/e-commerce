import { Injectable } from '@angular/core';
import { AlartModalService } from './shared/alart-modal.service';
import { ItemCarrinho } from './shared/item.carrinho.model';
import { Oferta } from './shared/oferta.model';
@Injectable({
  providedIn: 'root'
})
class CarrinhoService {
  constructor(public alertService: AlartModalService) {

  }
  public itens: ItemCarrinho[] = [];

  public exibirItens(): ItemCarrinho[] {
    return this.itens;
  }
  public exibirQTDItens() {
    let total = 0;
    this.itens.map((item: ItemCarrinho) => {
      total += item.quantidade;
    });
    return total;
  }
  public incluirItem(oferta: Oferta): void {
    const itemCarrinho: ItemCarrinho = new ItemCarrinho(
      oferta.id,
      oferta.imagens[0],
      oferta.titulo,
      oferta.descricaoOferta,
      oferta.valor,
      1
    );

    const itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
    if (itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade += 1;
      this.alertService.showAlertSuccessTimeOut('Item adicionado com sucesso', 1000);

    } else {
      this.itens.push(itemCarrinho);
      this.alertService.showAlertSuccessTimeOut('Item adicionado com sucesso', 1000);
    }

  }
  public totalCarrinhoCompras(): number {
    let total = 0;
    this.itens.map((item: ItemCarrinho) => {
      total = total + (item.valor * item.quantidade);
    });
    return total;
  }
  public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {

    const itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
    if (itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade += 1;
    }

  }

  public diminuirQuantidade(itemCarrinho: ItemCarrinho): void {
    const itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
    if (itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade -= 1;

      if (itemCarrinhoEncontrado.quantidade === 0) {
        this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1);
      }
    }
  }

  public limparCarrinho(): void {
    this.itens = [];
  }
  public excluirItem(itemCarrinho: ItemCarrinho) {
    const itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
    if (itemCarrinhoEncontrado) {
      this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1);
    }
  }
}

export { CarrinhoService };
