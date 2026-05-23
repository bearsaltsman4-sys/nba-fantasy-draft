// NBA All-Time Players Database
const NBA_PLAYERS = [
    // Point Guards
    { id: 1, name: 'Magic Johnson', position: 'PG', era: '1980s-90s' },
    { id: 2, name: 'Michael Jordan', position: 'SG', era: '1980s-90s' },
    { id: 3, name: 'Larry Bird', position: 'SF', era: '1980s-90s' },
    { id: 4, name: 'Kareem Abdul-Jabbar', position: 'C', era: '1970s-80s' },
    { id: 5, name: 'Wilt Chamberlain', position: 'C', era: '1960s-70s' },
    { id: 6, name: 'Bill Russell', position: 'C', era: '1950s-60s' },
    { id: 7, name: 'Shaquille O\'Neal', position: 'C', era: '1990s-2000s' },
    { id: 8, name: 'Kobe Bryant', position: 'SG', era: '2000s-10s' },
    { id: 9, name: 'LeBron James', position: 'SF', era: '2000s-20s' },
    { id: 10, name: 'Tim Duncan', position: 'PF', era: '1990s-2010s' },
    { id: 11, name: 'Stephen Curry', position: 'PG', era: '2010s-20s' },
    { id: 12, name: 'Giannis Antetokounmpo', position: 'PF', era: '2010s-20s' },
    { id: 13, name: 'Dwyane Wade', position: 'SG', era: '2000s-10s' },
    { id: 14, name: 'Kevin Durant', position: 'SF', era: '2000s-20s' },
    { id: 15, name: 'Dirk Nowitzki', position: 'PF', era: '2000s-2010s' },
    { id: 16, name: 'Hakeem Olajuwon', position: 'C', era: '1980s-2000s' },
    { id: 17, name: 'Karl Malone', position: 'PF', era: '1980s-2000s' },
    { id: 18, name: 'John Stockton', position: 'PG', era: '1980s-2000s' },
    { id: 19, name: 'Charles Barkley', position: 'PF', era: '1980s-2000s' },
    { id: 20, name: 'Scottie Pippen', position: 'SF', era: '1980s-2000s' },
    { id: 21, name: 'Dennis Rodman', position: 'PF', era: '1980s-2000s' },
    { id: 22, name: 'Isiah Thomas', position: 'PG', era: '1980s-90s' },
    { id: 23, name: 'Clyde Drexel', position: 'SG', era: '1980s-90s' },
    { id: 24, name: 'Adrian Dantley', position: 'SF', era: '1970s-80s' },
    { id: 25, name: 'Moses Malone', position: 'C', era: '1970s-90s' },
    { id: 26, name: 'Oscar Robertson', position: 'PG', era: '1960s-70s' },
    { id: 27, name: 'Jerry West', position: 'SG', era: '1960s-70s' },
    { id: 28, name: 'Elgin Baylor', position: 'SF', era: '1950s-60s' },
    { id: 29, name: 'Bob Pettit', position: 'PF', era: '1950s-60s' },
    { id: 30, name: 'Wes Unseld', position: 'C', era: '1960s-70s' },
    { id: 31, name: 'Willis Reed', position: 'C', era: '1960s-70s' },
    { id: 32, name: 'Walt Frazier', position: 'PG', era: '1960s-70s' },
    { id: 33, name: 'Julius Erving', position: 'SF', era: '1970s-80s' },
    { id: 34, name: 'Pete Maravich', position: 'PG', era: '1970s-80s' },
    { id: 35, name: 'Bob McAdoo', position: 'PF', era: '1970s-80s' },
    { id: 36, name: 'George Gervin', position: 'SG', era: '1970s-80s' },
    { id: 37, name: 'Rick Barry', position: 'SF', era: '1960s-70s' },
    { id: 38, name: 'Ray Allen', position: 'SG', era: '1990s-2010s' },
    { id: 39, name: 'Reggie Miller', position: 'SG', era: '1990s-2000s' },
    { id: 40, name: 'Gary Payton', position: 'PG', era: '1990s-2000s' },
    { id: 41, name: 'Allen Iverson', position: 'PG', era: '1990s-2000s' },
    { id: 42, name: 'Vince Carter', position: 'SG', era: '1990s-2010s' },
    { id: 43, name: 'Tracy McGrady', position: 'SF', era: '1990s-2000s' },
    { id: 44, name: 'Dominique Wilkins', position: 'SF', era: '1980s-90s' },
    { id: 45, name: 'Jamal Murray', position: 'PG', era: '2010s-20s' },
    { id: 46, name: 'Nikola Jokic', position: 'C', era: '2010s-20s' },
    { id: 47, name: 'Luka Doncic', position: 'PG', era: '2010s-20s' },
    { id: 48, name: 'Jayson Tatum', position: 'SF', era: '2010s-20s' },
    { id: 49, name: 'Damian Lillard', position: 'PG', era: '2010s-20s' },
    { id: 50, name: 'Chris Paul', position: 'PG', era: '2000s-10s' },
];

function searchPlayers(query) {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return NBA_PLAYERS.filter(player =>
        player.name.toLowerCase().includes(lowerQuery) ||
        player.position.toLowerCase().includes(lowerQuery)
    );
}

function getPlayerById(id) {
    return NBA_PLAYERS.find(player => player.id === id);
}