export interface MarketRegistrationResult {
  platform: string;
  success: boolean;
  productId?: string;
  error?: string;
}

export const registerToOpenMarkets = async (productData: {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  keywords: string[];
}): Promise<MarketRegistrationResult[]> => {
  const platforms = ['11st', 'Gmarket', 'Auction', 'TMON', 'Wemakeprice', 'SSG'];
  const results: MarketRegistrationResult[] = [];

  for (const platform of platforms) {
    // Simulate API latency for registration
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simulate success/failure
    const success = Math.random() > 0.05; // 95% success rate
    results.push({
      platform,
      success,
      productId: success ? `${platform.toUpperCase()}-${Math.random().toString(36).substr(2, 8)}` : undefined,
      error: success ? undefined : 'API Connection Timeout'
    });
  }

  return results;
};
