package main

import (
	"log"

	"github.com/DreadArceus/LanguageNexus/go/config"
	"github.com/DreadArceus/LanguageNexus/go/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.NewConfig()

	router := gin.Default()

	routes.PingRoutes(router)
	routes.NormalizeRoutes(router)

	err := router.Run("localhost:" + cfg.Port)
	if err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
