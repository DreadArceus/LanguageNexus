package routes

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestNormalizeRoutes(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := gin.Default()

	NormalizeRoutes(router)

	t.Run("POST /normalize should normalize valid data", func(t *testing.T) {
		validData := []string{
			`{"data": [10, 20, 30, 40, 50]}`,
			`{"data": [10.5, 20.5, 30.5, 40.5, 50.5]}`,
		}
		for _, data := range validData {
			req, err := http.NewRequest(http.MethodPost, "/normalize", strings.NewReader(data))
			assert.NoError(t, err)

			w := httptest.NewRecorder()
			router.ServeHTTP(w, req)

			assert.Equal(t, http.StatusOK, w.Code)
			assert.JSONEq(t, `{"normalizedData": [0, 0.25, 0.5, 0.75, 1]}`, w.Body.String())
		}
	})

	t.Run("POST /normalize should not break for an array with one unique element", func(t *testing.T) {
		data := `{"data": [7, 7, 7]}`
		req, err := http.NewRequest(http.MethodPost, "/normalize", strings.NewReader(data))
		assert.NoError(t, err)

		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
		assert.JSONEq(t, `{"normalizedData": [0, 0, 0]}`, w.Body.String())
	})

	t.Run("POST /normalize should not break for an empty array", func(t *testing.T) {
		data := `{"data": []}`
		req, err := http.NewRequest(http.MethodPost, "/normalize", strings.NewReader(data))
		assert.NoError(t, err)

		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
		assert.JSONEq(t, `{"normalizedData": []}`, w.Body.String())
	})

	t.Run("POST /normalize should return an error for invalid data", func(t *testing.T) {
		invalidData := []string{
			`{"data": [10, 20, "30", 40, 50]}`,
			`"yeah"`,
		}
		for _, data := range invalidData {
			req, err := http.NewRequest(http.MethodPost, "/normalize", strings.NewReader(data))
			assert.NoError(t, err)

			w := httptest.NewRecorder()
			router.ServeHTTP(w, req)

			assert.Equal(t, http.StatusUnprocessableEntity, w.Code)
			assert.JSONEq(t, `{"error": "Input must be an array of numbers."}`, w.Body.String())
		}
	})
}
