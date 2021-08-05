function criaDivisaoInteira() {
    const divisor = Math.round(Math.random() * 50);
    const quociente = Math.round(Math.random() * 150);
    const dividendo = divisor * quociente;
    return {
        dividendo: dividendo,
        divisor: divisor,
        quociente: quociente,
        questao: `Quanto é ${dividendo} / ${divisor} ?`
    }
}
function gerarQuestaoHTML(dados) {
    const questao = document.createElement('div');
    questao.classList.add('questao');

    const span = document.createElement('span');
    const spanContent = document.createTextNode(dados.questao);
    span.appendChild(spanContent);
    questao.appendChild(span);

    const inputBox = document.createElement('div');
    inputBox.classList.add('input-box');
    const inputResposta = document.createElement('input');
    inputResposta.setAttribute('type', 'number');
    inputResposta.setAttribute('placeholder', 'Sua resposta');
    const inputBotao = document.createElement('input');
    inputBotao.setAttribute('type', 'image');
    inputBotao.setAttribute('src', 'seta.png');
    inputBox.appendChild(inputResposta);
    inputBox.appendChild(inputBotao);
    questao.appendChild(inputBox);
    questao.dataset.resposta = dados.quociente;

    return questao;
}
const areaQuestao = document.querySelector('.area-questao');

for (let i = 0; i < 20; i++) {
    areaQuestao.appendChild(gerarQuestaoHTML(criaDivisaoInteira()));
}

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight) {
        for (let i = 0; i < 5; i++) {
            areaQuestao.appendChild(gerarQuestaoHTML(criaDivisaoInteira()));
        }
    }
});

areaQuestao.addEventListener('click', (e) => {
    if (e.target.getAttribute('type') == 'image') {
        const respostaHTML = e.target.parentNode.querySelector("input[type='number']");
        const suaResposta = respostaHTML.value;
        const questaoHTML = e.target.parentNode.parentNode;
        const respostaCerta = questaoHTML.dataset.resposta;

        questaoHTML.classList.add(suaResposta == respostaCerta ? 'acerto' : 'erro');
        respostaHTML.setAttribute('disabled', '');

        const promixaQuestaoHTML = questaoHTML.nextSibling;
        const proximaRespostaHTML = promixaQuestaoHTML.querySelector("input[type='number']");
        proximaRespostaHTML.focus();
    }
});

areaQuestao.addEventListener('keyup', (e) => {
    var key = e.which || e.keyCode;
    if (key == 13) { 
        const respostaHTML = e.target.parentNode.querySelector("input[type='number']");
        const suaResposta = respostaHTML.value;
        const questaoHTML = e.target.parentNode.parentNode;
        const respostaCerta = questaoHTML.dataset.resposta;

        questaoHTML.classList.add(suaResposta == respostaCerta ? 'acerto' : 'erro');
        respostaHTML.setAttribute('disabled', '');

        const promixaQuestaoHTML = questaoHTML.nextSibling;
        const proximaRespostaHTML = promixaQuestaoHTML.querySelector("input[type='number']");
        proximaRespostaHTML.focus();
        console.log(proximaRespostaHTML);
    }
});
