package config

import (
	"os"
)

type Config struct {
	Port string
}

func NewConfig() *Config {
	mode := os.Getenv("GIN_MODE")

	if mode == "release" {
		portValue, found := os.LookupEnv("PORT")
		if found {
			return &Config{Port: portValue}
		} else {
			panic("The PORT environment variable is not set in production mode!")
		}
	} else {
		return &Config{Port: "4004"}
	}
}
