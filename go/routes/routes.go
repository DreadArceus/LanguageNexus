package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func PingRoutes(router *gin.Engine) {
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"result": "pong",
		})
	})
}
