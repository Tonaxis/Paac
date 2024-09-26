package menu

import (
	"fmt"
	"paac-api/web"
)

// Function to get menu
func GetMenu(dataset string, id string, date string) (*Menu, error) {
	response, err := web.FetchMenus(dataset)
	if err != nil {
		return nil, fmt.Errorf("error during request: %w", err)
	}
	xmlMenus, err := processXMLMenus(response)
	if err != nil {
		return nil, fmt.Errorf("error during XML parsing: %w", err)
	}

	var menu Menu
	for _, restaurant := range xmlMenus.Restaurants {
		if restaurant.ID == id {
			for _, restaurantMenu := range restaurant.Menus {
				if restaurantMenu.Date == date {
					data := extractData(restaurantMenu.CDATA)
					menu = Menu{
						RestaurantID: restaurant.ID,
						Date:         restaurantMenu.Date,
						Moment:       data.Moment,
						Categories:   data.Categories,
					}
					break
				}
			}
			break
		}
	}

	return &menu, nil
}
