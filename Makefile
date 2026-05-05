.PHONY: help install dev build start lint type-check clean reinstall env

# Cho phép override: `make dev PORT=4000`
PORT ?= 3000
PKG_MANAGER ?= npm

help: ## Hiện danh sách lệnh
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

env: ## Tạo .env.local từ .env.example nếu chưa có
	@if [ ! -f .env.local ]; then \
		cp .env.example .env.local; \
		echo "Đã tạo .env.local từ .env.example — nhớ chỉnh các biến cho đúng."; \
	else \
		echo ".env.local đã tồn tại."; \
	fi

install: ## Cài dependencies
	$(PKG_MANAGER) install

dev: env ## Chạy dev server (mặc định cổng 3000)
	$(PKG_MANAGER) run dev -- -p $(PORT)

build: ## Build production
	$(PKG_MANAGER) run build

start: ## Chạy production server (cần build trước)
	$(PKG_MANAGER) run start -- -p $(PORT)

lint: ## Chạy ESLint
	$(PKG_MANAGER) run lint

type-check: ## Kiểm tra kiểu TypeScript~~
	$(PKG_MANAGER) run type-check

clean: ## Xoá build artifacts và cache
	rm -rf .next out node_modules/.cache

reinstall: ## Xoá node_modules và cài lại
	rm -rf node_modules package-lock.json
	$(PKG_MANAGER) install

.DEFAULT_GOAL := help
