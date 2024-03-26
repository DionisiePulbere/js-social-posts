const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
// Milestone 1 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.✔️
// Milestone 2 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter
//               dei likes relativo.
// Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
// BONUS
// 1. Formattare le date in formato italiano (gg/mm/aaaa)
// 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente 
// (es. Luca Formicola > LF).✔️
// 3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e 
// cambiare il colore del bottone.
// Consigli del giorno:
// Ragioniamo come sempre a step.
// Prima scriviamo nei commenti la logica in italiano e poi traduciamo in codice.
// console.log() è nostro amico.
// Quando un pezzo di codice funziona, chiediamoci se possiamo scomporlo in funzioni più piccole.

const container = document.getElementById('container');

posts.forEach((singlePost) => {
     const postTemplate = generatePost(singlePost);
     container.innerHTML += postTemplate;
});

const allLikeBtn = document.querySelectorAll('.js-like-button');
const likeCounter = document.querySelectorAll('.js-likes-counter');

const likedPostArray = [];


allLikeBtn.forEach((greenBtn, index) => {
    const thisLikeCounter = likeCounter[index];

    greenBtn.addEventListener('click', function(event) {
        event.preventDefault();

        const likePost = allLikeBtn[index];
        if(!likePost.classList.contains("like-button--liked")) {
            likePost.classList.add('like-button--liked');
            parseInt(thisLikeCounter.textContent++);
            likedPostArray.push(index);
        } else {
            likePost.classList.remove('like-button--liked');
            parseInt(thisLikeCounter.textContent--);
            likedPostArray.splice(likedPostArray.indexOf(index), 1);
        }
    });
   
});

console.log(likedPostArray);




// FUNCTIONS 
// funzione per gestire il template 
function generatePost(postObject) {
    const {id, content, media, author, likes, created} = postObject;
    const {name, image} = author;

    const createdArray = created.split('-');
    const [year, month, day] = createdArray;

    const postTemplate =`
        <div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                          ${authorImage(author)}           
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${name}</div>
                        <div class="post-meta__time">${day}-${month}-${year}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${content}</div>
            <div class="post__image">
                <img src="${media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" href="#" data-postid="${id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>
    `;
    return postTemplate;
};

// funzione per gestire l'immagine del profilo 
function authorImage(author) {
    const nameArray = author.name.split(' ');
    const [firstname, lastname] = nameArray;
    const letterFirstnameArray = firstname.split('');
    const letterLastnameArray =lastname.split('');

    let authorPic;
    if(author.image) {
        authorPic =`<img class="profile-pic" src="${author.image}" alt="${author.name}">`    
        } else {
            authorPic = `${letterFirstnameArray[0]}${letterLastnameArray[0]}`
        }
    return authorPic;
};