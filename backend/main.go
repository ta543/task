package main

import (
	"log"

	"github.com/gin-gonic/gin"

	"github.com/example/webcrawler/handlers"
	"github.com/example/webcrawler/models"
)

func main() {
	dsn := "user:password@tcp(localhost:3306)/webcrawler?parseTime=true"
	if err := models.InitDB(dsn); err != nil {
		log.Fatalf("failed to connect db: %v", err)
	}

	r := gin.Default()
	r.Use(handlers.AuthMiddleware())

	r.POST("/api/urls", handlers.AddURL)
	r.GET("/api/urls", handlers.ListURLs)
	r.GET("/api/urls/:id", handlers.GetURL)
	r.DELETE("/api/urls/:id", handlers.DeleteURL)
	r.POST("/api/urls/:id/restart", handlers.RestartURL)

	if err := r.Run(":8080"); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
