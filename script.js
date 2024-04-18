const app = () => {
  return {
    dadosDosPersonas: [],
    personagemSelecionado: null,
    episodiosSelecionado: [],
    vizinhoSelecionado: [],
    urlPadrao: "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
    init() {
      
      axios.get('https://rickandmortyapi.com/api/character').then((resposta) => {
        
        for(let i = 1; i < resposta.data.info.pages; i++){
          
          axios.get(`https://rickandmortyapi.com/api/character?page=${i}`).then((resposta2) => {
            
            this.dadosDosPersonas = this.dadosDosPersonas.concat(resposta2.data.results);

            this.dadosDosPersonas.sort((a, b) => {
              const nomeA = a.name.toUpperCase();
              const nomeB = b.name.toUpperCase();
              if (nomeA < nomeB) {
                return -1;
              }
              if (nomeA > nomeB) {
                return 1;
              }
              return 0;
            });
            
          }).catch((error) => {
            
            console.log(error);
            
          })
        }

      }).catch((error) => {
        
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
