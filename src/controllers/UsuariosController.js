import ConexaoMySql from "../database/ConexaoMySql.js";

class UsuariosController {
    async listar(req, resp) {
        try {
            const filtro = req.query.filtro || '';
            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'SELECT * FROM dados_estudantes WHERE nome LIKE ?';
            const [resultado] = await conexao.execute(sql, [`%${filtro}%`]);

            resp.send(resultado);
            // resp.send(
            //     resultado.map((u) => {
            //         delete u.senha;
            //         return u;
            //     })
            // );
        } catch (error) {
            resp.status(500).send(error)
        };
    }

    async adicionar(req, resp) {
        try {
            const novoUsuario = req.body;

            if (!novoUsuario.nome || !novoUsuario.matricula) {
                resp.status(400).send('Os campos nome e matricula são obrigatórios!');
                return;
            }

            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'INSERT INTO dados_estudantes (nome, matricula) VALUES (?,?)';
            const [resultado] = await conexao.execute(sql, [novoUsuario.nome, novoUsuario.matricula]);

            resp.send(resultado);
        } catch (error) {
            resp.status(500).send(error)
        };
    }

    async atualizar(req, resp) {
        try {
        const usuarioEditar = req.body;

        if (!usuarioEditar.nome || !usuarioEditar.matricula) {
            resp.status(400).send('Os campos nome e matricula são obrigatórios para atualizar!');
            return;
        }

        const conexao = await new ConexaoMySql().getConexao();
        const sql = 'UPDATE dados_estudantes SET nome = ?, matricula = ? WHERE id_dados_estudantes = ?';
        const [resultado] = await conexao.execute(sql, [
            usuarioEditar.nome, 
            usuarioEditar.matricula,
            usuarioEditar.id_dados_estudantes
        ]);

        resp.send(resultado);
    } catch (error) {
        resp.status(500).send(error)
    }; }

    async excluir(req, resp) {
        try {
            +req.params.idUsuario;
            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'DELETE FROM dados_estudantes WHERE id_dados_estudantes = ?';
            const [resultado] = await conexao.execute(sql, [+req.params.idUsuario]);

            resp.send(resultado);
        } catch (error) {
            resp.status(500).send(error)
        };
    }
}

export default UsuariosController;