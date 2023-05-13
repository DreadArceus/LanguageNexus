package routes

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestPingRoutes(t *testing.T) {
	gin.SetMode("test")
	router := gin.Default()

	PingRoutes(router)

	t.Run("GET /ping should return pong", func(t *testing.T) {
		req, err := http.NewRequest(http.MethodGet, "/ping", nil)
		assert.NoError(t, err)

		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
		assert.Equal(t, `{"result":"pong"}`, w.Body.String())
	})
}
