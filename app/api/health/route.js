export async function GET() {
  return Response.json({ ok: true, service: 'odonto-whatsapp-crm', timestamp: new Date().toISOString() });
}
