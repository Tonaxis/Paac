package ressources

import (
	"net/http"

	"paac-api/data"
	restaurantRes "paac-api/internal/restaurant"
	"paac-api/utils"

	"github.com/gofiber/fiber/v2"
)

func GetRestaurants(c *fiber.Ctx) error {
	restaurants, err := restaurantRes.GetRestaurants()
	if err != nil {
		return utils.Response(c, http.StatusInternalServerError, err.Error(), fiber.Map{
			"message": "Internal server error",
		})
	}

	return utils.Response(c, http.StatusOK, "", restaurants)
}

func GetRestaurant(c *fiber.Ctx) error {
	dataset := c.Params("dataset")
	id := c.Params("id")

	if !utils.Contains(data.ZonesDatasets, dataset) {
		return utils.Response(c, http.StatusBadRequest, "Invalid dataset", fiber.Map{
			"message": "Invalid dataset",
		})
	}

	restaurant, err := restaurantRes.GetRestaurant(dataset, id)
	if err != nil {
		return utils.Response(c, http.StatusInternalServerError, err.Error(), fiber.Map{
			"message": "Internal server error",
		})
	}

	if restaurant.ID == "" {
		return utils.Response(c, http.StatusNotFound, "Restaurant not found", fiber.Map{
			"message": "Restaurant not found",
		})
	}

	return utils.Response(c, http.StatusOK, "", restaurant)
}
