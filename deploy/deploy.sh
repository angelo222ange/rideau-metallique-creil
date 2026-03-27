#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════
# SCRIPT DE DÉPLOIEMENT - TEMPLATE RIDEAU MÉTALLIQUE
# ═══════════════════════════════════════════════════════════════════════════
# À PERSONNALISER :
# - VPS_USER : utilisateur SSH
# - VPS_HOST : adresse IP ou domaine du VPS
# - DOMAIN : nom de domaine du site
# - SLUG : identifiant court (pour dossiers)
# ═══════════════════════════════════════════════════════════════════════════

set -e

# ─────────────────────────────────────────────────────────────────────────
# CONFIGURATION - À MODIFIER
# ─────────────────────────────────────────────────────────────────────────
VPS_USER="root"
VPS_HOST="votre-ip-ou-domaine.com"
DOMAIN="rideau-metallique-paris.fr"
SLUG="rm-paris"

REMOTE_PATH="/var/www/$SLUG"

# ─────────────────────────────────────────────────────────────────────────
# COULEURS
# ─────────────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}   DÉPLOIEMENT - ${DOMAIN}${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"

# ─────────────────────────────────────────────────────────────────────────
# ÉTAPE 1 : Build
# ─────────────────────────────────────────────────────────────────────────
echo -e "\n${YELLOW}📦 Build du site...${NC}"
npm run build

if [ ! -d "out" ]; then
    echo -e "${RED}❌ Erreur: le dossier 'out' n'existe pas. Le build a échoué.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build terminé${NC}"

# ─────────────────────────────────────────────────────────────────────────
# ÉTAPE 2 : Création du dossier distant
# ─────────────────────────────────────────────────────────────────────────
echo -e "\n${YELLOW}📁 Préparation du serveur...${NC}"
ssh "$VPS_USER@$VPS_HOST" "mkdir -p $REMOTE_PATH"

# ─────────────────────────────────────────────────────────────────────────
# ÉTAPE 3 : Synchronisation des fichiers
# ─────────────────────────────────────────────────────────────────────────
echo -e "\n${YELLOW}🚀 Envoi des fichiers...${NC}"
rsync -avz --delete \
    --exclude '.git' \
    --exclude 'node_modules' \
    --exclude '.next' \
    out/ "$VPS_USER@$VPS_HOST:$REMOTE_PATH/out/"

echo -e "${GREEN}✅ Fichiers synchronisés${NC}"

# ─────────────────────────────────────────────────────────────────────────
# ÉTAPE 4 : Configuration Nginx (première fois)
# ─────────────────────────────────────────────────────────────────────────
echo -e "\n${YELLOW}🔧 Vérification Nginx...${NC}"

NGINX_AVAILABLE="/etc/nginx/sites-available/$DOMAIN.conf"
NGINX_ENABLED="/etc/nginx/sites-enabled/$DOMAIN.conf"

# Vérifier si la config existe
CONFIG_EXISTS=$(ssh "$VPS_USER@$VPS_HOST" "[ -f $NGINX_AVAILABLE ] && echo 'yes' || echo 'no'")

if [ "$CONFIG_EXISTS" = "no" ]; then
    echo -e "${YELLOW}⚠️  Configuration Nginx non trouvée. Copie en cours...${NC}"
    
    # Copier la config (remplacer les placeholders)
    sed -e "s/{{DOMAIN}}/$DOMAIN/g" -e "s/{{SLUG}}/$SLUG/g" deploy/nginx.conf > /tmp/nginx-$SLUG.conf
    scp /tmp/nginx-$SLUG.conf "$VPS_USER@$VPS_HOST:$NGINX_AVAILABLE"
    rm /tmp/nginx-$SLUG.conf
    
    # Créer le lien symbolique
    ssh "$VPS_USER@$VPS_HOST" "ln -sf $NGINX_AVAILABLE $NGINX_ENABLED"
    
    echo -e "${YELLOW}⚠️  N'oubliez pas de configurer le certificat SSL :${NC}"
    echo -e "   certbot certonly --webroot -w /var/www/certbot -d $DOMAIN -d www.$DOMAIN"
fi

# Tester et recharger Nginx
ssh "$VPS_USER@$VPS_HOST" "nginx -t && systemctl reload nginx"

echo -e "${GREEN}✅ Nginx configuré${NC}"

# ─────────────────────────────────────────────────────────────────────────
# TERMINÉ
# ─────────────────────────────────────────────────────────────────────────
echo -e "\n${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}   ✅ DÉPLOIEMENT TERMINÉ${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "   🌐 Site: https://$DOMAIN"
echo -e "   📁 Chemin: $REMOTE_PATH/out"
echo ""

