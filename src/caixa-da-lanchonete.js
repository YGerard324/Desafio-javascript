class CaixaDaLanchonete {
  constructor() {
    // Inicialização do cardápio com itens e preços
    this.cardapio = [
      { codigo: '1', descricao: 'Cachorro Quente', valor: 4.00 },
      { codigo: '2', descricao: 'X-Salada', valor: 4.50 },
      { codigo: '3', descricao: 'X-Bacon', valor: 5.00 },
      { codigo: '4', descricao: 'Torrada Simples', valor: 2.00 },
      { codigo: '5', descricao: 'Refrigerante', valor: 1.50 }
    ];
  }

  calcularValorDaCompra(formaDePagamento, itens) {
        if (itens.length === 0) {
        return 'Não há itens no carrinho de compra!';
        }

    let valorTotal = 0;
    // Iteração pelos itens do pedido
    for (const itemPedido of itens) {
      const [codigo, quantidade] = itemPedido.split(',');
      const itemCardapio = this.cardapio.find((item) => item.codigo === codigo);

      if (itemCardapio) {
        valorTotal += itemCardapio.valor * parseInt(quantidade);
      } else {
        return 'Item inválido!';
      }
    }
    // Determina o método de pagamento
    const retornoMetodoDePagamento = this.metodoDePagamento(formaDePagamento);
    if (retornoMetodoDePagamento === 'Forma de pagamento inválida!') {
      return retornoMetodoDePagamento;
    }
    // Valida a quantidade dos itens no pedido
    const validQtd = this.validaQuantidade(itens);
    if (!validQtd) {
      return 'Quantidade inválida!';
    }
    // Calcula o desconto ou acrescmo de acordo com o metodo de pagamento
    if (formaDePagamento === 'dinheiro') {
      valorTotal -= valorTotal * this.descontoDinheiro;
    } else if (formaDePagamento === 'credito') {
      valorTotal += valorTotal * this.acrescimoCredito;
    }

    return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
  }

  // Função que valida a quantidade dos itens no pedido
  validaQuantidade(itens) {
    for (const item of itens) {
      if (Number.isInteger(parseInt(item))) {
        return false;
      }
      const [quantidade] = item.split(',');

      if (!Number.isInteger(parseInt(quantidade)) || parseInt(quantidade) <= 0) {
        return false; // Retorna false se a quantidade for inválida
      }
    }

    return true; // Retorna true se todas as quantidades forem válidas
  }
}
// Exporta a classe
export { CaixaDaLanchonete };
