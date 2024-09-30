package menu

import (
	"encoding/xml"
	"fmt"
	"regexp"
)

// Function to process XML menus
func processXMLMenus(body []byte) (*XMLMenus, error) {
	var xmlMenus XMLMenus
	if err := xml.Unmarshal(body, &xmlMenus); err != nil {
		return nil, fmt.Errorf("error during XML parsing: %w", err)
	}
	return &xmlMenus, nil
}

// Function to extract dishes from HTML content
func extractData(content string) Menu {
	var menu Menu
	reMoment := regexp.MustCompile(`<h2>(.*?)</h2>`)
	momentMatch := reMoment.FindStringSubmatch(content)
	if len(momentMatch) > 1 {
		menu.Moment = momentMatch[1]
	}

	reCategories := regexp.MustCompile(`<h4>(.*?)</h4>.*?<ul class="liste-plats">(.*?)</ul>`)
	categoryMatches := reCategories.FindAllStringSubmatch(content, -1)

	for _, match := range categoryMatches {
		categoryName := match[1]
		items := regexp.MustCompile(`<li>(.*?)</li>`).FindAllStringSubmatch(match[2], -1)

		var dishes []Dish
		for _, item := range items {
			if len(item) > 1 && item[1] != "" {
				dishes = append(dishes, Dish{Name: item[1]})
			}
		}

		menu.Categories = append(menu.Categories, MenuCategory{Name: categoryName, Dishes: dishes})
	}

	return menu
}
