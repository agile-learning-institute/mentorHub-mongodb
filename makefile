# Makefile

.PHONY: local container

# Run the application locally
local:
	mh down
	mh up msm
	mh tail msm
	rm -rf ./docs/
	mkdir -p ./docs/
	mv ./configurations/openApi/* ./docs/

# Build and run the Docker container
container:
	docker build --tag ghcr.io/agile-learning-institute/mentorhub-msm:latest .
	mh down
	mh up mongodb
	mh tail mentorhub-mongomsm
