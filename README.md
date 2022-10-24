Use local 404.astro.

`pnpm i -D astro-relative-404`
Note: you should manually restart astro after adding/removing 404.astro page.
```
pages
┣ app <- SPA
┃ ┣ 404.astro <- fallback to SPA
┃ ┗ index.astro
┣ blog
┃ ┣ index.astro
┃ ┣ second.md
┃ ┗ welcome.md
┣ 404.astro
┣ index.astro
```

https://developers.cloudflare.com/pages/platform/serving-pages/#not-found-behavior
