function authorized(request) {
  const configured = process.env.CRM_WEBHOOK_SECRET;
  if (!configured) return process.env.NODE_ENV !== 'production';
  const bearer = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  const header = request.headers.get('x-crm-secret');
  return bearer === configured || header === configured;
}

export async function POST(request) {
  if (!authorized(request)) return Response.json({ ok:false, error:'unauthorized' }, { status:401 });
  let payload;
  try { payload = await request.json(); } catch { return Response.json({ ok:false, error:'invalid_json' }, { status:400 }); }

  // Contrato sugerido para o n8n:
  // { event: 'message.received'|'message.sent'|'patient.updated'|'appointment.created', data: {...} }
  // Neste MVP sem banco, o endpoint valida e confirma o evento. Na etapa Supabase, ele fará o upsert real.
  return Response.json({ ok:true, accepted:true, event:payload?.event || 'unknown', receivedAt:new Date().toISOString(), demo:true });
}
