import path from 'node:path'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import type { AstroIntegration } from 'astro'

export default function relative404Integration(): AstroIntegration {
   let nfs: string[]
   return {
      name: 'astro-relative-404',
      hooks: {
         async 'astro:config:done'({ config }) {
            nfs = []
            const pages_dir = path.join(fileURLToPath(config.srcDir), 'pages')
            async function traverse(dir: string) {
               const dirents = await fs.readdir(dir, { withFileTypes: true })
               const not_found_entry = dirents.find(
                  (d) => d.isFile() && path.basename(d.name, path.extname(d.name)) === '404'
               )
               if (not_found_entry) {
                  nfs.push(path.relative(pages_dir, path.join(dir, not_found_entry.name)))
               }
               for (const dir_entry of dirents) {
                  if (dir_entry.isDirectory()) {
                     traverse(path.join(dir, dir_entry.name))
                  }
               }
            }
            await traverse(pages_dir)
         },
         'astro:server:setup'({ server }) {
            server.middlewares.use(async (req, res, next) => {
               if (path.extname(req.originalUrl) != '') {
                  return next()
               }
               let loaded
               try {
                  loaded = await server.pluginContainer.resolveId(req.originalUrl)
               } catch (e) {
                  return next()
               }

               if (loaded) {
                  return next()
               }
               const closest404 = nfs
                  .filter((p) => req.originalUrl.includes(path.dirname(p)))
                  .sort((a, b) => b.length - a.length)[0]

               if (!closest404) return next()

               const url = '/' + closest404.replace(path.extname(closest404), '')
               req.url = url
               next()
            })
         },
      },
   }
}
