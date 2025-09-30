// CSR vs SSR vs SSG vs ISG

// Client-Side Rendering:
// CSR is rendering strategy where server send only minimal HTML + js bundle to browser and then actual ui and data fetching happens entirely on client(browser) after the js is executed

// Flow:
// client send req to /profile -> req goes to server -> server send a minimal Html + bundled js -> user initially sees a blank screen or "Loading" placeholder -> JS executes -> fetches data from api and react replaces placeholder with real content

// Commonly used in React(SPA)

// In next.js, if u fetch data inside useEffect, it's CSR:

import { useEffect, useState } from "react";

export default function Profile() {
    const [ user,setUser ] = useState(null);

    useEffect(() => {
     fetch("/api/user").then(res => res.json()).then(data => setUser(data));
    },[]);

    return <div>{user ? user.name : "Loading..."}</div>
}

// here initial HTML will be loaded = <div>Loading...</div>.
// Browser react -> fetch data -> update DOM -> we will see users

// Real world analogy:
// CSR is like restaurant where u only get menu first, and food is cooked only after u place the order -> u wait longer

// Adv:
// very dynamic(all data fetched client-side) 
// less load on server

// Dis: 
// slower first load(blank until js runs) -> poor ux
// Poor SEO -> search engine will empty HTML

// Use case: when seo doesn't matter, authenticated apps
// Like Dashboards(admin) , simpler apps

// ---------------------------------------------------------

//  Server Side Rendering (SSR)

// SSR is rendering where the page's HTML is generated on server for every req.
// The server fetches data, render react comp into HTML and send it to browser, broser athen hydrates ( attach react for interactivity ) and hence content is fully loaded on browser with no blank HTML

// Flow:
// User send a req to blog page /blog -> nextjs. server runs getServerSideProps, fetches data and send back fully rendered HTML with content back to client -> users sees complete content(blogs) -> then react attaches js for interactivity

// eg.
export async function getServerSideProps() {
    const res = await fetch("hhtps://api.example/blog");
    const posts = await res.json();

    return { props: { post} };
}

export default function Blog({post}) {
    return (
        <ul>
            {postMessage.map((p) => (
                <li key={p.id}>{p.title}</li>
            ))}
        </ul>
    )
}

// Real world analogy:
// SSr is like ordering food in restaurant -> chef(server) cooks immediately and serves fresh every time

// Adv:
// Great SEO(HTML ready at first req)
// fresh data on every req

// Dis:
// slower than SSG
// more load on server 
// more complex than CSR

// Use case: 
// News website(new headline changes freq)
// SEO is imp
// E-commerce product page

// ------------------------------------------------------


// Static Site Generation (SSG)

// SSG is rendering strategy where HTML pages are generated at build time, ahead of user req. The pre-rendered static files(HTML,CSS,JS) are then served directly from a CDN or server, making them extremely fast

// Flow:
// Nextjs runs build getStaticProps(getStaticPaths if dynamic route) and generates HTML 
// When user send req to /blogs -> server serves pre-rendered static HTML file from CDN -> user instantly sees content -> then js loads for interactivity

// eg. statically loading blogs as all user gonna see same blogs

export async function getStaticProps() {
    const res = await fetch("https://api.example.com/blogs");

    const blogs = await req.json();
    return { props: { blogs }}
}

export default function Blogs({blogs}) {
    return <div>
        <h2>{blogs.name}</h2>
        <p>{blogs.content}</p>
    </div>
}

// Real Worl Analogy
// SSG is like a bakery that bakes bread early in morning and keeps it ready on shelf. When customer come, they instantly get it - super fast, but if recipe changes the bakery mut bake again

// Adv:
// Faster than SSG(served from CDN)
// Seo friendly
// Scales easily(static files, no server cost)

// Dis:
// Not good for actively changing data
// data is stale until u rebuild

// Use case:
// Content is most static(like blog page where all users will see same blogs)
// Seo needed and faster performance
// No server cost 
// Use in blogs, portfolios, doc sites

// ------------------------------------------------------

// Incremental Static Regeneration (ISR)

// ISR is rendering technique where u statically generate pages at build time like SSG and but Next.js cam  regenrate them in background at runtime when new req comes based on  defined ( revalidate ) interval.

// ISR allow u to update static page after build w/o rebuilding entire sites 

// Combines SSG speed with SSR freshness
// uses getStaticProps with revalidate propertt
// Old page is served immediately -> new pages are gen in  background -> new req(new user) get fresh page

// Flow:

// Next.js genrates static HTML with getStaticProps during build time
//  users send a req to /products -> server serve the pre-rendered static HTML instantly -> user see the content immediately -> in bg, if revalidate time passed, next.js regrenrats page with freah data -> next user will see update page

// eg. 
export async function getStaticProps() {
    const products = axiox.get("https://api.examle.com/products");

    return {
        props: { products },
        revalidate: 60; // regenerate after every 60 second
    }
}


export default function Products({ products }) {
    return (
       <div>
        <ul>
            { products.map((i) => {
                <li key={i.id}>{i.name}</li>
            })}
        </ul>
       </div>
    )
}

//  first req -> server pre-rendered HTML 
//  After 60s, next req -> triggers background regeneration
//  following users -> see updated content w/o downtime

//  Real World Analogy:
//  ISR is bakery that pre-bakes bread in morning (SSG) , but also has rule: every hour if customer ask for new bread, refreshes the batc in bg. hence customer will get bread instantly and future customer will get fresh bread.

// Adv:
// combines spped of SSG with SSR freshness
// static page like ssg but updates after revalidate
// good SEO + Scales well
// Optimized for large apps

// Dis:
// data can still be stael for some users until regeneration
// complex debug than SSR and SSG
// requires platform like vercel that support isr caching

// Use case:
// when content changes, but not every sec like e-com catalogs(product prices update hourly/daily)
//  large app with lots of apge and u can't re-build all on every change (larger blogs)
// good SEO + fast speed


//  getServerSideProps -> Next.js function used to fetch data at req time on server
//  every time a user req oage server run this  fn fetch data and generate fresh HTML to send to client

//  getStaticProps -> Next.js function used to fetch data at build time for static site generation (SSG). The returned props are used to pre-render the page as static HTML. Can also be used with revalidate for ISR.

//  getStaticPaths -> used with dynamic routes ([id].js) to pre-render pages at buld timme. It defines which dynamic path to genrate. can be combined with fallback for ondemand gen
 
// pages/blogs/[id].js

export async function getStaticPaths() {
    const res = await fetch("https://api.example.com/posts");

    const posts = await res.json();

    const path = posts.map(post => ({ params:{ id:post.id.toString()}}));

    return { paths, fallback:"blocking" };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.id}`);
  const post = await res.json();

  return { props: { post }, revalidate: 60 };
}

export default function BlogPost({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

// Flow:

// Build Time → getStaticPaths generates HTML for popular posts.

// Client Requests /blog/1 → Next.js serves pre-rendered HTML.

// If a new ID not prebuilt → fallback: "blocking" triggers server to run getStaticProps → generate HTML → serve to user.

// Future Requests → Page is cached and updated in the background every revalidate seconds.