package restaurant

import (
	"fmt"
	"paac-api/data"
	"paac-api/web"
)

func GetRestaurants() ([]*Restaurant, error) {
	var restaurants []*Restaurant
	for _, dataset := range data.ZonesDatasets {
		response, err := web.FetchRestaurants(dataset)
		if err != nil {
			return nil, fmt.Errorf("error during request: %w", err)
		}
		xmlRestaurants, err := processXMLRestaurants(response)
		if err != nil {
			return nil, fmt.Errorf("error during XML parsing: %w", err)
		}

		for _, restaurant := range xmlRestaurants.Restaurants {
			data := extractData(restaurant.Infos.CDATA, restaurant.Contact.CDATA)
			restaurants = append(restaurants, &Restaurant{
				ID:        restaurant.ID,
				Title:     restaurant.Title,
				Type:      restaurant.Type,
				Opening:   restaurant.Opening,
				Closing:   restaurant.Closing,
				ShortDesc: restaurant.ShortDesc,
				Lat:       restaurant.Lat,
				Lon:       restaurant.Lon,
				Zone:      restaurant.Zone,
				Location:  data.Location,
				Payments:  data.Payments,
				Dataset:   dataset,
			})
		}
	}

	return restaurants, nil
}

func GetRestaurant(dataset string, id string) (*Restaurant, error) {
	response, err := web.FetchRestaurants(dataset)
	if err != nil {
		return nil, fmt.Errorf("error during request: %w", err)
	}
	xmlRestaurants, err := processXMLRestaurants(response)
	if err != nil {
		return nil, fmt.Errorf("error during XML parsing: %w", err)
	}

	for _, restaurant := range xmlRestaurants.Restaurants {
		if restaurant.ID == id {
			data := extractData(restaurant.Infos.CDATA, restaurant.Contact.CDATA)
			return &Restaurant{
				ID:        restaurant.ID,
				Title:     restaurant.Title,
				Type:      restaurant.Type,
				Opening:   restaurant.Opening,
				Closing:   restaurant.Closing,
				ShortDesc: restaurant.ShortDesc,
				Lat:       restaurant.Lat,
				Lon:       restaurant.Lon,
				Zone:      restaurant.Zone,
				Location:  data.Location,
				Payments:  data.Payments,
				Dataset:   dataset,
			}, nil
		}
	}

	return nil, fmt.Errorf("restaurant not found")
}
