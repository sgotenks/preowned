# editorial

Custom block (base type: columns). Purpose: a chapter of an editorial page — a photo beside a block of
copy, with optional extra copy revealed by a ringed "+" toggle in a lighter full-width band.

## Authoring

Model: `standalone`

| Row | Content |
| --- | --- |
| 1 | Image |
| 2 | Text (paragraphs, lists) |
| 3 | More (optional): headings, paragraphs and lists shown when the toggle is opened |

Put the chapter label (`<p><strong>2</strong> Ispezione Tecnica</p>`) as default content before the
block, and set the section style (`dark` or `dark-grey`) for the band colour.

## Supported variations

| Variation | Option class |
| --- | --- |
| Image right | `image-right` |

## Universal Editor fields

`image` (+ `imageAlt`), `text`, `more`, and the `classes` select for Image right.
