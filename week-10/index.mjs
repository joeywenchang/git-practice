import https from "https";

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1308393710610022460/DBCvZXSOOlB8cmUGYdQdCBmIluM8JxvYct1seHBzDxgyKdoK1E13TDmboymGCWcqmYsF";

export async function handler(event) {
  try {
    const message = " Average CPUUtilization Greater than 60"; // 要發送的純文本訊息

    // Discord Webhook 請求選項
    const url = new URL(DISCORD_WEBHOOK_URL);

    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    // 發送請求到 Discord
    const response = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve({ statusCode: res.statusCode, body: data });
        });
      });

      req.on("error", (e) => {
        reject(e);
      });

      req.write(JSON.stringify({ content: message }));
      req.end();
    });

    console.log("Discord response:", response);

    if (response.statusCode === 204) {
      return {
        statusCode: 200,
        body: "Message sent to Discord successfully!",
      };
    } else {
      throw new Error(`Failed to send message: ${response.body}`);
    }
  } catch (error) {
    console.error("Error sending message:", error);
    return {
      statusCode: 500,
      body: "Failed to send message to Discord.",
    };
  }
}
