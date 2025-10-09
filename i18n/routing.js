import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'fr', 'de', 'nl', 'it','es','pt'],
 
  // Used when no locale matches
  defaultLocale: 'en',

  pathnames: {
  '/plans': {
    fr: '/plans',
    de: '/plaene',       // allemand
    nl: '/plannen',      // néerlandais
    it: '/piani',        // italien
    es: '/planes',       // espagnol
    pt: '/planos'        // portugais
  },

  '/about': {
    fr: '/a-propos',
    de: '/ueber-uns',    // allemand
    nl: '/over-ons',     // néerlandais
    it: '/chi-siamo',    // italien
    es: '/sobre-nosotros', // espagnol
    pt: '/sobre-nos'     // portugais
  },

  '/contact': {
    fr: '/contact',
    de: '/kontakt',      // allemand
    nl: '/contact',      // néerlandais
    it: '/contatto',     // italien
    es: '/contacto',     // espagnol
    pt: '/contato'       // portugais
  },

  '/login': {
    fr: '/connexion',
    de: '/anmeldung',    // allemand
    nl: '/inloggen',     // néerlandais
    it: '/accesso',      // italien
    es: '/iniciar-sesion', // espagnol
    pt: '/entrar'        // portugais
  },

  '/register': {
    fr: '/inscription',
    de: '/registrieren', // allemand
    nl: '/registreren',  // néerlandais
    it: '/registrati',   // italien
    es: '/registrarse',  // espagnol
    pt: '/registrar'     // portugais
  },

  '/dashboard': {
  fr: '/tableau-de-bord',
  de: '/übersicht',         // allemand
  nl: '/dashboard',         // néerlandais (souvent inchangé)
  it: '/dashboard',         // italien (souvent inchangé aussi)
  es: '/panel-de-control',  // espagnol
  pt: '/painel-de-controle' // portugais
},

'/dashboard/account': {
  fr: '/tableau-de-bord/compte',
  de: '/übersicht/konto',
  nl: '/dashboard/account',
  pt: '/painel-de-controle/conta',
  it: '/dashboard/account',
  es: '/panel-de-control/cuenta'
},

"/dashboard/transactions/create": {
  en: "/dashboard/new-transaction",
  fr: "/tableau-de-bord/nouvelle-transaction",
  de: "/übersicht/neue-transaktion",
  nl: "/dashboard/nieuwe-transactie",
  it: "/dashboard/nuova-transazione",
  es: "/panel-de-control/nueva-transaccion",
  pt: "/painel-de-controle/nova-transacao"
},


"/dashboard/transactions/[id]": {
    en: "/dashboard/transactions/[id]",
    fr: "/tableau-de-bord/transactions/[id]",
    de: "/übersicht/transaktionen/[id]",
    nl: "/dashboard/transacties/[id]",
    it: "/dashboard/transazioni/[id]",
    es: "/panel-de-control/transacciones/[id]",
    pt: "/painel-de-controle/transacoes/[id]"
  }








}

});