import { getServerSession } from "next-auth"
import { authConfig } from "./auth"

export async function getCurrentSession() {
  return await getServerSession(authConfig)
}





