// utils.js
import { generateLogs } from '../class/logs.js'; // Добавьте этот импорт
export const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

export const ATTACK = ['head', 'body', 'foot']
export function getRandom(num) {
    return Math.ceil(Math.random() * num);
}

export function createReloadButton($arenas) {
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Reload';

    $reloadButton.addEventListener('click', function() {
        window.location.pathname = 'index.html'; // Переход на страницу выбора персонажей
    });

    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv);
}

export function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    };
}

export function playerAttack($formFight) {
    const attack = {};
    const formElements = $formFight.elements; // Получаем элементы формы

    for (let item of formElements) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false; // Сбрасываем состояние чекбоксов
    }
    return attack;
}

export function playerLose(name) {
    const $playerLose = createElement('div', 'showResult');
    if (name) {
        $playerLose.innerText = name + ' wins';
    } else {
        $playerLose.innerText = 'draw';
    }

    return $playerLose;
}


export function showResult(player1, player2, $randomButton, $arenas, $chat) {
    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton($arenas);
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerLose(player2.name));
        generateLogs('end', player2, player1, null, $chat); // Передаем $chat
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerLose(player1.name));
        generateLogs('end', player1, player2, null, $chat); // Передаем $chat
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerLose());
        generateLogs('draw', null, null, null, $chat); // Передаем $chat
    }
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}