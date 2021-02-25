import express from 'express';

const app = express();

// Metodos: GET => buscar; POST => salvar; PUT => Alterar; DELETE => deletar;
//PATCH => alteração especifica

//http://localhost:3333/users
app.get("/", (request, response) => {
  return response.json({ message: "Hello World!" })
});

app.post("/", (request, response) => {
  //recebeu os dados para salvar
  return response.json({ message: "Os dados foram salvos com sucesso!" })
})

app.listen(3333, () => console.log("Server is running!"));