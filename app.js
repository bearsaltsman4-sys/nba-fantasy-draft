// NBA Fantasy Draft Application

class DraftLobby {
    constructor(lobbyCode, playerName) {
        this.lobbyCode = lobbyCode;
        this.players = [{ name: playerName, team: [], score: 0 }];
        this.currentTurnIndex = 0;
        this.round = 1;
        this.draftLog = [];
        this.maxRounds = 15;
    }

    addPlayer(name) {
        this.players.push({ name, team: [], score: 0 });
    }

    draftPlayer(playerId) {
        if (this.round > this.maxRounds) {
            alert('Draft complete!');
            return false;
        }

        const player = getPlayerById(playerId);
        if (!player) return false;

        const currentPlayer = this.players[this.currentTurnIndex];
        const alreadyDrafted = this.players.some(p => p.team.some(t => t.id === playerId));

        if (alreadyDrafted) {
            alert('Player already drafted!');
            return false;
        }

        currentPlayer.team.push(player);
        this.draftLog.push({
            round: this.round,
            pick: this.getPickNumber(),
            player: player.name,
            team: currentPlayer.name,
            position: player.position
        });

        this.nextTurn();
        return true;
    }

    nextTurn() {
        this.currentTurnIndex++;

        if (this.currentTurnIndex >= this.players.length) {
            this.currentTurnIndex = 0;
            this.round++;
        }
    }

    getPickNumber() {
        return ((this.round - 1) * this.players.length) + this.currentTurnIndex + 1;
    }

    getCurrentPlayer() {
        return this.players[this.currentTurnIndex];
    }

    getPlayerTeam(index) {
        return this.players[index]?.team || [];
    }
}

// Global state
let currentLobby = null;
let currentPlayerIndex = null;

// DOM Elements
const playerNameInput = document.getElementById('playerName');
const createLobbyBtn = document.getElementById('createLobbyBtn');
const joinLobbyBtn = document.getElementById('joinLobbyBtn');
const confirmJoinBtn = document.getElementById('confirmJoinBtn');
const joinLobbyForm = document.getElementById('joinLobbyForm');
const lobbyCodeInput = document.getElementById('lobbyCode');
const playerSearchInput = document.getElementById('playerSearch');
const searchResults = document.getElementById('searchResults');

// Event Listeners
createLobbyBtn.addEventListener('click', createLobby);
joinLobbyBtn.addEventListener('click', toggleJoinForm);
confirmJoinBtn.addEventListener('click', joinLobby);
playerSearchInput.addEventListener('input', handlePlayerSearch);

function generateLobbyCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function createLobby() {
    const playerName = playerNameInput.value.trim();
    if (!playerName) {
        alert('Please enter your name');
        return;
    }

    const lobbyCode = generateLobbyCode();
    currentLobby = new DraftLobby(lobbyCode, playerName);
    currentPlayerIndex = 0;

    showDraftSection(lobbyCode);
}

function toggleJoinForm() {
    joinLobbyForm.classList.toggle('hidden');
}

function joinLobby() {
    const playerName = playerNameInput.value.trim();
    const lobbyCode = lobbyCodeInput.value.trim().toUpperCase();

    if (!playerName || !lobbyCode) {
        alert('Please enter your name and lobby code');
        return;
    }

    // Simulate joining (in real app, would connect to server)
    if (lobbyCode.length === 6) {
        currentLobby = new DraftLobby(lobbyCode, playerName);
        currentLobby.addPlayer('Player 2');
        currentLobby.addPlayer('Player 3');
        currentPlayerIndex = 1; // Joined as second player

        showDraftSection(lobbyCode);
    } else {
        alert('Invalid lobby code');
    }
}

function showDraftSection(lobbyCode) {
    document.getElementById('lobby-section').classList.add('hidden');
    document.getElementById('draft-section').classList.remove('hidden');
    document.getElementById('displayLobbyCode').textContent = lobbyCode;
    updateDraftUI();
}

function updateDraftUI() {
    // Update round
    document.querySelector('#draftRound span').textContent = currentLobby.round;

    // Update current player
    const currentPlayer = currentLobby.getCurrentPlayer();
    document.getElementById('currentPlayer').textContent = currentPlayer.name;

    // Update players list
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';
    currentLobby.players.forEach((player, index) => {
        const li = document.createElement('li');
        li.textContent = `${player.name} (${player.team.length} picks)`;
        if (index === currentLobby.currentTurnIndex) {
            li.classList.add('active');
        }
        playersList.appendChild(li);
    });

    // Update my team
    const myTeamList = document.getElementById('myTeam');
    const myTeam = currentLobby.getPlayerTeam(currentPlayerIndex);
    myTeamList.innerHTML = '';
    myTeam.forEach(player => {
        const li = document.createElement('li');
        li.innerHTML = `<div class="player-name">${player.name}</div><div class="player-position">${player.position}</div>`;
        myTeamList.appendChild(li);
    });

    // Update draft log
    const draftLogList = document.getElementById('draftLog');
    draftLogList.innerHTML = '';
    currentLobby.draftLog.slice(-10).reverse().forEach(log => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="log-round">R${log.round}</span>
            <span class="log-player">${log.player}</span>
            <span class="log-position">${log.position}</span>
            <span class="log-team" style="font-size: 0.85em;"> → ${log.team}</span>
        `;
        draftLogList.appendChild(li);
    });
}

function handlePlayerSearch(e) {
    const query = e.target.value;
    searchResults.innerHTML = '';

    if (!query.trim()) return;

    const results = searchPlayers(query);
    results.forEach(player => {
        const div = document.createElement('div');
        div.className = 'search-result-item';
        div.innerHTML = `
            <div class="player-name">${player.name}</div>
            <div class="player-info">${player.position} • ${player.era}</div>
        `;
        div.addEventListener('click', () => selectPlayer(player.id));
        searchResults.appendChild(div);
    });
}

function selectPlayer(playerId) {
    if (currentLobby.currentTurnIndex !== currentPlayerIndex) {
        alert('Not your turn!');
        return;
    }

    if (currentLobby.draftPlayer(playerId)) {
        playerSearchInput.value = '';
        searchResults.innerHTML = '';
        updateDraftUI();
    }
}

// Initialize
window.addEventListener('load', () => {
    console.log('NBA Fantasy Draft loaded');
});