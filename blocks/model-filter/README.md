# model-filter

Custom block. Purpose: category filter tabs with a search toggle that filter the `cards-model` grid.

## Authoring

Two rows:

1. **Filters:** a list of tab labels. The first label shows every tile; the others show the tiles whose category list contains that label (e.g. "Serie Speciali").
2. **Search placeholder (optional):** e.g. "FILTRA PER...". When present, a search button opens a search row above the tabs that filters tiles by model name.

## Behaviour

- Broadcasts `model-filter:change` ({ category, query }) on `document`; `cards-model` listens.
- Search: magnifier at the end of the tab bar (a round button fixed bottom-right below 601px); the search row has a close button, and Escape also closes it and clears the query.

## Universal Editor fields

- `filters` (rich text list), `searchPlaceholder` (text).
