package restaurant

// Struct to represent restaurant information
type Restaurant struct {
	ID        string   `json:"id"`
	Title     string   `json:"title"`
	Type      string   `json:"type"`
	Opening   string   `json:"opening"`
	Closing   string   `json:"closing"`
	ShortDesc string   `json:"short_desc"`
	Lat       string   `json:"lat"`
	Lon       string   `json:"lon"`
	Zone      string   `json:"zone"`
	Location  string   `json:"location"`
	Payments  []string `json:"payments"`
	Dataset   string   `json:"dataset"`
}

// Struct to represent XML restaurant data (used for parsing)
type XMLRestaurants struct {
	Restaurants []struct {
		ID        string `xml:"id,attr"`
		Title     string `xml:"title,attr"`
		Type      string `xml:"type,attr"`
		Opening   string `xml:"opening,attr"`
		Closing   string `xml:"closing,attr"`
		ShortDesc string `xml:"short_desc,attr"`
		Lat       string `xml:"lat,attr"`
		Lon       string `xml:"lon,attr"`
		Zone      string `xml:"zone,attr"`
		Infos     struct {
			CDATA string `xml:",innerxml"`
		} `xml:"infos"`
		Contact struct {
			CDATA string `xml:",innerxml"`
		} `xml:"contact"`
	} `xml:"resto"`
}
