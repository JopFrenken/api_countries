// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
          integrity: "sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65",
          crossorigin: 'anonymous',
          referrerpolicy: 'no-referrer'
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
        }
      ]
    }
  }
})