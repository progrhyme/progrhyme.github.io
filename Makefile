.PHONY: default build cname clean publish

default: publish

build:
	gulp

cname:
	echo progrhy.me > dist/CNAME

clean:
	rm -rf dist/*

publish: clean build cname
	cd dist && git add . \
		&& git commit -m "make publish" \
		&& git push origin master
