package menu

import (
	"fmt"
	"paac-api/web"
)

// Function to get menu
func GetMenu(dataset string, id string, date string, moment string) (*Menu, error) {
	response, err := web.FetchMenus(dataset)
	if err != nil {
		return nil, fmt.Errorf("error during request: %w", err)
	}
	xmlMenus, err := processXMLMenus(response)
	if err != nil {
		return nil, fmt.Errorf("error during XML parsing: %w", err)
	}

	checkedMoment := moment
	if checkedMoment != "matin" && checkedMoment != "midi" && checkedMoment != "soir" {
		checkedMoment = ""
	}

	var menu Menu
	var menus []Menu
	var moments []string
	for _, restaurant := range xmlMenus.Restaurants {
		if restaurant.ID == id {
			for _, restaurantMenu := range restaurant.Menus {
				if restaurantMenu.Date == date {
					data := extractData(restaurantMenu.CDATA)
					menus = append(menus, Menu{
						RestaurantID: restaurant.ID,
						Date:         restaurantMenu.Date,
						Moment:       data.Moment,
						Categories:   data.Categories,
					})
				}
			}
		}
	}

	for _, menuAtDate := range menus {
		moments = append(moments, menuAtDate.Moment)
		if checkedMoment == "" || menuAtDate.Moment == checkedMoment {
			menu = menuAtDate
		}
	}

	if menu.RestaurantID != "" {
		menu.AvailablesMoments = moments
	}

	return &menu, nil
}
