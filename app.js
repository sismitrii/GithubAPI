const input = document.querySelector("input");
const affichage = document.querySelector(".affichage");
const form = document.querySelector(".form-search");



input.addEventListener('input', function(e){
    if (e.target.value !== ""){
        e.target.parentNode.classList.add("active");
    } else if (e.target.value === ""){
        e.target.parentNode.classList.remove("active");
    }
});

async function searchUser(user){
    //answer est une reponse au format non compris par JS
    const answer = await fetch(`https://api.github.com/users/${user}`);
    const data =  await answer.json();

    creationCard(data);

}

searchUser("wesbos");




function creationCard(userData){
    console.log(userData);
    const cardHTML = `
    <div class="card">
        <img class="avatar" alt="avatar" src=${userData.avatar_url}/>
        <h2>${userData.name}</h2>
        <ul>
            <li><b>Followers</b> : ${userData.followers}</li>
            <li><b>Repos</b> : ${userData.public_repos}</li>
            <li><b>Bio</b> : ${userData.bio}</li>
        </ul>
    `;

    affichage.innerHTML= cardHTML;
};

form.addEventListener('submit', function(e){
    e.preventDefault();

    if (input.value.length > 0){
        searchUser(input.value);
        input.value ="";
        input.parentNode.classList.remove("active");
    }
})


// si l'user n'existe pas affiche un message disant de chercher qqn qui existe
// ajouter un lien vers le github
// explorer ce qui existe sur l'API.