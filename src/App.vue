<template>
  <div id="app">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Crush Management</h1>
        <p class="lead">Uma forma simples de manter registro dos seus contatinhos!</p>
        <hr class="my-4">
        <a class="btn btn-outline-danger btn-md align-center" href="https://medium.com/nerdzao/crie-uma-api-restful-em-nodejs-para-gerenciar-seus-crushs-c4c74c3db96e" role="button">Descubra mais!</a>
      </div>
    </div>

    <div class="container">
      <form @submit.prevent="salvar">
        <input type="text"  class="form-control col-md-4" placeholder="Nome" v-model="crush.nome">
        <input type="text" class="form-control col-md-4" placeholder="Apelido" v-model="crush.apelido">
        <input type="text" class="form-control col-md-4" placeholder="whatsapp" v-model="crush.whatsapp">
        <input type="text" class="form-control col-md-4" placeholder="observacoes" v-model="crush.observacoes">
        <input type="text" class="form-control col-md-4" placeholder="comoconheceu" v-model="crush.comoconheceu">
        <input type="text" class="form-control col-md-4" placeholder="idade" v-model="crush.idade">
        <input type="text" class="form-control col-md-4" placeholder="altura" v-model="crush.altura">
        <input type="text" class="form-control col-md-4" placeholder="local" v-model="crush.local">
        <input type="text" class="form-control col-md-4" placeholder="foto" v-model="crush.foto">
        <input type="text" class="form-control col-md-4" placeholder="nota" v-model="crush.nota">
        <input type="text" class="form-control col-md-4" placeholder="notaresponsabilidade" v-model="crush.notaresponsabilidade">
        <input type="text" class="form-control col-md-4" placeholder="notaatitude" v-model="crush.notaatitude">
        
        <button class="btn btn-success btn-lg btn-block">
          <i class="fas fa-hand-holding-heart"></i>
        </button>
      </form>

      <div class="row">
        <div v-for="crush of crushs" :key="crush._id" class="col-sm-6 box">
          <img :src="crush.foto">
          <h2>{{ crush.nome }}</h2>
          <p>Apelido:
            <b>{{ crush.apelido }}</b> || Whatsapp:
            <b>{{ crush.whatsapp }}</b>
          </p>
          <p>Idade:
            <b>{{ crush.idade }}</b> || Altura:
            <b>{{ crush.altura }}</b> || Nota:
            <b>{{ crush.nota }}</b> || Atitude:
            <b>{{ crush.notaatitude }}</b> || Responsabilidade:
            <b>{{ crush.notaresponsabilidade }}</b>
          </p>
          <p>Local:
            <b>{{ crush.local }}</b> || Como conheceu:
            <b>{{ crush.comoconheceu }}</b>
          </p>
          <p>Observações:
            <b>{{ crush.observacoes }}</b>
          </p>

          <div class="buttons mx-auto" style="width:85px">
            <button @click="editar(crush)" class="btn btn-info">
              <i class="fas fa-heartbeat"></i>
            </button>
            
            <button @click="deletar(crush)" class="btn btn-danger">
              <i class="fas fa-heart-broken"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- .container -->
  </div>
  <!-- #app -->
</template>

<script>
import Crushs from "./services/crushs";

export default {
  data() {
    return {
      crush: {
        nome: "",
        apelido: "",
        foto: "",
        altura: "",
        comoconheceu: "",
        idade: "",
        local: "",
        nota: "",
        notaatitude: "",
        notaresponsabilidade: "",
        observacoes: "",
        whatsapp: ""
      },
      crushs: []
    };
  },

  mounted() {
    this.listar();
  },

  methods: {
    listar() {
      Crushs.listar().then(resposta => {
        this.crushs = resposta.data.result;
      });
    },
    salvar() {
      if (!this.crush._id) {
        Crushs.salvar(this.crush).then(resposta => {
          this.crush = {};
          alert("Cadastrado com amor!");
          this.listar();
        });
      } else {
        Crushs.atualizar(this.crush).then(resposta => {
          this.crush = {};
          alert("atualizado");
          this.listar();
        });
      }
    },

    editar(crush) {
      this.crush = crush;
    },

    deletar(crush) {
      if (confirm("Apaga mesmo esse cretino!")) {
        Crushs.apagar(crush).then(resposta => {
          this.listar();
        });
      }
    }
  }
};
</script>

<style>
.jumbotron {
  background: black;
}
.jumbotron h1,
.jumbotron p {
  color: white;
}
.box {
  margin-top: 30px;
  margin-bottom: 100px;
}
h2 {
  font-weight: bold;
  text-align: center;
}
img {
  max-height: 300px;
  display: block;
  margin: 0 auto;
}
.form-control{
  display: inline-block;
}
form{
  margin-bottom: 80px;
}
</style>
