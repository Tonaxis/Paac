package server

import (
	"paac-api/router"
)

func Run(port *int) {
	router.Setup(port)
}
