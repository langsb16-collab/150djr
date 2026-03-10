export async function uploadPinduoduo(videoUrl: string, title: string) {
  try {
    const CLIENT_ID = process.env.PDD_CLIENT_ID;
    const TOKEN = process.env.PDD_TOKEN;

    if (!CLIENT_ID || !TOKEN) {
      throw new Error("Pinduoduo credentials missing");
    }

    console.log(`[Pinduoduo] Uploading video: ${title}`);

    const res = await fetch("https://gw-api.pinduoduo.com/api/router", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "pdd.video.upload",
        video_url: videoUrl,
        title,
        client_id: CLIENT_ID,
        access_token: TOKEN
      })
    });

    const data = await res.json();
    return { success: true, platform: 'Pinduoduo', data };
  } catch (error) {
    console.error("Pinduoduo upload error:", error);
    throw error;
  }
}
