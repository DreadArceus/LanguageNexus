package routes

import (
	"net/http"

	"github.com/DreadArceus/LanguageNexus/go/models"
	"github.com/gin-gonic/gin"
)

func NormalizeRoutes(router *gin.Engine) {
	router.POST("/normalize", func(c *gin.Context) {
		var input models.NormalizeInput

		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"error": "Input must be an array of numbers."})
			return
		}

		min, max := models.MinMax(input.Data)
		if max == min {
			c.JSON(http.StatusOK, gin.H{"normalizedData": make([]float64, len(input.Data))})
			return
		}

		normalizedData := make([]float64, len(input.Data))
		for i, v := range input.Data {
			normalizedData[i] = (v - min) / (max - min)
		}

		c.JSON(http.StatusOK, gin.H{"normalizedData": normalizedData})
	})
}
