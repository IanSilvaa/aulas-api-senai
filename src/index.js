import cors from 'cors';
import express from 'express';
import UsuariosController from './controllers/UsuariosController.js';

const port = 3000

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: '*'
    })
);

const usuariosController = new UsuariosController();

// CRUD Usuários
app.get('/usuarios', usuariosController.listar);
app.post('/usuarios', usuariosController.adicionar);
app.put('/usuarios', usuariosController.atualizar);
app.delete('/usuarios/:idUsuario', usuariosController.excluir);

app.listen(port, () => {
    console.log(`App listening om port ${port}`);
})