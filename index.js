import { useEffect, useState } from "react";

export default function Home() {
  const [offers, setOffers] = useState([]);
  const [type, setType] = useState("");
  const [minDiscount, setMinDiscount] = useState(50);

  async function loadOffers() {
    let url = `/api/offers?minDiscount=${minDiscount}`;
    if (type) url += `&type=${type}`;

    const res = await fetch(url);
    const data = await res.json();
    setOffers(data);
  }

  useEffect(() => {
    loadOffers();
  }, [type, minDiscount]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Promoções Reais de Voos ✈️ e Cruzeiros 🚢</h1>
      <p>Descontos somente entre 50% e 90%, verificados automaticamente.</p>

      <div style={{ marginTop: 20 }}>
        <label>
          Tipo:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Todos</option>
            <option value="flight">Voos</option>
            <option value="cruise">Cruzeiros</option>
          </select>
        </label>

        <label style={{ marginLeft: 20 }}>
          Desconto mínimo:
          <input
            type="number"
            value={minDiscount}
            min={50}
            max={90}
            onChange={(e) => setMinDiscount(e.target.value)}
          />
        </label>
      </div>

      <table border="1" style={{ width: "100%", marginTop: 20 }}>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Rota</th>
            <th>Preço Original</th>
            <th>Preço Atual</th>
            <th>Desconto</th>
            <th>Link Oficial</th>
          </tr>
        </thead>

        <tbody>
          {offers.length === 0 && (
            <tr>
              <td colSpan="6">Nenhuma oferta encontrada agora.</td>
            </tr>
          )}

          {offers.map((o) => (
            <tr key={o.id}>
              <td>{o.type === "flight" ? "Voo" : "Cruzeiro"}</td>
              <td>
                {o.type === "flight"
                  ? `${o.origin} → ${o.destination}`
                  : `${o.originPort} → ${o.destinationPort}`}
              </td>
              <td>R$ {o.originalPrice}</td>
              <td>R$ {o.currentPrice}</td>
              <td>{o.discount}%</td>
              <td>
                <a href={o.url} target="_blank">Ver Oferta</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
