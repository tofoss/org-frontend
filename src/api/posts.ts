import { client } from "./client"

export function postPost() {
  return client.post("api/posts", { json: { body: "foo bar" } })
}
