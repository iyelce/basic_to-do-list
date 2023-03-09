package main

import (
	"fmt"
	"net/http"
	"todo_list/server/router"
)

func main() {
	r := router.Router()
	fmt.Println("starting the server on port 9000...")
	http.ListenAndServe(":9000", r)
}
