NAME := redis_om
INSTALL_STAMP := .install.stamp
POETRY := $(shell command -v poetry 2> /dev/null)

.DEFAULT_GOAL := help

.PHONY: help
help:
	@echo "Please use 'make <target>' where <target> is one of"
	@echo ""
	@echo "  install     install packages and prepare environment"
	@echo "  clean       remove all temporary files"
	@echo "  lint        run the code linters"
	@echo "  format      reformat code"
	@echo "  test        run all the tests"
	@echo "  shell       open a Poetry shell"
	@echo "  redis       start a Redis instance with Docker"
	@echo ""
	@echo "Check the Makefile to know exactly what each target is doing."

install: $(INSTALL_STAMP)
$(INSTALL_STAMP): pyproject.toml poetry.lock
	@if [ -z $(POETRY) ]; then echo "Poetry could not be found. See https://python-poetry.org/docs/"; exit 2; fi
	$(POETRY) install
	touch $(INSTALL_STAMP)

.PHONY: clean
clean:
	find . -type d -name "__pycache__" | xargs rm -rf {};
	rm -rf $(INSTALL_STAMP) .coverage .mypy_cache
	-rm -r dist

.PHONY: dist
dist: clean
	$(POETRY) build

.PHONY: upload
upload: dist
	$(POETRY) run twine upload dist/*

.PHONY: lint
lint: $(INSTALL_STAMP) dist
	$(POETRY) run isort --profile=black --lines-after-imports=2 ./tests/ $(NAME)
	$(POETRY) run black ./tests/ $(NAME)
	$(POETRY) run flake8 --ignore=W503,E501,F401,E731 ./tests/ $(NAME)
	$(POETRY) run mypy ./tests/ $(NAME) --ignore-missing-imports
	$(POETRY) run bandit -r $(NAME) -s B608
	$(POETRY) run twine check dist/*

.PHONY: format
format: $(INSTALL_STAMP)
	$(POETRY) run isort --profile=black --lines-after-imports=2 ./tests/ $(NAME)
	$(POETRY) run black ./tests/ $(NAME)

.PHONY: test
test: $(INSTALL_STAMP)
	$(POETRY) run pytest -n auto -s -vv ./tests/ --cov-report term-missing --cov $(NAME)

.PHONY: shell
shell: $(INSTALL_STAMP)
	$(POETRY) shell

.PHONY: redis
redis:
	docker-compose up -d

.PHONY: all
all: redis $(INSTALL_STAMP) lint test
