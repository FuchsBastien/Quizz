// OU const form = document.querySelectorAll ('.form-quizz .question-block');
const form = document.querySelector('.form-quizz');
const toutesLesQuestions = document.querySelectorAll ('.question-block');
const titreResultat = document.querySelector ('.resultats h2');
const aideResultat = document.querySelector ('.aide');
const noteResultat = document.querySelector ('.note');
const reponses = ['c','a','b','a','c'];
let tableauResultats = [];
let verifTableau = [];
//green mark emoji
const emojis = ['✔️','✨','👀','😭','👎'];

form.addEventListener('submit', (e) => {
    //prevenir le comportement par défault de ne pas actualiser la page
    e.preventDefault ();
    /*afficher la réponse de la 1ère question
    console.log(document.querySelector('input[name="q1"]:checked').value);*/
    for( i= 1; i < 6; i++) {
        //backtits pour écrire q${i} = 1,2,3..
        tableauResultats.push(document.querySelector(`input[name="q${i}"]:checked`).value)
    }
    //console.log(tableauResultats);
    verifFunc(tableauResultats);
    //on repasse à un tableau vide
    tableauResultats = [];
})


function verifFunc(tabResultats) {
    // on peut écrire des i, a ...
    for (let a = 0; a < 5 ; a++) {
      
        if (tabResultats [a] === reponses [a]) {
            verifTableau.push(true);
        } else {
            verifTableau.push(false); 
        }
    }
    //console.log(verifTableau);
    afficherResultats (verifTableau);
    couleursFonction (verifTableau);
    verifTableau = [];
}


function afficherResultats(tabCheck) {
    //créer un nouveau tableau en gardant que les false
    const nbDeFautes = tabCheck.filter(el => el !== true).length;
    //console.log(nbDeFautes);

    switch (nbDeFautes) {
        case 0:
            //chercher les emojis dynamiquement
            titreResultat.innerText = ` ${emojis[0]} Bravo, c'est un sans faute ! ${emojis[0]}`
            aideResultat.innerText = ''
            noteResultat.innerText = '5/5'
            break;

        case 1:
            //ou mettre directement l'emoji
            titreResultat.innerText = `✨ Vous y êtes presque ! ✨`
            aideResultat.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !'
            noteResultat.innerText = '4/5'
            //passer à un autre cas
            break;

        case 2:
            titreResultat.innerText = `✨ Encore un effort ... 👀`
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            noteResultat.innerText = '3/5'
            break;

        case 3:
            titreResultat.innerText = `👀 Il reste quelques erreurs. 😭`
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            noteResultat.innerText = '2/5'
            break;

        case 4:
            titreResultat.innerText = `😭 Peux mieux faire ! 😭`
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            noteResultat.innerText = '1/5'
            break;

        case 5:
            titreResultat.innerText = `👎 Peux mieux faire ! 👎`
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            noteResultat.innerText = '0/5'
            break;
    
        default:
            'Wops, cas innatendu';
    }
}


function couleursFonction(tabValBool) {

    for (let j = 0; j < tabValBool.length; j++){

        if(tabValBool [j] === true){
        toutesLesQuestions[j].style.background = 'lightgreen';
        } else {
            toutesLesQuestions[j].style.background = '#ffb8b8';
            //ajoute la classe echec auquel on a mis l'animation
            toutesLesQuestions[j].classList.add('echec');

            //relance l'animation en enlevant la classe echec au bout de 500 ms
            setTimeout(() => {
                toutesLesQuestions[j].classList.remove('echec');
            }, 500)
        }

    }
}

toutesLesQuestions.forEach(item => {
    item.addEventListener('click', () => {
        item.style.background = "white";
    })
})