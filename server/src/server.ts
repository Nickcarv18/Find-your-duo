import express from "express";

const app = express();

app.get('/ads', (request, response) => {
    return response.json([
        { id: 1 , nome: 'Anúncio 1'},
        { id: 2 , nome: 'Anúncio 2'},
        { id: 3 , nome: 'Anúncio 3'},
    ])
})

app.listen(3333);