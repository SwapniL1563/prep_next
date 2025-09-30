// API routes - allow u to build serverless backend API directly inside next.js project w/o needing a separate backend server
//  using pages/api/ or ap/api/route.ts
//  this are only server-side

// eg.
export async function GET() {
    return new Response(JSON.stringify({ message:"Hello there"}),
{status:200,
});
}

// real world analogy:
// api routes -> kitchen indside restaurant

// frontend (waiter) -> ask for dish
// api routes (kitchen) -> prepares the dish
// user get the dish (JSON res)


// how to secure api routes in next.js?
//  1) authentication and authorization:
//   - use nextAuth.js,jwt or token
//   - eg .only logged user can acces /api/orders

//  2) middleware:
//  runs check before hitting api route
//  - eg. block /api/admin if user is not admin

//  3) store Api keys in .env

//  4) validate body / query params(zod) 

//  5) add rate-limiting to prevent abuse(rate-limiter-flexible)

