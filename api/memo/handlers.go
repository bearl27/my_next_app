package memo

import (
    "net/http"
    "strconv"

    "github.com/gin-gonic/gin"
)

func GetMemos(c *gin.Context) {
    memos, err := GetAllMemos()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, memos)
}

func CreateMemo(c *gin.Context) {
    var memo Memo
    if err := c.BindJSON(&memo); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    id, err := CreateMemoInDB(memo)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    memo.ID = id
    c.JSON(http.StatusCreated, memo)
}

func GetMemo(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    memo, err := GetMemoFromDB(id)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Memo not found"})
        return
    }
    c.JSON(http.StatusOK, memo)
}

func UpdateMemo(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    var memo Memo
    if err := c.BindJSON(&memo); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    memo.ID = id
    if err := UpdateMemoInDB(memo); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, memo)
}

func DeleteMemo(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    if err := DeleteMemoFromDB(id); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Memo deleted successfully"})
}