const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pg = require('pg');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new pg.Client(
    {
        user: 'postgres',
        host: 'localhost',
        database: 'projeto02',
        password: 'admin',
        port: 5432,
    }

);

client.connect();


app.listen(3000, () => {
    console.log('Servidor web funcionando');
});


app.get("/receita", function (req, res) {
    client.query('SELECT * FROM receita')
        .then(
            function (ret) {
                res.json(ret.rows);
            }
        )
});


//servico criado para ser consumido nos filtros
app.get('/receita/:categoria', function (req, res) {
    if (req.params.categoria == 'Sobremesa' || req.params.categoria == 'Salgados') {
        client.query(
            {
                text: 'SELECT * FROM receita WHERE categoria = $1',
                values: [req.params.categoria]
            }
        )
            .then(
                function (ret) {
                    res.json(ret.rows);
                }
            )
    } else {
        client.query('SELECT * FROM receita')
            .then(
                function (ret) {
                    res.json(ret.rows);
                }
            )
    }
});

//servico para adicionar receitas no banco de dados

app.post('/receita/addReceita', function (req, res) {
    client.query(
        {
            text:
                'INSERT INTO receita (nome, categoria, descricao, url, img) VALUES($1, $2, $3, $4, $5)',
            values:
                [req.body.nome, req.body.categoria, req.body.descricao, req.body.url, req.body.img]
        }
    )
        .then(
            function (ret) {
                res.json(
                    {
                        status: 'ENVIADO COM SUCESSO',
                        dadosEnviados: req.body
                    }
                )
            }
        );
});

//servico para excluir uma receita

app.post('/receita/excluirReceita', function (req, res) {
    client.query(
        {
            text:
                'DELETE FROM receita WHERE ID = $1',
            values:
                [req.body.id]
        }
    )
        .then(
            function (ret) {
                res.json(
                    {
                        status: 'Receita excluída com sucesso',
                        dadosEnviados: req.body
                    }
                )
            }
        );
});