// Função para formatar o valor no estilo monetário enquanto o usuário digita
const formatarValor = (valor, countryFormatValue='pt-br', currency='BRL') => {
    const valorNumerico = valor.replace(/\D/g, '');
    const valorFormatado = (Number(valorNumerico) / 100).toLocaleString(countryFormatValue, {
        style: 'currency',
        currency: currency,
    });
    return valorFormatado;
};

// Função para remover a formatação no momento de salvar
const removerFormatacaoValor = (valorFormatado) => {
    return parseFloat(valorFormatado.replace(/[^\d,]/g, '').replace(',', '.'));
};

export { formatarValor, removerFormatacaoValor }