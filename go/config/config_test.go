package config

import (
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestConfig(t *testing.T) {
	t.Run("NewConfig should return a Config with Port set to 4004 when GIN_MODE is not release", func(t *testing.T) {
		oldGinMode := os.Getenv("GIN_MODE")
		oldPort := os.Getenv("PORT")
		defer func() {
			os.Setenv("GIN_MODE", oldGinMode)
			os.Setenv("PORT", oldPort)
		}()

		os.Setenv("GIN_MODE", "debug")
		os.Setenv("PORT", "5000")

		config := NewConfig()

		assert.Equal(t, "4004", config.Port)
	})

	t.Run("NewConfig should return a Config with Port set to the PORT environment variable when GIN_MODE is release", func(t *testing.T) {
		oldGinMode := os.Getenv("GIN_MODE")
		oldPort := os.Getenv("PORT")
		defer func() {
			os.Setenv("GIN_MODE", oldGinMode)
			os.Setenv("PORT", oldPort)
		}()

		os.Setenv("GIN_MODE", "release")
		os.Setenv("PORT", "5000")

		config := NewConfig()

		assert.Equal(t, "5000", config.Port)
	})
}
