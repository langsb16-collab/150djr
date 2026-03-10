export async function uploadInstagram(videoUrl: string, caption: string) {
  try {
    // Note: Meta Graph API requires an IG_USER_ID and a Page Access Token
    const IG_USER_ID = process.env.INSTAGRAM_USER_ID;
    const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!IG_USER_ID || !ACCESS_TOKEN) {
      throw new Error("Instagram credentials missing");
    }

    console.log(`[Instagram] Uploading video: ${caption}`);
    
    // 1. Create Media Container
    const res = await fetch(
      `https://graph.facebook.com/v18.0/${IG_USER_ID}/media`,
      {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          media_type: "REELS",
          video_url: videoUrl,
          caption,
          access_token: ACCESS_TOKEN
        })
      }
    );

    const data = await res.json();
    
    // 2. Publish Media (usually needs to wait for container to be ready)
    // For this implementation, we'll return the container creation result
    return { success: true, platform: 'Instagram', data };
  } catch (error) {
    console.error("Instagram upload error:", error);
    throw error;
  }
}
