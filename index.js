$('document').ready(

    function inicio() {

        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/receita',
            success: function (dados) {

                $('#cardReceita').remove();

                for (let i = 0; i < dados.length; i++) {

                    let cardReceita = $(`
                        <div id="receitaCard">
                        <div id="imgCard">
                            <img src="${dados[i].img}" />
                            <div id="idReceita">${dados[i].id}</div>
                        </div>
                        <div id="infoCard">
                            <h4>${dados[i].nome}</h4>
                            <p>${dados[i].descricao}</p>
                        </div>
                        <div id="btnCard">
                            <p><a href="${dados[i].url}" target="_blank" >Ir para a receita</a></p>
                        </div>
                        </div>
                    `)

                    $('#receitas').append(cardReceita);
                }


            },
            error: function (dados) {
                console.log("Deu algum erro aí meu chapa! rs")
            }
        });

        //utilizando os filtros
        $('#btnPesquisar').on('click', function () {

            $('#receitas').remove();

            let receitas = $(`<div id="receitas"></div>`);
            $("#divHome").append(receitas);

            let categoria = $("input[name='opcoes']:checked").val();

            $.ajax({
                type: 'GET',
                url: `http://localhost:3000/receita/${categoria}`,
                success: function (dados) {
                    for (let i = 0; i < dados.length; i++) {
                        let cardReceita = $(`
                            <div id="receitaCard">
                            <div id="imgCard">
                                <img src="${dados[i].img}" />
                                <div id="idReceita">${dados[i].id}</div>
                            </div>
                            <div id="infoCard">
                                <h4>${dados[i].nome}</h4>
                                <p>${dados[i].descricao}</p>
                            </div>
                            <div id="btnCard">
                                <p><a href="${dados[i].url}" target="_blank" >Ir para a receita</a></p>
                            </div>
                            </div>
                        `)

                        receitas.append(cardReceita);
                    }


                },
                error: function (dados) {
                    console.log("Deu algum erro aí meu chapa! rs")
                }
            });
        })


        $("#btnAdicionar").on('click', function () {

            let nomeReceita = $("#nomeReceita").val();
            let catReceita = $("#catReceita").val();
            let descReceita = $("#descReceita").val();
            let urlReceita = $("#urlReceita").val();
            let imgReceita = $("#imgReceita").val();

            console.log(nomeReceita)

            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/receita/addReceita',
                data: JSON.stringify({
                    nome: nomeReceita,
                    categoria: catReceita,
                    descricao: descReceita,
                    url: urlReceita,
                    img: imgReceita
                }),
                success: function (dados) {

                    $('#res').children().remove();
                    $('#res').append(`<p>Receita adicionada com sucesso.</p>`);
                },
                error: function (dados) {
                    console.log('ERRO')
                },
                contentType: 'application/json',
            });
        })

        $("#btnExcluir").on('click', function () {
            let idReceita = $("#idReceitaExcluir").val();

            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/receita/excluirReceita',
                data: JSON.stringify({
                    id: idReceita,
                }),
                success: function (dados) {
                    $('#resExcluir').html(`
                    <p>${dados.status}</p>
                `)
                },
                error: function (dados) {
                    console.log('ERRO')
                },
                contentType: 'application/json'

            });
        })



        // Funcao para "mudar" as páginas
        $('a').on('click', function (e) {
            switch ($(this).attr('id')) {
                case 'pgHome':
                    $('#divHome')[0].style = "display: block;"
                    $('#divAdicionar')[0].style = "display: none;"
                    $('#divEditar')[0].style = "display: none;"
                    break;
                case 'pgAdicionar':
                    $('#divAdicionar')[0].style = "display: block;"
                    $('#divHome')[0].style = "display: none;"
                    $('#divEditar')[0].style = "display: none;"
                    break;
                case 'pgEditar':
                    $('#divEditar')[0].style = "display: block;"
                    $('#divHome')[0].style = "display: none;"
                    $('#divAdicionar')[0].style = "display: none;"
                    break;
                default:
                    return;
            }
        })

    }

)