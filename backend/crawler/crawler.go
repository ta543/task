package crawler

import (
	"net/http"
	"net/url"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

// Result holds data about a crawled page
// Fields correspond to models.URL but without DB struct tags.
type Result struct {
	Title         string
	HTMLVersion   string
	H1Count       int
	H2Count       int
	H3Count       int
	InternalLinks int
	ExternalLinks int
	BrokenLinks   int
	HasLoginForm  bool
}

func Crawl(target string) (*Result, error) {
	resp, err := http.Get(target)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		return nil, err
	}

	result := &Result{}
	result.Title = strings.TrimSpace(doc.Find("title").Text())

	result.HTMLVersion = detectHTMLVersion(doc)

	result.H1Count = doc.Find("h1").Length()
	result.H2Count = doc.Find("h2").Length()
	result.H3Count = doc.Find("h3").Length()

	baseURL, err := url.Parse(target)
	if err != nil {
		baseURL = &url.URL{}
	}

	doc.Find("a[href]").Each(func(i int, s *goquery.Selection) {
		href, exists := s.Attr("href")
		if !exists {
			return
		}
		u, err := url.Parse(href)
		if err != nil {
			return
		}
		if !u.IsAbs() {
			result.InternalLinks++
			u = baseURL.ResolveReference(u)
		} else {
			if u.Host == baseURL.Host {
				result.InternalLinks++
			} else {
				result.ExternalLinks++
			}
		}
		if checkBroken(u.String()) {
			result.BrokenLinks++
		}
	})

	result.HasLoginForm = doc.Find("input[type='password']").Length() > 0

	return result, nil
}

func checkBroken(link string) bool {
	resp, err := http.Head(link)
	if err != nil {
		return true
	}
	defer resp.Body.Close()
	return resp.StatusCode >= 400 && resp.StatusCode <= 599
}

func detectHTMLVersion(doc *goquery.Document) string {
	nodes := doc.Nodes
	if len(nodes) == 0 {
		return "unknown"
	}
	node := nodes[0]
	if node.Type == 10 && node.Data == "html" { // doctype
		if strings.Contains(strings.ToLower(node.Data), "html") {
			return "HTML5"
		}
	}
	return "HTML4"
}
