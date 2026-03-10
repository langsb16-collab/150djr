export async function uploadTiktok(videoUrl: string, title: string) {
  try {
    const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN;

    if (!TIKTOK_ACCESS_TOKEN) {
      throw new Error("TikTok credentials missing");
    }

    console.log(`[TikTok] Uploading video: ${title}`);

    const res = await fetch(
      "https://open.tiktokapis.com/v2/post/publish/video/init/",
      {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${TIKTOK_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          video_url: videoUrl,
          title
        })
      }
    );

    const data = await res.json();
    return { success: true, platform: 'TikTok', data };
  } catch (error) {
    console.error("TikTok upload error:", error);
    throw error;
  }
}
