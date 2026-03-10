export async function uploadFacebook(videoUrl: string, title: string) {
  try {
    const PAGE_ID = process.env.FACEBOOK_PAGE_ID;
    const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

    if (!PAGE_ID || !ACCESS_TOKEN) {
      throw new Error("Facebook credentials missing");
    }

    console.log(`[Facebook] Uploading video: ${title}`);

    const res = await fetch(
      `https://graph.facebook.com/v18.0/${PAGE_ID}/videos`,
      {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file_url: videoUrl,
          title,
          description: title,
          access_token: ACCESS_TOKEN
        })
      }
    );

    const data = await res.json();
    return { success: true, platform: 'Facebook', data };
  } catch (error) {
    console.error("Facebook upload error:", error);
    throw error;
  }
}
