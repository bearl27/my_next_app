package router

import (
    "github.com/gin-gonic/gin"
    "github.com/bearl27/amida/api/memo"
)

func SetupRouter() *gin.Engine {
    r := gin.Default()

    // CORSミドルウェアの追加
    r.Use(corsMiddleware())

    // メモアプリのルート設定
    r.GET("/memos", memo.GetMemos)
    r.POST("/memos", memo.CreateMemo)
    r.GET("/memos/:id", memo.GetMemo)
    r.PUT("/memos/:id", memo.UpdateMemo)
    r.DELETE("/memos/:id", memo.DeleteMemo)

    return r
}

func corsMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }
        c.Next()
    }
}