package main

import (
    "log"

    "github.com/bearl27/amida/api/chat"
    "github.com/bearl27/amida/api/memo"
    "github.com/bearl27/amida/api/router"
    "github.com/gin-gonic/gin"
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
    r.GET("/ws", func(c *gin.Context) {
        chat.HandleConnections(c.Writer, c.Request)
    })
    go chat.HandleMessages()

    // HTTPサーバーの起動
    log.Println("Server starting on :8080")
    err := r.Run(":8080")
    if err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
}