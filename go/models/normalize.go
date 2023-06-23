package models

type NormalizeInput struct {
	Data []float64 `json:"data" binding:"required"`
}

func MinMax(array []float64) (float64, float64) {
	if len(array) == 0 {
		return -1, -1
	}

	var min float64 = array[0]
	var max float64 = array[0]
	for _, value := range array {
		if min > value {
			min = value
		}
		if max < value {
			max = value
		}
	}
	return min, max
}
