# cards-model

Custom **cards** block. Purpose: grid of photo tiles, each showing a model name and availability count and linking to that model's results, filtered by `model-filter` and paged 18 tiles at a time.

## Authoring

One row per tile: image | text.

- **Text:** model name (heading), availability ("27 Disponibili"), a link to the model's results (omit it when nothing is available), then a bulleted list of the filter categories the tile belongs to (e.g. "V12", "Ibrido", "Serie Speciali"). The list is filter data and is not shown; each item must match a `model-filter` tab label.

## Behaviour

- Listens for `model-filter:change` ({ category, query }) and shows the matching tiles; the query matches the model name.
- Paginates the matching tiles (18 per page) with numbered buttons and previous/next arrows; the paginator hides when everything fits on one page.

## Universal Editor fields

- Item `cards-model-card`: image, imageAlt, text.
