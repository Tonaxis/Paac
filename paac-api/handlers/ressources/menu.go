package ressources

import (
	"net/http"

	menuRes "paac-api/internal/menu"
	"paac-api/utils"

	"github.com/gofiber/fiber/v2"
)

func GetMenu(c *fiber.Ctx) error {
	dataset := c.Params("dataset")
	id := c.Params("id")
	date := c.Query("date", "")
	moment := c.Query("moment", "")

	menu, err := menuRes.GetMenu(dataset, id, date, moment)
	if err != nil {
		return utils.Response(c, http.StatusInternalServerError, err.Error(), fiber.Map{
			"message": "Internal server error",
		})
	}

	if menu.RestaurantID == "" {
		return utils.Response(c, http.StatusNotFound, "Menu not found", fiber.Map{
			"message": "Menu not found",
		})
	}

	return utils.Response(c, http.StatusOK, "", menu)
}
