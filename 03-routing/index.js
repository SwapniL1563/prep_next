// Routing in next.js uses file-base routing.
// every file  inside pages/ directory becomes a route

// eg. 

// pages/
//   |- index.js  -> "/"
//   |- about.js  -> "/about"

//  dynamic routing -> [params] 
//  pages/blog/[id].js -> handles /blog/2 , /blog/1

//  nested routing -> 
// pages/
//  └─ dashboard/
//      ├─ index.js      → "/dashboard"
//      └─ settings.js   → "/dashboard/settings"
 

//  catch-all routes -> use [...param] to mtach multiple segment
// pages/docs/[...slug].js
// import { useRouter } from "next/router";

// export default function Docs() {
//   const router = useRouter();
//   return <div>Docs Path: {router.query.slug.join("/")}</div>;
// }

//  Link -> instead of <a/> to enable client side nav -> no page reload
//  useRouter -> navigation in code


// page router vs app router

// page router -> traditional router ( pre next 13 )
// uses the pages/ dir to create routes
// supports SSR,SSG,ISR via getServerSideProps, getStaticProps, and getStaticPaths.
// all client-side components

// eg.
//  pages/
//  ├─ index.js       → "/"
//  ├─ about.js       → "/about"
//  └─ blog/[id].js   → "/blog/1"

//  pros:
//  simple, stable and widely used

//  cons:
//  limited nesting
//  no built-in for streaming and loading ui


// app router -> new routing system introduced in next 13+
// uses app/ dir instead of pages/
// supports client and server components in same folder

// app/
//  ├─ layout.js       → global layout (header, footer)
//  ├─ page.js         → "/"
//  ├─ about/
//  │   └─ page.js     → "/about"
//  └─ blog/
//      ├─ [id]/
//      │   └─ page.js → "/blog/1"

// pros:
//  nested layout support
//  supports loading.js, error.js, template.js
//  support server comp(by default) and client too
//  streaming pages

//  cons:
//  still evolving 



