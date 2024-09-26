package console

import (
	"fmt"
	"strings"
)

func Print(msg string, args ...interface{}) {
	fmt.Printf(replaceColors(msg), args...)
}

func PrintError(msg string, args ...interface{}) {
	fmt.Printf(replaceColors(fmt.Sprintf("<RED>%s<RESET>", msg)), args...)
}

func replaceColors(msg string) string {
	for k, v := range Colors {
		msg = strings.ReplaceAll(msg, k, v)
	}
	return msg
}