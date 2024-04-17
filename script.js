const app = () => {
  return {
    dadosDosPersonas: [],
    personagemSelecionado: null,
    episodiosSelecionado: [],
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
      let episodios = personagem.episode;
      console.log(episodios);

      for (episodio of episodios) {
        axios.get(episodio)
          .then((resposta) => {
            this.episodiosSelecionado.push("Ep:"+resposta.data.id+" - "+resposta.data.name);
          })
          .catch((error) => {
            console.log(error);
          })
      }
      console.log(this.episodiosSelecionado);
    }
  }
}

