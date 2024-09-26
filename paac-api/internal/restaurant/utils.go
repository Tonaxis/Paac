package restaurant

import (
	"encoding/xml"
	"fmt"
	"regexp"
	"strings"
)

// Function to process XML restaurant data
func processXMLRestaurants(body []byte) (*XMLRestaurants, error) {
	var XMLRestaurants XMLRestaurants
	if err := xml.Unmarshal(body, &XMLRestaurants); err != nil {
		return nil, fmt.Errorf("error during XML parsing: %w", err)
	}
	return &XMLRestaurants, nil
}

// Function to extract data from XML
func extractData(infos string, contact string) Restaurant {
	var restaurant Restaurant

	reLocation := regexp.MustCompile(`<p>(.*?)</p>`)
	locationMatch := reLocation.FindStringSubmatch(contact)
	if len(locationMatch) > 1 {
		restaurant.Location = locationMatch[1]
	}

	rePayments := regexp.MustCompile(`<h2>\s*Paiements possibles\s*</h2>\s*<p>(.*?)</p>`)
	paymentsMatch := rePayments.FindStringSubmatch(infos)
	if len(paymentsMatch) > 1 {
		paymentInfo := paymentsMatch[1]

		paymentInfo = regexp.MustCompile(`<img[^>]*>`).ReplaceAllString(paymentInfo, "")
		paymentInfo = regexp.MustCompile(`<br\s*/?>`).ReplaceAllString(paymentInfo, ", ")
		paymentInfo = regexp.MustCompile(`<[^>]+>`).ReplaceAllString(paymentInfo, "")

		paymentInfo = strings.TrimSpace(paymentInfo)

		restaurant.Payments = strings.Split(paymentInfo, ", ")
	}

	return restaurant
}
