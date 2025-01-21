const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Middleware для обработки JSON
app.use(express.json());

// Логирование запросов
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Отдача статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Обработчик для корневого URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Получение списка игроков
app.get('/api/players', (req, res) => {
    fs.readFile('players.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка чтения файла' });
        }
        res.json(JSON.parse(data));
    });
});

// Получение случайного игрока
app.get('/api/player', (req, res) => {
    fs.readFile('players.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка чтения файла' });
        }
        const players = JSON.parse(data);
        if (!players || players.length === 0) {
            return res.status(404).json({ error: 'Нет доступных игроков' });
        }
        const randomPlayer = players[Math.floor(Math.random() * players.length)];
        res.json(randomPlayer);
    });
});

// Бой игроков
app.post('/api/player/fight', (req, res) => {
    const { hit, defence } = req.body;
    if (!hit || !defence) {
        return res.status(400).json({ error: 'Необходимы параметры hit и defence' });
    }
    const player1 = { value: Math.floor(Math.random() * 30), hit, defence };
    const player2 = { 
        value: Math.floor(Math.random() * 30), 
        hit: ['head', 'body', 'foot'][Math.floor(Math.random() * 3)], 
        defence: ['head', 'body', 'foot'][Math.floor(Math.random() * 3)] 
    };
    res.json({ player1, player2 });
});

// Получение конкретного игрока по ID
app.get('/api/player/:id', (req, res) => {
    const { id } = req.params;
    fs.readFile('players.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка чтения файла' });
        }
        const players = JSON.parse(data);
        const player = players.find(p => p.id === parseInt(id));
        if (!player) {
            return res.status(404).json({ error: 'Игрок не найден' });
        }
        res.json(player);
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});