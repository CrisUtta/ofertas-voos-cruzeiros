export async function fetchOffersFromProviders() {
  const raw = [
    {
      id: "1",
      type: "flight",
      provider: "Avianca",
      origin: "GRU",
      destination: "BOG",
      originalPrice: 5400,
      currentPrice: 2100,
      url: "https://www.avianca.com",
      validUntil: Date.now() + 86400000
    },
    {
      id: "2",
      type: "cruise",
      provider: "MSC Cruzeiros",
      originPort: "Santos",
      destinationPort: "Búzios",
      originalPrice: 4000,
      currentPrice: 1800,
      url: "https://www.msccruzeiros.com.br",
      validUntil: Date.now() + 86400000
    }
  ];

  const validate = (o) => {
    const discount = Math.round(
      ((o.originalPrice - o.currentPrice) / o.originalPrice) * 100
    );

    if (discount < 50 || discount > 90) return null;
    if (!o.url.startsWith("https://")) return null;
    if (o.validUntil < Date.now()) return null;

    return {
      ...o,
      discount,
      lastChecked: Date.now()
    };
  };

  return raw.map(validate).filter(Boolean);
}
