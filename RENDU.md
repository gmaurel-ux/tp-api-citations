# Rendu TP 1 · Répondre à une requête HTTP avec Express

## Réponses du serveur

### GET /citations

- **Statut** : `200 OK`
- **Contenu** : le tableau des citations au format JSON

```json
[
  { "id": 1, "texte": "[texte de la citation]", "auteur": "[auteur]" }
]
```

### GET /inconnue

- **Statut** : `404 Not Found`
- **Contenu** :

```json
{ "message": "Route introuvable" }
```

## Rôle de `req` et `res`

- `req` (request) représente la requête envoyée par le client (navigateur, `curl`). Elle contient l'URL demandée, la méthode HTTP (GET, POST...), les en-têtes et les paramètres.
- `res` (response) sert à construire la réponse renvoyée au client : définir le statut (`res.status()`), le format et le contenu (`res.send()`, `res.json()`, `res.render()`).

## En-tête Content-Type

| Route | Ligne `Content-Type` | Format renvoyé |
| --- | --- | --- |
| `/ping` | `Content-Type: text/plain; charset=utf-8` | Texte brut |
| `/citations` | `Content-Type: application/json; charset=utf-8` | JSON |

`/ping` renvoie du texte brut grâce à `res.type("text/plain")`. `/citations` renvoie du JSON car `res.json()` convertit le tableau et positionne automatiquement le `Content-Type` sur `application/json`.