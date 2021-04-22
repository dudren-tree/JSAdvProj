window.addEventListener('DOMContentLoaded',init);
const requestUrl = 'https://swapi.dev/api/people/';

function init () {
    class Person {
        constructor(name, gender, year, planet, films, species){
            this.name = name;
            this.gender = gender;
            this.year = year;
            this.planet = planet;
            this.films = films;
            this.species = species;
        }
    }

    sendRequest('GET', requestUrl)
        .then(data => fillNameBtn(data.results))
        .catch(err => console.log(err))
    let charWind = document.querySelector('.character-window');
    let tableInfo = document.querySelectorAll('#main-table>tr');
    let nameBtn = document.querySelectorAll('.character-name');
    let showHeroMenu = document.querySelector('#show-character');
    let closeBtnAtMenu = document.querySelector('.close-btn');
    let photoOfHero = document.querySelector('.photo>img');
    let nextButt = document.querySelector('.arrow-1-right');
    let privButt = document.querySelector('.arrow-1-left');

    privButt.style.display = 'none'
    closeBtnAtMenu.addEventListener('click', hideHeroMenu);
    nextButt.addEventListener('click', nextCharacterPage);
    privButt.addEventListener('click', showPrivButt);

    function showPrivButt() {
        if(nameBtn[4].innerHTML === 'Obi-Wan Kenobi') {
            sendRequest('GET', requestUrl)
                .then(data => fillNameBtn(data.results))
                .catch(err => console.log(err))
            nextButt.style.display = 'block'
            privButt.style.display = 'none'
        }
    }

    function nextCharacterPage() {
        if(nameBtn[4].innerHTML === 'Leia Organa') {
            for(let i = 4; i < nameBtn.length; i += 1) {
                sendRequest('GET', requestUrl)
                .then(data => fillNameBtn(data.results))
                .catch(err => console.log(err))
            }
            nextButt.style.display = 'none'
            privButt.style.display = 'block'
        }
    }

    function fillNameBtn(data) {
        let cnt = 4;
        if(nameBtn[4].innerHTML === 'Leia Organa'){
            for (let i = 0; i < nameBtn.length; i += 1) {
                nameBtn[i].innerHTML = data[i + 5].name
                nameBtn[i].addEventListener('click', showCharacterMenu);
            }
        }else {
            for (let i = 0; i < nameBtn.length; i += 1) {
                nameBtn[i].innerHTML = data[i].name
                nameBtn[i].addEventListener('click', showCharacterMenu);
            }
        }
        return dataObj = data;
    }

    function nameForPlanet(data) {
        tableInfo[3].children[1].innerText = data.name;
    }

    function nameForSpicies (data) {
        tableInfo[5].children[1].innerText = data.name;
    }

    function nameForBlank (data) {
        tableInfo[4].children[1].innerHTML += data.title + '</br>';
    }

    function fillTableInfo (data, event) {
        let arr = [];
        
        data.forEach(element => {
            arr.push(new Person(element.name, element.gender, element.birth_year, element.homeworld, element.films, element.species));
                    
        });
        
        if(nameBtn[0].innerHTML === 'Owen Lars'){
            for (let i = 5; i < tableInfo.length * 2 - 2; i += 1) {
                let value = Object.values(arr[i]);
                let key = Object.keys(arr[i])

                sendRequest('GET', value[3])
                    .then(data => nameForPlanet(data))

                if(event.target.innerText === value[0]) {
                    for(let k = 0; k < tableInfo.length; k += 1 ){
                        tableInfo[k].children[1].innerHTML = value[k];
                        if(value[k][0] !== undefined) {
                            sendRequest('GET', value[5][0])
                                .then(data => nameForSpicies(data))
                        } else if (value[k][0] === undefined){
                            tableInfo[5].children[1].innerText = 'Human';
                        }
                    }
                }       
            }
            let stringFilms = tableInfo[4].children[1].innerHTML.split(',');
            tableInfo[4].children[1].innerHTML = '';
            for(let i = 0; i < stringFilms.length; i += 1) {

                sendRequest('GET' ,stringFilms[i])
                    .then(data => nameForBlank(data))
                    .catch(error => console.log(error))

            }
            
            
        } else {
            for (let i = 0; i < tableInfo.length; i += 1) {
                let value = Object.values(arr[i]);
                    
                sendRequest('GET', value[3])
                    .then(data => nameForPlanet(data))

                let key = Object.keys(arr[i])
                if(event.target.innerText === value[0]) {
                    for(let k = 0; k < tableInfo.length; k += 1 ){
                        tableInfo[k].children[1].innerHTML = value[k];
                        if(value[k][0] !== undefined) {
                            sendRequest('GET', value[5][0])
                                .then(data => nameForSpicies(data))
                        } else if (value[k][0] === undefined){
                            tableInfo[5].children[1].innerText = 'Human';
                        }
                    }
                }
            }

            let stringFilms = tableInfo[4].children[1].innerHTML.split(',');
            tableInfo[4].children[1].innerHTML = '';
            for(let i = 0; i < stringFilms.length; i += 1) {

                sendRequest('GET' ,stringFilms[i])
                    .then(data => nameForBlank(data))
                    .catch(error => console.log(error))

            }
        }    
           
    }

    function showCharacterMenu (e) {
        charWind.classList.toggle('show');
        charWind.classList.toggle('hidden');
        // showHeroMenu.style.display = 'flex';
        showHeroMenu.style.transform = 'translateY(0%)'
        photoOfHero.src = `./img/characters/${e.target.innerText.toLowerCase()}.png`;
        fillTableInfo(dataObj, e);
    }

    function hideHeroMenu () {
        charWind.classList.toggle('show');
        charWind.classList.toggle('hidden');
        showHeroMenu.style.transform = 'translateY(-100%)'
        // showHeroMenu.style.display = 'none';
        photoOfHero.src = ' ';
    }

    function sendRequest (method ,url) {
        return new Promise ((resolve, reject) => {
            const xhr = new XMLHttpRequest();
    
            xhr.open(method, url);
    
            xhr.responseType = 'json'
    
            xhr.onload = () => {
                if(xhr.status >= 400) {
                    reject(xhr.response)
                } else {
                    resolve(xhr.response)
                }      
            }
    
            xhr.onerror = () => {
                reject(xhr.response)
                }
    
            xhr.send()
        })
    }
}