export async function uploadXiaohongshu(videoUrl: string, title: string, description: string) {
  try {
    const TOKEN = process.env.XHS_TOKEN;

    if (!TOKEN) {
      throw new Error("Xiaohongshu credentials missing");
    }

    console.log(`[Xiaohongshu] Uploading video: ${title}`);

    const res = await fetch("https://api.xiaohongshu.com/video/upload", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        video_url: videoUrl,
        title,
        description
      })
    });

    const data = await res.json();
    return { success: true, platform: 'Xiaohongshu', data };
  } catch (error) {
    console.error("Xiaohongshu upload error:", error);
    throw error;
  }
}
