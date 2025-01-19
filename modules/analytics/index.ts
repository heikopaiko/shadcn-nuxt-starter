import { addImportsDir, createResolver, defineNuxtModule } from 'nuxt/kit'

const providerPath = './provider/google'

export default defineNuxtModule({
  meta: {
    name: 'analytics',
  },
  setup() {
    const { resolve } = createResolver(import.meta.url)
    addImportsDir(resolve(providerPath))
  },
})
