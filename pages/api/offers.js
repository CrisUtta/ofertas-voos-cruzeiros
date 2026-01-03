import { fetchOffersFromProviders } from "../../lib/fetchOffers";

export default async function handler(req, res) {
  const { type, minDiscount = 50 } = req.query;

  let offers = await fetchOffersFromProviders();

  if (type) {
    offers = offers.filter((o) => o.type === type);
  }

  offers = offers.filter((o) => o.discount >= Number(minDiscount));

  res.status(200).json(offers);
}
