const app = () => {
  return {
    dadosDosPersonas: [],
    personagemSelecionado: null,
    episodiosSelecionado: [],
    vizinhoSelecionado: [],
    urlPadrao: "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
    init() {
      axios.get('https://rickandmortyapi.com/api/character')
        .then((resposta) => {
          this.dadosDosPersonas = resposta.data.results;
          console.log(this.dadosDosPersonas);
        })
        .catch((error) => {
          console.log(error);
        })
    },
    selecionarPersonagem(personagem) {

      this.personagemSelecionado = personagem;
      console.log(this.personagemSelecionado);

      
      this.episodiosSelecionado = [];
      for (episodio of personagem.episode) {
        axios.get(episodio)
          .then((resposta) => {
            this.episodiosSelecionado.push("Ep "+resposta.data.id+" - "+resposta.data.name);
          })
          .catch((error) => {
            console.log(error);
          })
      }

      this.vizinhoSelecionado = [];    
      axios.get(personagem.location.url)
      .then((resposta) => {
            for (vizinho of resposta.data.residents) {
                axios.get(vizinho)
                  .then((resposta2) => {
                    this.vizinhoSelecionado.push(resposta2.data.name);
                  })
                  .catch((error) => {
                    console.log(error);
                  })
              }
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }
}

