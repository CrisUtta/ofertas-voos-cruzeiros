export const metadata = {
  title: "Ofertas de Voos e Cruzeiros",
  description: "Promoções reais de passagens aéreas e cruzeiros com grandes descontos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
