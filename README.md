# OdontoFlow CRM — MVP WhatsApp + n8n

CRM demonstrável para clínica odontológica, pronto para deploy na Vercel.

## O que já funciona no MVP

- Login demonstrativo (`admin@clinica.com` / `123456` — qualquer preenchimento válido entra no modo demo)
- Dashboard com indicadores
- Inbox estilo WhatsApp
- Alternância IA ↔ atendimento humano
- Envio de mensagens em modo demo
- Encaminhamento real de mensagens do CRM para um webhook n8n quando `N8N_WEBHOOK_URL` é configurada
- Cadastro/listagem de pacientes
- Pipeline Kanban com drag-and-drop
- Agenda demonstrativa
- Liga/desliga de automações
- Tela de integrações
- `GET /api/health`
- `POST /api/n8n/inbound`
- `POST /api/n8n/send`
- Schema SQL do Supabase em `supabase/schema.sql`

> Importante: nesta versão de teste os dados visuais são demonstrativos e ficam no navegador. O endpoint inbound valida eventos, mas ainda não persiste mensagens recebidas. O arquivo SQL já prepara a próxima etapa de persistência no Supabase.

## Deploy rápido na Vercel

### Opção A — GitHub
1. Descompacte o projeto.
2. Crie um repositório no GitHub e envie todos os arquivos.
3. Na Vercel, clique em **Add New → Project**.
4. Importe o repositório.
5. Framework detectado: **Next.js**.
6. Clique em **Deploy**.

O CRM abre sem nenhuma variável de ambiente graças ao modo demo.

### Variáveis para ligar o n8n
No projeto da Vercel, abra **Settings → Environment Variables** e crie:

```env
N8N_WEBHOOK_URL=https://SEU-N8N/webhook/crm-send
CRM_WEBHOOK_SECRET=gere-um-segredo-forte
NEXT_PUBLIC_CLINIC_NAME=Nome da sua clínica
```

Depois faça um novo deploy.

## Fluxo 1: CRM → n8n → WhatsApp

Crie no n8n um workflow com **Webhook POST** em algo como `/webhook/crm-send` e copie a URL para `N8N_WEBHOOK_URL`.

O CRM enviará:

```json
{
  "event": "crm.message.send",
  "data": {
    "patientId": 1,
    "phone": "(11) 98842-1090",
    "text": "Olá! Sua consulta está confirmada."
  },
  "source": "odonto-flow-crm"
}
```

No n8n, normalize o telefone e use o node do WhatsApp Business Cloud para enviar a mensagem.

## Fluxo 2: WhatsApp → n8n → CRM

Depois que o n8n receber uma mensagem do WhatsApp, adicione um **HTTP Request**:

- Method: POST
- URL: `https://SEU-DOMINIO.vercel.app/api/n8n/inbound`
- Header: `Authorization: Bearer SEU_CRM_WEBHOOK_SECRET`
- Content-Type: application/json

Payload recomendado:

```json
{
  "event": "message.received",
  "data": {
    "phone": "5511999999999",
    "name": "Maria Silva",
    "type": "text",
    "text": "Quero marcar uma avaliação",
    "whatsappMessageId": "wamid.xxx",
    "timestamp": "2026-08-11T11:30:00Z"
  }
}
```

Neste MVP o endpoint responde `accepted: true`. Na próxima fase, ele fará `upsert` no Supabase e a Inbox será atualizada em tempo real.

## Supabase

O arquivo `supabase/schema.sql` contém a estrutura inicial com RLS para:

- clinics
- profiles
- patients
- conversations
- messages
- appointments
- patient_notes

Quando for ativar persistência:
1. Crie um projeto Supabase.
2. Execute `supabase/schema.sql` no SQL Editor.
3. Configure as variáveis de Supabase do `.env.example` na Vercel.
4. Troque o data provider demo pelo provider Supabase.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Segurança

- Nunca coloque `CRM_WEBHOOK_SECRET` ou `SUPABASE_SERVICE_ROLE_KEY` em variáveis `NEXT_PUBLIC_*`.
- O endpoint `/api/n8n/inbound` exige segredo em produção.
- Para produção com dados reais de saúde, revise LGPD, perfis de acesso, logs e retenção de dados.
