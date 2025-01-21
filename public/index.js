// index.js
const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');

const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        if (Array.isArray(className)) {
            className.forEach(item => {
                $tag.classList.add(item);
            });
        } else {
            $tag.classList.add(className);
        }
    }
    return $tag;
}

function createEmptyPlayerBlock() {
    const el = createElement('div', ['character', 'div11', 'disabled']);
    const img = createElement('img');
    img.src = './assets/players/avatar/11.png';
    el.appendChild(img);
    $parent.appendChild(el);
}

async function init() {
    localStorage.removeItem('player1');
    localStorage.removeItem('player2');

    const players = [
        { id: 1, avatar: 'assets/players/avatar/1.png', gif: 'assets/players/fightingStance/rain.gif', name: 'Rain' },
        { id: 2, avatar: 'assets/players/avatar/2.png', gif: 'assets/players/fightingStance/reptile.gif', name: 'Reptile' },
        { id: 3, avatar: 'assets/players/avatar/3.png', gif: 'assets/players/fightingStance/stryker.gif', name: 'Stryker' },
        { id: 4, avatar: 'assets/players/avatar/4.png', gif: 'assets/players/fightingStance/jax.gif', name: 'Jax' },
        { id: 5, avatar: 'assets/players/avatar/5.png', gif: 'assets/players/fightingStance/nightwolf.gif', name: 'Nightwolf' },
        { id: 6, avatar: 'assets/players/avatar/6.png', gif: 'assets/players/fightingStance/jade.gif', name: 'Jade' },
        { id: 7, avatar: 'assets/players/avatar/7.png', gif: 'assets/players/fightingStance/noobsaibot.gif', name: 'Noob Saibot' },
        { id: 8, avatar: 'assets/players/avatar/8.png', gif: 'assets/players/fightingStance/sonya.gif', name: 'Sonya Blade' },
        { id: 9, avatar: 'assets/players/avatar/9.png', gif: 'assets/players/fightingStance/kano.gif', name: 'Kano' },
        { id: 10, avatar: 'assets/players/avatar/10.png', gif: 'assets/players/fightingStance/mileena.gif', name: 'Mileena' },
        { id: 12, avatar: 'assets/players/avatar/12.png', gif: 'assets/players/fightingStance/shangtsung.gif', name: 'Shang Tsung' },
        { id: 13, avatar: 'assets/players/avatar/13.png', gif: 'assets/players/fightingStance/subzero.gif', name: 'Sub-Zero' },
        { id: 14, avatar: 'assets/players/avatar/14.png', gif: 'assets/players/fightingStance/kunglao.gif', name: 'Kung Lao' },
        { id: 15, avatar: 'assets/players/avatar/15.png', gif: 'assets/players/fightingStance/cyrax.gif', name: 'Cyrax' },
        { id: 16, avatar: 'assets/players/avatar/16.png', gif: 'assets/players/fightingStance/kitana.gif', name: 'Kitana' },
        { id: 17, avatar: 'assets/players/avatar/17.png', gif: 'assets/players/fightingStance/ermac.gif', name: 'Ermac' },
        { id: 18, avatar: 'assets/players/avatar/18.png', gif: 'assets/players/fightingStance/scorpion.gif', name: 'Scorpion' },
        { id: 19, avatar: 'assets/players/avatar/19.png', gif: 'assets/players/fightingStance/sektor.gif', name: 'Sektor' },
        { id: 20, avatar: 'assets/players/avatar/20.png', gif: 'assets/players/fightingStance/kabal.gif', name: 'Kabal' },
        { id: 21, avatar: 'assets/players/avatar/21.png', gif: 'assets/players/fightingStance/sindel.gif', name: 'Sindel' },
        { id: 22, avatar: 'assets/players/avatar/22.png', gif: 'assets/players/fightingStance/smoke.gif', name: 'Smoke' },
        { id: 23, avatar: 'assets/players/avatar/23.png', gif: 'assets/players/fightingStance/liukang.gif', name: 'Liu Kang' },
        { id: 24, avatar: 'assets/players/avatar/24.png', gif: 'assets/players/fightingStance/shaokahn.gif', name: 'Shao-Kahn' },
    ];

    let selectedPlayers = [];

    createEmptyPlayerBlock();
    
    players.forEach(item => {
        const el = createElement('div', ['character', `div${item.id}`]);
        const img = createElement('img');

el.addEventListener('click', () => {
            if (selectedPlayers.length < 2 && !selectedPlayers.includes(item)) {
                selectedPlayers.push(item);
                el.classList.add('active');

                if (selectedPlayers.length === 2) {
                    localStorage.setItem('player1', JSON.stringify(selectedPlayers[0]));
                    localStorage.setItem('player2', JSON.stringify(selectedPlayers[1]));

                    setTimeout(() => {
                        window.location.pathname = 'index1.html'; // Переход на страницу арены
                    }, 1000);
                }
            }
        });

        img.src = item.avatar;
        img.alt = item.name;

        el.appendChild(img);
        $parent.appendChild(el);
    });
}

init();