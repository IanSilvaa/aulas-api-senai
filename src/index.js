const express = require('express');
const port = 3000;

const app = express();
app.use(express.json());

app.get('/usuarios', (req, res) => {
    console.log(req.query);
    res.send('Chamou o GET!');
});
app.post('/usuarios', (req, res) => {
    console.log(req.body);
    res.send(`Chamou o POST com o nome: ${req.body.nome}`);
});
app.put('/usuarios', (req, res) => {
    console.log(req.headers);

    if (!req.headers.autorizacao){
        res.status(401).send('Informe o HEADER "autorizacao"')
    }else{
        res.send('Chamou o PUT!');
    }

});
app.delete('/usuarios/:id', (req, res) => {
    console.log(req.params);
    res.send(`Chamou o DELETE com id: ${req.params.id}`);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
