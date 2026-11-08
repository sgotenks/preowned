# cards-car-listing

Custom **cards** block. Purpose: results grid of vehicle cards (photo, badge, year/mileage, model, price, colours, dealer, contact/details actions) with optional promo tiles.

## Authoring (Document Authoring)

Model: `standalone`

Single block table. Content: one row per card: image | badge (optional, e.g. "Nuovo") | text. Vehicle text: meta paragraph (year, km), heading (model), price paragraph, list of "Label: Value" specs (Esterni, Interni, Concessionaria), links (Contattaci, Dettagli). A card without a spec list renders as a promo tile (heading, paragraph, link over the image).

## Supported variations

No variations.

## Universal Editor fields

- Content fields derived from the block's decorate contract.
