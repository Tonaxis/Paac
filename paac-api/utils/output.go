package utils

import (
	"fmt"
	"paac-api/console"

	"github.com/gofiber/fiber/v2"
)

func Response(c *fiber.Ctx, code int, err string, data interface{}) error {
	statusColor := "<BGLIGHTGRAY>"
	if code >= 200 && code < 300 {
		statusColor = "<BGGREEN>"
	} else if code >= 300 && code < 400 {
		statusColor = "<BGBLUE>"
	} else if code >= 400 && code < 500 {
		statusColor = "<BGLIGHTRED>"
	} else if code >= 500 && code < 600 {
		statusColor = "<BGRED>"
	}

	message := fmt.Sprintf("%s<BOLD> %v <RESET> <BOLD>%s<RESET> <LIGHTBLUE>%s<RESET> (%s)\n", statusColor, code, c.Method(), c.OriginalURL(), c.IP())
	if err != "" {
		message = fmt.Sprintf("%s<BOLD> %v <RESET> <BOLD>%s<RESET> <LIGHTBLUE>%s<RESET> (%s)\n<RED>%s<RESET>\n", statusColor, code, c.Method(), c.OriginalURL(), c.IP(), err)
	}
	console.Print(message)

	return c.Status(code).JSON(data)
}
