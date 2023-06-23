package models

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestMinMax(t *testing.T) {
	t.Run("should return the minimum and maximum of an array", func(t *testing.T) {
		array := []float64{5, 10, -3, 7, 12, -1}
		min, max := MinMax(array)
		assert.Equal(t, -3.0, min)
		assert.Equal(t, 12.0, max)
	})

	t.Run("should return -1, -1 for an empty array", func(t *testing.T) {
		array := []float64{}
		min, max := MinMax(array)
		assert.Equal(t, -1.0, min)
		assert.Equal(t, -1.0, max)
	})

	t.Run("should return the same value for min and max if all elements are the same", func(t *testing.T) {
		array := []float64{7, 7, 7, 7, 7}
		min, max := MinMax(array)
		assert.Equal(t, 7.0, min)
		assert.Equal(t, 7.0, max)
	})
}
