# 🚀 Déploiement

Ce dossier contient les fichiers nécessaires pour déployer le site sur un VPS.

## Fichiers

- `nginx.conf` : Configuration Nginx (HTTPS, cache, compression)
- `deploy.sh` : Script de build et déploiement automatique

## Configuration

### 1. Configurer deploy.sh

Ouvrir `deploy.sh` et modifier les variables :

```bash
VPS_USER="root"
VPS_HOST="votre-ip-ou-domaine.com"
DOMAIN="rideau-metallique-paris.fr"
SLUG="rm-paris"
```

### 2. Premier déploiement

```bash
chmod +x deploy/deploy.sh
./deploy/deploy.sh
```

### 3. Certificat SSL (première fois)

Sur le VPS :

```bash
# Créer le dossier pour certbot
mkdir -p /var/www/certbot

# Obtenir le certificat
certbot certonly --webroot -w /var/www/certbot -d votre-domaine.fr -d www.votre-domaine.fr

# Recharger Nginx
systemctl reload nginx
```

## Mises à jour

Pour mettre à jour le site :

```bash
./deploy/deploy.sh
```

Le script effectue automatiquement :
1. Build du site (`npm run build`)
2. Synchronisation des fichiers sur le VPS
3. Rechargement de Nginx

