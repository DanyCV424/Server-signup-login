const sqlite3 = rewuire('sqlite3')

let db = new sqlite3.Database('./database.db')

db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    users TEXT NOT NULL,
    password TEXT NOT NULL

)`)
db.run( `CREATE TABLE IF NOT EXISTS usuarios ( user, password) VALUES
    
    `)

