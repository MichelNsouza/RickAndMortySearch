const app = () =>{
  return {
    dadosDosPersonas:[], 
    personagemSelecionado: null,
    dadosDosPersonaEpisodios: [],
    urlPadrao: "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
    init() {
        axios.get('https://rickandmortyapi.com/api/character')
        .then((resposta) => {
          this.dadosDosPersonas = resposta.data.results
          console.log(this.dadosDosPersonas);
        })
        .catch((error) => {
          console.log(error);
        })
      },
    selecionarPersonagem(personagem) {
      this.personagemSelecionado = personagem;

      this.dadosDosPersonaEpisodios = [];

      for(episodio in personagem.episode){
        
        axios.get(episodio)
        .then((resposta) => {
          this.dadosDosPersonaEpisodios.push(resposta.data.name);
          console.log(resposta.data.name);
        })
        .catch((error) => {
          console.log(error);
        })
      }
      console.log(this.personagemSelecionado);
      
       console.log(this.dadosDosPersonaEpisodios);
    }
  }
}
