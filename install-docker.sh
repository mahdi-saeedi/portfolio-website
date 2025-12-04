#!/bin/bash

set -e

echo "=============================================="
echo "     Docker + Docker Compose Installer"
echo "=============================================="

# -----------------------
# CHECK DOCKER
# -----------------------
if command -v docker &> /dev/null
then
    echo "🐳 Docker is already installed:"
    docker --version
    DOCKER_INSTALLED=true
else
    DOCKER_INSTALLED=false
fi

# -----------------------
# CHECK DOCKER COMPOSE (v2 plugin)
# -----------------------
if command -v docker-compose &> /dev/null
then
    echo "🧩 Docker Compose v1 installed (old version):"
    docker-compose --version
    echo "⚠️ You should migrate to Docker Compose v2 plugin."
fi

if docker compose version &> /dev/null
then
    echo "🧩 Docker Compose v2 plugin is already installed:"
    docker compose version
    COMPOSE_INSTALLED=true
else
    COMPOSE_INSTALLED=false
fi

# -----------------------
# INSTALL DOCKER IF NEEDED
# -----------------------
if [ "$DOCKER_INSTALLED" = false ]; then
    echo "🔄 Docker not found. Installing Docker Engine..."

    sudo apt update
    sudo apt install -y ca-certificates curl gnupg lsb-release

    echo "🔐 Adding Docker GPG key..."
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
        sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg

    echo "📁 Adding Docker repository..."
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    sudo apt update

    echo "🐳 Installing Docker..."
    sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin

    echo "⚙️ Enabling Docker service..."
    sudo systemctl enable docker
    sudo systemctl start docker

    echo "👤 Adding user to docker group..."
    sudo usermod -aG docker $USER

    echo "✅ Docker installation finished."
fi

# -----------------------
# INSTALL DOCKER COMPOSE PLUGIN IF NEEDED
# -----------------------
if [ "$COMPOSE_INSTALLED" = false ]; then
    echo "🔄 Docker Compose v2 not found. Installing..."

    sudo apt update
    sudo apt install -y docker-compose-plugin

    echo "🧩 Docker Compose v2 installed:"
    docker compose version
else
    echo "🧩 Docker Compose v2 already installed. Skipping."
fi

echo "=============================================="
echo "🎉 Installation complete!"
echo "➡️ Log out and log in again to use Docker without sudo."
echo "=============================================="
