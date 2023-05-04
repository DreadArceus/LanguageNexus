package main

import (
	"github.com/DreadArceus/LanguageNexus/go/config"
	"github.com/DreadArceus/LanguageNexus/go/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	routes.PingRoutes(router)

	router.Run("localhost:" + config.Port)
}
