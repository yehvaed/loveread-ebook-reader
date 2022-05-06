.PHONY: install test e2e publish

install:
	yarn install

test:
	yarn test

e2e: 
	yarn e2e

publish:
	expo publish --non-interactive

.SILENT: