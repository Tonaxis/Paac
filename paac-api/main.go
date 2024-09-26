package main

import (
	"flag"
	"paac-api/server"
)

func main() {
	port := flag.Int("port", 8080, "Listening port")
	flag.Parse()
	server.Run(port)
}
