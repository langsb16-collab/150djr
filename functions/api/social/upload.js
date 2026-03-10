// Cloudflare Pages Function for social upload
export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { videoUrl, title, description, platforms } = body;
    
    // Mock response for social uploads
    const results = platforms.map(platform => ({
      platform,
      success: true,
      message: `Uploaded to ${platform}`
    }));
    
    return new Response(JSON.stringify({ 
      success: true, 
      results 
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
