package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

var port = 8080

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		data := getData()

		w.Write(data)
	}).Methods("GET")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"*"},
	})

	handler := c.Handler(router)

	fmt.Printf("Serveur en cours d'exécution sur localhost:%v\n", port)
	http.ListenAndServe(fmt.Sprintf(":%v", port), handler)
}

func getData() []byte {
	// Définir l'URL de la requête
	url := "https://www.crous-nantes.fr/restaurant/resto-u-la-chantrerie/"

	// Faire la requête GET
	resp, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	// S'assurer de fermer le body une fois terminé
	defer resp.Body.Close()

	// Lire la réponse
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	// Afficher le corps de la réponse
	return body
}
