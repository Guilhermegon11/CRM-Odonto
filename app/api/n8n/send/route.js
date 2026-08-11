export async function POST(request) {
  let payload;
  try { payload = await request.json(); } catch { return Response.json({ ok:false,error:'invalid_json' }, {status:400}); }
  if (!payload?.phone || !payload?.text) return Response.json({ok:false,error:'phone_and_text_required'},{status:400});

  const webhook = process.env.N8N_WEBHOOK_URL;
  if (!webhook) return Response.json({ ok:true, forwarded:false, demo:true, message:'N8N_WEBHOOK_URL não configurada' });

  try {
    const response = await fetch(webhook, {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'X-CRM-Secret': process.env.CRM_WEBHOOK_SECRET || '' },
      body:JSON.stringify({ event:'crm.message.send', data:payload, source:'odonto-flow-crm' })
    });
    const text = await response.text();
    return Response.json({ok:response.ok,forwarded:true,status:response.status,n8n:text.slice(0,500)}, {status:response.ok?200:502});
  } catch (error) {
    return Response.json({ok:false,forwarded:false,error:'n8n_unreachable',detail:String(error?.message||error)}, {status:502});
  }
}
