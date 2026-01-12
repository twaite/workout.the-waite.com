import Database from "bun:sqlite"

const DB_PATH = "data/strava.db"

interface TokenData {
  accessToken: string
  refreshToken: string
  expiresAt: number
}

let db: Database | null = null

function getDb(): Database {
  if (!db) {
    db = new Database(DB_PATH)
    db.run(`
      CREATE TABLE IF NOT EXISTS strava_tokens (
        key TEXT PRIMARY KEY,
        value TEXT
      )
    `)
  }
  return db
}

export async function getTokens(): Promise<TokenData | null> {
  const database = getDb()
  const result = database.query("SELECT value FROM strava_tokens WHERE key = 'tokens'").get() as { value: string } | undefined

  if (!result) return null

  try {
    return JSON.parse(result.value) as TokenData
  } catch {
    return null
  }
}

export async function saveTokens(data: TokenData): Promise<void> {
  const database = getDb()
  database.run(
    "INSERT OR REPLACE INTO strava_tokens (key, value) VALUES (?, ?)",
    ["tokens", JSON.stringify(data)]
  )
}

export async function deleteTokens(): Promise<void> {
  const database = getDb()
  database.run("DELETE FROM strava_tokens WHERE key = 'tokens'")
}
