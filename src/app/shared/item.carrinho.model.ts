export class ItemCarrinho {
  constructor(
    public id: number,
    public img: { url: string },
    public titulo: string,
    public descricaoOferta: string,
    public valor: number,
    public quantidade: number
  ) { }
}

