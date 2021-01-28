/* variavel de interface */
let seuVoto = document.querySelector('.d1Frase span')
let cargo = document.querySelector('.d1Cargo span')
let info = document.querySelector('.d1Info')
let aviso = document.querySelector('.d2')
let lateralDireito = document.querySelector('.d1LadoDireito')
let numeros = document.querySelector('.d1Num')
/* variavel de controle de ambiente */
let etapaAtual = 0
let numero = ''
let votoBranco = false
let votos = []

function comecarEtapa(){
    let etapa = etapas[etapaAtual]
    let numeroHtml = ''
    numero = ''
    votoBranco = false

    for(let i=0; i<etapa.numeros; i++){
        if(i === 0){
            numeroHtml += '<div class="num pisca"></div>'
        }else{
            numeroHtml += '<div class="num"></div>'
        }
    }

    seuVoto.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    info.innerHTML = ''
    aviso.style.display = 'none'
    lateralDireito.innerHTML = ''
    numeros.innerHTML = numeroHtml
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.nume === numero){
            return true
        }else{
            return false
        }
    })

    if(candidato.length > 0){
        candidato = candidato[0]
        seuVoto.style.display = 'block'
        aviso.style.display = 'block'
        info.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`

        let fotosHtml =  ''
        for(let i in candidato.fotos){
            if (candidato.fotos[i].url.small) {
                fotosHtml += `<div class="d1Image small"><img src="img/${candidato.fotos[i].url}"alt="">${candidato.fotos[i].legenda}</div>`
            }else{
             fotosHtml += `<div class="d1Image"><img src="img/${candidato.fotos[i].url}"alt="">${candidato.fotos[i].legenda}</div>`
            }
        }

        lateralDireito.innerHTML = fotosHtml

    }else{
        seuVoto.style.display = 'block'
        aviso.style.display = 'block'
        info.innerHTML = '<div class="avisoGrande pisca">VOTO NULO</div>'
    }

    console.log('Candidato', candidato)
}

function clicou(n){
    let numPisca = document.querySelector('.num.pisca')
    if (numPisca !== null) {
        numPisca.innerHTML = n
        numero = `${numero}${n}`
        numPisca.classList.remove('pisca')
        if(numPisca.nextElementSibling !== null){
            numPisca.nextElementSibling.classList.add('pisca')
        }else{
            atualizaInterface()
        }
    }
}

function branco(){
    numero = ''
    votoBranco = true
    votoBranco == true 
    seuVoto.style.display = 'block'
    aviso.style.display = 'block'
    numeros.innerHTML = ''
    info.innerHTML = '<div class="avisoGrande pisca">VOTO EM BRANCO</div>'
    lateralDireito.innerHTML = ''

    /* PODE TAMBEM USAR O CODIGO A BAIXO
    if(numero === ''){
        votoBranco == true 
        seuVoto.style.display = 'block'
        aviso.style.display = 'block'
        numeros.innerHTML = ''
        info.innerHTML = '<div class="avisoGrande pisca">VOTO EM BRANCO</div>'
    }else{
        alert('Para votar em BRANCO, não pode conter número')
    }
    */

}

function corrigir(){
    comecarEtapa()
}

function confirmar(){
    let etapa = etapas[etapaAtual]
    let votoConfirmado = false

    if (votoBranco === true) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            votos: 'BRANCO'
        })
    }else if (numero.length === etapa.numeros) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            votos: numero
        })
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa()
        }else{
            document.querySelector('.tela').innerHTML = '<div class="avisoGigante pisca">FIM</div>'
            console.log(votos)
        }
    }
}

comecarEtapa()

