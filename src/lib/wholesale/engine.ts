export interface WholesaleProduct {
  id: string;
  platform: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  description: string;
}

export const fetchWholesaleProducts = async (keyword: string): Promise<WholesaleProduct[]> => {
  // In a real implementation, this would call APIs of OwnerClan, Domemae, etc.
  // For this demo, we simulate the collection process.
  console.log(`Searching wholesale platforms for: ${keyword}`);
  
  const platforms = ['OwnerClan', 'Domemae', 'OnChannel', 'DomeSin', 'SellingCock'];
  const results: WholesaleProduct[] = [];

  for (const platform of platforms) {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Generate mock data for comparison
    const basePrice = 15000 + Math.floor(Math.random() * 5000);
    results.push({
      id: `${platform.toLowerCase()}-${Math.random().toString(36).substr(2, 9)}`,
      platform,
      name: `[${platform}] Premium ${keyword} - High Quality`,
      price: basePrice,
      stock: Math.floor(Math.random() * 1000),
      imageUrl: `https://picsum.photos/seed/${platform}-${keyword}/800/800`,
      description: `Detailed description for ${keyword} sourced from ${platform}. Best quality and fast shipping.`
    });
  }

  return results.sort((a, b) => a.price - b.price);
};

export const getBestWholesaleProduct = async (keyword: string): Promise<WholesaleProduct> => {
  const products = await fetchWholesaleProducts(keyword);
  return products[0]; // Return the cheapest one
};
