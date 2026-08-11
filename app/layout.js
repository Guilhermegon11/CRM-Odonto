import './globals.css';

export const metadata = {
  title: 'Facciale Odontologia Avançada | CRM',
  description: 'CRM de atendimento e WhatsApp da Facciale Odontologia Avançada',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
