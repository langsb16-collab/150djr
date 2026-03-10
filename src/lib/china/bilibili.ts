export async function uploadBilibili(videoUrl: string, title: string, description: string) {
  try {
    const TOKEN = process.env.BILI_TOKEN;

    if (!TOKEN) {
      throw new Error("Bilibili credentials missing");
    }

    console.log(`[Bilibili] Uploading video: ${title}`);

    const res = await fetch("https://member.bilibili.com/x/vu/web/add", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        desc: description,
        video_url: videoUrl
      })
    });

    const data = await res.json();
    return { success: true, platform: 'Bilibili', data };
  } catch (error) {
    console.error("Bilibili upload error:", error);
    throw error;
  }
}
