import { connect, connection } from "mongoose"

const conn: any = {
  isConnected: false
}

export async function dbConnect() {
  if (conn.isConnected) return
  const db = await connect(process.env.MONGODB_URI!)
  conn.isConnected = db.connections[0].readyState
  console.log('database:', db.connection.db.databaseName)
}

connection.on("connected", () => {
  console.log("MongoDB is connected")
})

connection.on("error", (error) => {
  console.log(error)
})