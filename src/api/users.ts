import { client } from "./client"

export function login(username: string, password: string) {
  return client.post("users/auth/login", {
    json: { loginUsername: username, loginPassword: password },
    credentials: "include",
  })
}
