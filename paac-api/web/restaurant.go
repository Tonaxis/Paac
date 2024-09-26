package web

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func FetchRestaurants(zone string) ([]byte, error) {
	client := &http.Client{}
	url := fmt.Sprintf("http://webservices-v2.crous-mobile.fr:8080/feed/%s/externe/resto.xml", zone)
	resp, err := client.Get(url)
	if err != nil {
		return nil, fmt.Errorf("error during request: %w", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error during body reading: %w", err)
	}

	return body, nil
}
