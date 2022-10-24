Use local 404.astro.

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
