# Rendu · 02 · Un CRUD avec Express

## Vérifications effectuées

| Méthode | URL | Statut | Résultat |
|---|---|---|---|
| `POST` | `http://localhost:3000/citations` avec `{"texte":" ","auteur":"Ada"}` | `400` | Corps vide : `{"message":"texte et auteur doivent être des chaînes non vides"}`. La citation n'est pas créée. |
| `GET` | `http://localhost:3000/citations/1` (après `DELETE /citations/1`) | `404` | Corps vide : `{"message":"Citation introuvable"}`. La citation supprimée n'est plus retrouvée par `find()`. |

Détail des autres routes vérifiées :

| Méthode | URL | Statut | Résultat |
|---|---|---|---|
| `GET` | `/citations/1` | `200` | `{"id":1,"texte":"Apprendre en pratiquant.","auteur":"Équipe du TP"}` |
| `POST` | `/citations` | `201` | `{"id":2,"texte":"On progresse en essayant.","auteur":"Ada"}` |
| `PUT` | `/citations/1` | `200` | `{"id":1,"texte":"Nouvelle version","auteur":"Ada"}` (identifiant conservé) |
| `DELETE` | `/citations/1` | `204` | Corps vide |
| `GET` | `/citations` | `200` | Liste à jour après les modifications |

## D'où viennent `req.params.id` et `req.body`

`req.params.id` vient de l'URL de la requête : Express remplit `req.params` avec les segments dynamiques (`:id`) du chemin de la route. Pour `GET /citations/1`, `req.params.id` vaut donc la chaîne `"1"`. Comme c'est une chaîne, il faut la convertir avec `Number()` avant de la comparer aux `id` numériques du tableau.

`req.body` vient du corps de la requête. Le middleware `app.use(express.json())` lit ce corps quand l'en-tête `Content-Type: application/json` est présent, le désérialise et le place dans `req.body`. Pour `POST /citations`, `req.body` contient alors l'objet `{ texte, auteur }` envoyé par le client. Sans ce middleware, `req.body` serait `undefined`.