import { fetchOffersFromProviders } from "@/lib/fetchOffers";

export async function GET(request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const minDiscount = Number(url.searchParams.get("minDiscount") || 50);

  let offers = await fetchOffersFromProviders();

  if (type) {
    offers = offers.filter((o) => o.type === type);
  }

  offers = offers.filter((o) => o.discount >= minDiscount);

  return Response.json(offers, { status: 200 });
}
