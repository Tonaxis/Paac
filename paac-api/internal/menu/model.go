package menu

// Struct to represent a dish
type Dish struct {
	Name string `json:"name"`
}

// Struct to represent a menu category
type MenuCategory struct {
	Name   string `json:"name"`
	Dishes []Dish `json:"dishes"`
}

// Struct to represent menu information
type Menu struct {
	RestaurantID string         `json:"restaurant_id"`
	Date         string         `json:"date"`
	Moment       string         `json:"moment"`
	Categories   []MenuCategory `json:"categories"`
}

// Struct to represent XML menu data (used for parsing)
type XMLMenus struct {
	Restaurants []struct {
		ID    string `xml:"id,attr"`
		Menus []struct {
			Date  string `xml:"date,attr"`
			CDATA string `xml:",innerxml"`
		} `xml:"menu"`
	} `xml:"resto"`
}
