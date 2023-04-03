import { google } from "googleapis";
import { config } from "utils/config";
import keys from "utils/googleSheetKey.json";

export default function handler(_req: any, res: any) {
  try {
    const client = new google.auth.JWT(
      keys.client_email,
      undefined,
      keys.private_key,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    client.authorize(async function (err, _tokens) {
      if (err) {
        return res.status(400).send({ error: true });
      }

      const gsapi = google.sheets({ version: "v4", auth: client });

      const options = {
        range: "'Canciones hechas'!A2:F1000",
        spreadsheetId: config.sheet.sheetID,
      };

      let { data: responseData } = await gsapi.spreadsheets.values.get(options);

      // Armar response con keys and values
      let values: any = responseData.values;
      let keys: any = values.shift();

      let songs = values
        .map((song: any) => ({ ...song }))
        .map((song: any) => {
          let newSong = {};
          Object.keys(song).map((songKey) => {
            newSong = {
              ...newSong,
              [keys[songKey]]: song[songKey],
            };
          });
          return newSong;
        });

      return res.status(200).send({ error: false, data: songs });
    });
  } catch (e: any) {
    return res
      .status(400)
      .send(JSON.stringify({ error: true, message: e.message }));
  }
}
