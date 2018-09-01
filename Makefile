.PHONY: default build clean publish

default: publish

build:
	gulp

clean:
	rm -rf dist/*

publish: clean build
	cd dist && git add . \
		&& git commit -m "make publish" \
		&& git push origin gh-pages
