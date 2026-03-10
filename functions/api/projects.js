// Cloudflare Pages Function for projects API
export async function onRequestGet(context) {
  try {
    // For now, return mock data since we don't have D1 setup yet
    const projects = [];
    
    return new Response(JSON.stringify(projects), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    
    // Store in memory for now (would use D1 in production)
    console.log('Project saved:', body);
    
    return new Response(JSON.stringify({ success: true }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
