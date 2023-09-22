// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  modules: ['@sidebase/nuxt-session', '@nuxt/ui', '@pinia/nuxt'],
  ssr: true,
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
          integrity: "sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65",
          crossorigin: 'anonymous',
          referrerpolicy: 'no-referrer'
        },
        {
          rel: 'stylesheet',
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
          integrity: "sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer"
        },
        {
          rel: 'stylesheet',
          href: '/main.css'
        }
      ],
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.1/js/bootstrap.min.js",
          integrity: "sha512-fHY2UiQlipUq0dEabSM4s+phmn+bcxSYzXP4vAXItBvBHU7zAM/mkhCZjtBEIJexhOMzZbgFlPLuErlJF2b+0g==",
          crossorigin: 'anonymous',
          referrerpolicy: 'no-referrer'
        },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js",
          integrity: "sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==",
          crossorigin: 'anonymous',
          referrerpolicy: 'no-referrer',
        },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/js/all.min.js",
          integrity: "sha512-uKQ39gEGiyUJl4AI6L+ekBdGKpGw4xJ55+xyJG7YFlJokPNYegn9KwQ3P8A7aFQAUtUsAQHep+d/lrGqrbPIDQ==",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer"
        }
      ]
    }
  },
})
