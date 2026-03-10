export async function uploadTaobao(videoUrl: string, title: string, description: string) {
  try {
    const APP_KEY = process.env.TAOBAO_APP_KEY;
    const SESSION = process.env.TAOBAO_SESSION;

    if (!APP_KEY || !SESSION) {
      throw new Error("Taobao credentials missing");
    }

    console.log(`[Taobao] Uploading video: ${title}`);

    const res = await fetch("https://eco.taobao.com/router/rest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: "taobao.material.video.upload",
        title,
        video_url: videoUrl,
        description,
        app_key: APP_KEY,
        session: SESSION,
        format: "json",
        v: "2.0",
        timestamp: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      })
    });

    const data = await res.json();
    return { success: true, platform: 'Taobao', data };
  } catch (error) {
    console.error("Taobao upload error:", error);
    throw error;
  }
}

export async function uploadTmall(videoUrl: string, title: string, description: string) {
  // Tmall often uses the same Taobao Open Platform API
  return uploadTaobao(videoUrl, title, description);
}
