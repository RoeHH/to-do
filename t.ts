import "https://deno.land/x/dotenv@v3.2.0/load.ts";

import {
  Client,
  query as q,
} from "https://deno.land/x/fauna@5.0.0-deno-alpha9/mod.ts";

let client: Client;
{
  const secret = Deno.env.get("FAUNA_SECRET");
  if (!secret) {
    throw new Error("environment variable FAUNA_SECRET not set");
  }

  client = new Client({ secret });
}

{
  const helper = client.paginate(
    q.Match(
      q.FaunaIndex("allQuotes"),
    ),
  );

  helper.map(function (ref) {
    return q.Get(ref);
  })
    .each(function (page) {
      console.log(page); // Logs the retrieved documents.
    });
}

{
  const helper = client.paginate(
    q.Match(
      q.FaunaIndex("info"),
      "Bjarne Stroustrup"
    )
  );

  helper
    .each(function (page) {
      console.log(page); // Logs the retrieved documents.
    });
}


client.query(
  q.Create(
    q.Ref(q.Collection('Quote'), q.NewId()),
    { data: { title: 'The first post' } },
  )
)
.then((ret) => console.log(ret))
.catch((err) => console.error(
  'Error: [%s] %s: %s',
  err.name,
  err.message,
  err.errors()[0].description,
))