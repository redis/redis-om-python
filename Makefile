NAME := aredis_om
SYNC_NAME := redis_om
INSTALL_STAMP := .install.stamp
POETRY := $(shell command -v poetry 2> /dev/null)
REDIS_OM_URL ?= "redis://localhost:6380?decode_responses=True"

.DEFAULT_GOAL := help

.PHONY: help
help:
	@echo "Please use 'make <target>' where <target> is one of"
	@echo ""
	@echo "  install     install packages and prepare environment"
	@echo "  clean       remove all temporary files"
	@echo "  lint        run the code linters"
	@echo "  format      reformat code"
	@echo "  test        run all the tests against redislabs/redisearch:edge"
	@echo "  test_oss    run all the tests against redis:latest"
	@echo "  shell       open a Poetry shell"
	@echo "  redis       start a Redis instance with Docker"
	@echo "  sync        generate modules redis_om, tests_sync from aredis_om, tests respectively"
	@echo "  dist        build a redis-om package"
	@echo "  all         equivalent to \"make lint format test\""
	@echo ""
	@echo "Check the Makefile to know exactly what each target is doing."

install: $(INSTALL_STAMP)
$(INSTALL_STAMP): pyproject.toml
	@if [ -z $(POETRY) ]; then echo "Poetry could not be found. See https://python-poetry.org/docs/"; exit 2; fi
	$(POETRY) install
	touch $(INSTALL_STAMP)

.PHONY: clean
clean:
	find . -type d -name "__pycache__" | xargs rm -rf {};
	rm -rf $(INSTALL_STAMP) .coverage .mypy_cache
	rm -rf build
	rm -rf dist
	rm -rf redis_om
	rm -rf tests_sync
	docker compose down


.PHONY: dist
dist: $(INSTALL_STAMP) clean sync
	$(POETRY) build

.PHONY: sync
sync: $(INSTALL_STAMP)
	$(POETRY) run python make_sync.py

.PHONY: lint
lint: $(INSTALL_STAMP) dist
	$(POETRY) run isort --profile=black --lines-after-imports=2 ./tests/ $(NAME) $(SYNC_NAME)
	$(POETRY) run black ./tests/ $(NAME)
	$(POETRY) run flake8 --ignore=E231,E501,E712,E731,F401,W503 ./tests/ $(NAME) $(SYNC_NAME)
	$(POETRY) run mypy ./tests/ $(NAME) $(SYNC_NAME) --ignore-missing-imports --exclude migrate.py --exclude _compat\.py$
	$(POETRY) run bandit -r $(NAME) $(SYNC_NAME) -s B608

.PHONY: format
format: $(INSTALL_STAMP) sync
	$(POETRY) run isort --profile=black --lines-after-imports=2 ./tests/ $(NAME) $(SYNC_NAME)
	$(POETRY) run black ./tests/ $(NAME) $(SYNC_NAME)

.PHONY: test
test: $(INSTALL_STAMP) sync redis
	REDIS_OM_URL="$(REDIS_OM_URL)" $(POETRY) run pytest -n auto -vv ./tests/ ./tests_sync/ --cov-report term-missing --cov $(NAME) $(SYNC_NAME)
	docker compose down

.PHONY: test_oss
test_oss: $(INSTALL_STAMP) sync redis
	# Specifically tests against a local OSS Redis instance via
	# docker-compose.yml. Do not use this for CI testing, where we should
	# instead have a matrix of Docker images.
	REDIS_OM_URL="redis://localhost:6381?decode_responses=True" $(POETRY) run pytest -n auto -vv ./tests/ ./tests_sync/ --cov-report term-missing --cov $(NAME)


.PHONY: shell
shell: $(INSTALL_STAMP)
	$(POETRY) shell

.PHONY: redis
redis:
	docker compose up -d

.PHONY: all
all: lint format test
