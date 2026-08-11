import './globals.css';

export const metadata = {
  title: 'OdontoFlow CRM',
  description: 'CRM de WhatsApp para clínica odontológica com integração n8n',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
