export async function uploadNaverBlog(videoUrl: string, title: string, desc: string) {
  try {
    const NAVER_ID = process.env.NAVER_ID;
    const NAVER_SECRET = process.env.NAVER_SECRET;
    const NAVER_ACCESS_TOKEN = process.env.NAVER_ACCESS_TOKEN;

    if (!NAVER_ID || !NAVER_SECRET || !NAVER_ACCESS_TOKEN) {
      throw new Error("Naver credentials missing");
    }

    console.log(`[Naver Blog] Uploading video: ${title}`);

    const res = await fetch(
      "https://openapi.naver.com/blog/write",
      {
        method: "POST",
        headers: {
          "X-Naver-Client-Id": NAVER_ID,
          "X-Naver-Client-Secret": NAVER_SECRET,
          "Authorization": `Bearer ${NAVER_ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          content: `<p>${desc}</p><video src="${videoUrl}"></video>`
        })
      }
    );

    const data = await res.json();
    return { success: true, platform: 'NaverBlog', data };
  } catch (error) {
    console.error("Naver Blog upload error:", error);
    throw error;
  }
}
