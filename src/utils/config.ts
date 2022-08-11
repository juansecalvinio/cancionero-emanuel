export const config = {
  atlas: {
    urlEndpoint: process.env.ATLAS_URL_ENDPOINT,
    apiKey: process.env.ATLAS_API_KEY,
    dataSource: process.env.ATLAS_DATA_SOURCE,
    database: process.env.ATLAS_DATABASE,
    collection: process.env.ATLAS_COLLECTION,
    contentType: process.env.ATLAS_CONTENT_TYPE
  },
  sheet: {
    sheetID: process.env.SHEET_ID
  }
}