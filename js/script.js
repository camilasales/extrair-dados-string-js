const conteudo = `<html>
<head>
   <title>Gulliver Traveller - Roteiros</title>
</head>
<body>
 <b>->1 - Roteiros para *São Paulo*</b>
 <br>
 A Terra da Garoa!
 <br>
 Fundada em 25 de janeiro de 1554 a cidade tem hoje cerca de 12 milhões de habitantes e é considerada o centro financeiro do Brasil e aqui vão 3 dicas de roteiros obrigatórios para aqueles que passam pela capital paulista
 <br>
   #Roteiro A | Região: Avenida Paulista
 <br>
 MASP; Parque Trianon; Rua Augusta
 <br>
 #Roteiro B | Região: Centro
 <br>
   Catedral da Sé; Pátio do Colégio; Rua Augusta
 <br>
   #Roteiro C | Região: Vila Madalena
 <br>
   Beco do Batman; Feirinha da Benedito Calixto; Livraria da Vila
 <br> 
 <b>->2 - Roteiros para *Las Vegas*</b>
 <br>
   Viva Las Vegas!
 <br>       
   A cidade mais populosa e mais densamente povoada do estado de Nevada, Las Vegas foi fundada em 1905 e é considerada uma cidade, oficialmente, desde 1911 e conta com mais de meio milhão de habitantes. Venha conhecer a capital dos jogos de azar!
 <br>
   #Roteiro A | Região: Las Vegas Boulevard South
 <br>
   Fonte do Bellagio; Principais Cassinos; Madame Tussauds
 <br>
   #Roteiro B | Região: Downtown;
 <br> 
   Fremont; Las Vegas Art Museum; Museu nacional do Crime Organizado; 
 <br>
   #Roteiro C | Região: Las Vegas Boulevard North
 <br>
 Outlet Premium North; Stratosphere; Apple Fashion Show<br><b>->3 - Roteiros para *Moscou*</b>
 <br>
   Privet!
 <br>
   A capital Russa fica situada às margens do Rio Moscou e apesar de ser a cidade mais cosmopolita da Rússia, conta com grande resguardo de sua história soviética<br>#Roteiro A | Região: Praça Vermelha<br>Museu Histórico do Estado; Catedral de São Basílico; Mausoléu de Lênin
 <br>
   #Roteiro B | Região: Centro
 <br>
   Teatro Bolshoi; Monumento a Karl Marx; Rio Moscou
 <br>
   #Roteiro C | Região: Obras pela cidade
 <br>
   Metrô de Moscou; As Sete Irmãs; Moscow Leningradsky Railway Station  
 <br> 
</body>
</html>`;


function separarCidades() {
  let listaCidades = [];
  let cidades = conteudo.split('->');
  for (let index = 0; index < cidades.length; index++) {
    if(cidades[index].startsWith('<')){
      continue;
    }
    listaCidades.push(cidades[index]);      
  }
  return listaCidades;
}

function pegarCidadeConteudo(nomeCidade = null) {
  let listaCidadeConteudo = [];
  let temporario = [];
  for (let index = 0; index < separarCidades().length; index++) {
    temporario.push(separarCidades()[index].split(`*`));
    listaCidadeConteudo.push(
      {
        cidade: temporario[index][1], 
        conteudo: temporario[index][2], 
      }
    );
  }

  return listaCidadeConteudo.filter( cidadeConteudo => {
    if(nomeCidade == null) return cidadeConteudo;
    if(cidadeConteudo.cidade == nomeCidade){
      return cidadeConteudo;
    }
  });
}
function listaRoteiro(stringRoteiro, letraRoteiro, regiao = '') {
  let arrayOfStrings = stringRoteiro.split('#Roteiro');
  let roteiros = [];
  for (let index = 0; index < arrayOfStrings.length; index++) {
    console.log(arrayOfStrings[index]);
    if(arrayOfStrings[index].startsWith(` ${letraRoteiro} | Região: ${regiao}`)){
      roteiros.push(arrayOfStrings[index]);      
      continue
    }
  }
  return roteiros;
}
function locaisCitadosRoteiro(stringRoteiro, letraRoteiro, regiao = '') {
  let arrayOfStrings = [];
  let locais = [];
  for (let index = 0; index < listaRoteiro(stringRoteiro, letraRoteiro, regiao).length; index++) {
    arrayOfStrings.push(listaRoteiro(stringRoteiro, letraRoteiro, regiao)[index].split('<br>'));
    locais.push(arrayOfStrings[index][1].split(';'));
  }
  return locais.flat();
}

let cidades =  pegarCidadeConteudo().map( cidades => {return cidades.cidade;});
let conteudos =  pegarCidadeConteudo().map( conteudos => {return conteudos.conteudo;});
let conteudosSaoPaulo =  pegarCidadeConteudo('São Paulo').map( conteudos => {return conteudos.conteudo;});
let conteudosLasVegas =  pegarCidadeConteudo('Las Vegas').map( conteudos => {return conteudos.conteudo;});

document.write(`<b>Cidades Avaliadas: </b>${cidades} <br>`);
document.write(`<b>Conteúdo roteiro A: </b> <br> ${listaRoteiro(conteudos.toString(), 'A')}`);
document.write(`<b>Quantidade locais citados roteiro A: </b> ${locaisCitadosRoteiro(conteudos.toString(), 'A').length}<br>`);
document.write(`<b>Pontos turisticos do centro: </b> ${locaisCitadosRoteiro(conteudosSaoPaulo.toString(),'B', 'Centro')}<br>`);
document.write(`<b>Pontos turisticos de downtown: </b> ${locaisCitadosRoteiro(conteudosLasVegas.toString(),'B', 'Downtown')}`);
console.log(conteudos.toString());