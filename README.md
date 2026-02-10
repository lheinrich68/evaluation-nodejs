# Evaluation NodeJS
Evaluation de NodeJS pour la formation *Concepteur Développeur d'Application*.

---
## Setup du projet
### Récupération du projet
```batch
#HTTPS Clone :
git clone https://github.com/lheinrich68/evaluation-nodejs.git

#SSH Clone :
git clone git@github.com:lheinrich68/evaluation-nodejs.git
```

## Installation et initialisation du projet
```batch
npm install #ou "npm i"
cp .env.example .env
```

Générer le client Prisma
```batch
npx prisma generate
```

## Démarrage du projet
```batch
docker compose -f docker-compose.yml up -d
```

## Accèss
- API: http://localhost:3005
- Adminer: http://localhost:8085

## En cas de problème :
En cas de problème après modification de la configuration, essayez les commandes suiovantes (de la moins déstructrice à la plus destructrice):


```batch
# 1. Soft Reboot
docker compose -f docker-compose.dev.yml restart
```
```batch
# 2. Image Rebuild
docker compose -f infra/docker-compose.dev.yml build --no-cache
```
```batch
# 3. Rebuild & Reboot
docker compose -f infra/docker-compose.dev.yml up -d --build --no-cache
```
```batch
# 4. Delete containers + volumes, Full rebuild (garde les images)
docker compose -f infra/docker-compose.dev.yml down -v && docker compose -f infra/docker-compose.dev.yml up -d --build --no-cache
```
```batch
# 5. Nuke Option (supprime TOUT ce qui est lié au projet)
docker compose -f infra/docker-compose.dev.yml down -v && docker compose -f infra/docker-compose.dev.yml build --no-cache --force-rm && docker compose -f infra/docker-compose.dev.yml up -d
```