const formatador = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatarPreco(valor) {
  // Intl usa espaço não separável entre "R$" e o número; normaliza para espaço comum
  return formatador.format(Number(valor)).replace(/\s/g, ' ');
}
