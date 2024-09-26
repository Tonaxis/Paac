package router

import (
	"fmt"
	"paac-api/handlers/ressources"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func Setup(port *int) {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:  "*",
		AllowMethods:  "GET, POST, PUT, DELETE",
		AllowHeaders:  "Origin, Content-Type, Accept, Authorization, customheader",
		ExposeHeaders: "Authorization",
		// AllowCredentials: true,
		MaxAge: 86400,
	}))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	app.Get("/menus/:dataset/:id", ressources.GetMenu)

	app.Get("/restaurants", ressources.GetRestaurants)
	app.Get("/restaurants/:dataset/:id", ressources.GetRestaurant)

	app.Listen(fmt.Sprintf(":%v", *port))
}
