package main

import (
    "log"
    "net/http"

    "github.com/bearl27/amida/api/chat"
    "github.com/bearl27/amida/api/memo"
    "github.com/bearl27/amida/api/router"
)

func main() {
    // メモアプリのデータベース初期化
    if err := memo.InitDB(); err != nil {
        log.Fatal(err)
    }
    defer memo.CloseDB()

    // ルーターの設定
    r := router.SetupRouter()

    // WebSocketハンドラーの設定
    http.HandleFunc("/ws", chat.HandleConnections)
    go chat.HandleMessages()

    // HTTPサーバーの起動
    log.Println("Server starting on :8080")
    err := http.ListenAndServe(":8080", r)
    if err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
}