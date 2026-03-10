export async function upload1688(videoUrl: string, title: string) {
  try {
    const TOKEN = process.env.ALIBABA_TOKEN;

    if (!TOKEN) {
      throw new Error("1688 credentials missing");
    }

    console.log(`[1688] Uploading video: ${title}`);

    const res = await fetch("https://gw.open.1688.com/openapi/video/upload", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        videoUrl
      })
    });

    const data = await res.json();
    return { success: true, platform: '1688', data };
  } catch (error) {
    console.error("1688 upload error:", error);
    throw error;
  }
}
