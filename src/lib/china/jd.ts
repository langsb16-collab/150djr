export async function uploadJD(videoUrl: string, title: string) {
  try {
    const APP_KEY = process.env.JD_APP_KEY;

    if (!APP_KEY) {
      throw new Error("JD credentials missing");
    }

    console.log(`[JD.com] Uploading video: ${title}`);

    const res = await fetch("https://api.jd.com/routerjson", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: "jd.video.upload",
        video_url: videoUrl,
        title,
        app_key: APP_KEY
      })
    });

    const data = await res.json();
    return { success: true, platform: 'JD', data };
  } catch (error) {
    console.error("JD upload error:", error);
    throw error;
  }
}
