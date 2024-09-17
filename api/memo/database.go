package memo

import (
    "database/sql"
    _ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func InitDB() error {
    var err error
    db, err = sql.Open("sqlite3", "./memos.db")
    if err != nil {
        return err
    }

    _, err = db.Exec(`
        CREATE TABLE IF NOT EXISTS memos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            content TEXT
        )
    `)
    return err
}

func CloseDB() {
    db.Close()
}

func GetAllMemos() ([]Memo, error) {
    rows, err := db.Query("SELECT id, title, content FROM memos")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var memos []Memo
    for rows.Next() {
        var memo Memo
        if err := rows.Scan(&memo.ID, &memo.Title, &memo.Content); err != nil {
            return nil, err
        }
        memos = append(memos, memo)
    }
    return memos, nil
}

func CreateMemoInDB(memo Memo) (int, error) {
    result, err := db.Exec("INSERT INTO memos (title, content) VALUES (?, ?)", memo.Title, memo.Content)
    if err != nil {
        return 0, err
    }
    id, err := result.LastInsertId()
    return int(id), err
}

func GetMemoFromDB(id int) (Memo, error) {
    var memo Memo
    err := db.QueryRow("SELECT id, title, content FROM memos WHERE id = ?", id).Scan(&memo.ID, &memo.Title, &memo.Content)
    return memo, err
}

func UpdateMemoInDB(memo Memo) error {
    _, err := db.Exec("UPDATE memos SET title = ?, content = ? WHERE id = ?", memo.Title, memo.Content, memo.ID)
    return err
}

func DeleteMemoFromDB(id int) error {
    _, err := db.Exec("DELETE FROM memos WHERE id = ?", id)
    return err
}