package config

import (
	"os"
)

var (
	Port string
)

func init() {
	mode := os.Getenv("GIN_MODE")

	if mode == "release" {
		portValue, found := os.LookupEnv("PORT")
		if found {
			Port = portValue
		} else {
			panic("The PORT environment variable is not set in production mode!")
		}
	} else {
		Port = "4004"
	}
}
