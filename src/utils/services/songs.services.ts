import axios from "axios"
import { config } from "utils/config"

export class SongServices {
  static instance = new SongServices()

  async getAll() {
    return await axios.post(`${config.atlas.urlEndpoint}/action/find`, 
      {
        "dataSource": config.atlas.dataSource,
        "database": config.atlas.database,
        "collection": config.atlas.collection
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "api-key": config.atlas.apiKey || "",
          "Accept": "application/json"
        }
      })
  }
}