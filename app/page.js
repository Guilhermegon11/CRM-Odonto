'use client';

import { useEffect, useMemo, useState } from 'react';

const clinicName = process.env.NEXT_PUBLIC_CLINIC_NAME || 'Clínica Sorriso';

const patientsSeed = [
  { id: 1, name: 'Mariana Costa', phone: '(11) 98842-1090', interest: 'Clareamento', source: 'Instagram', stage: 'Novo lead', owner: 'IA', automation: true, last: 'há 2 min', avatar: 'MC', email: 'mariana@email.com' },
  { id: 2, name: 'Ricardo Alves', phone: '(11) 97611-4428', interest: 'Implante', source: 'Google', stage: 'Qualificado', owner: 'Camila', automation: false, last: 'há 8 min', avatar: 'RA', email: 'ricardo@email.com' },
  { id: 3, name: 'Fernanda Lima', phone: '(11) 99400-3812', interest: 'Avaliação', source: 'Indicação', stage: 'Consulta marcada', owner: 'IA', automation: true, last: 'há 21 min', avatar: 'FL', email: 'fernanda@email.com' },
  { id: 4, name: 'João Pedro', phone: '(11) 98331-1200', interest: 'Ortodontia', source: 'Facebook', stage: 'Orçamento', owner: 'Bruna', automation: false, last: 'há 47 min', avatar: 'JP', email: 'joao@email.com' },
  { id: 5, name: 'Aline Martins', phone: '(11) 96702-5519', interest: 'Limpeza', source: 'Site', stage: 'Não respondeu', owner: 'IA', automation: true, last: 'ontem', avatar: 'AM', email: 'aline@email.com' },
  { id: 6, name: 'Carlos Menezes', phone: '(11) 97555-2255', interest: 'Prótese', source: 'Google', stage: 'Tratamento', owner: 'Dr. Paulo', automation: false, last: 'ontem', avatar: 'CM', email: 'carlos@email.com' },
];

const initialMessages = {
  1: [
    { id: 1, side: 'in', text: 'Olá, gostaria de saber quanto custa um clareamento.', time: '08:11' },
    { id: 2, side: 'out', text: 'Olá Mariana! 😊 Claro, posso te ajudar. Você já realizou uma avaliação conosco?', time: '08:11', bot: true },
    { id: 3, side: 'in', text: 'Ainda não. Queria marcar para essa semana.', time: '08:12' },
    { id: 4, side: 'out', text: 'Perfeito. Tenho horários disponíveis na quarta às 10:00 e 14:30. Qual prefere?', time: '08:12', bot: true },
  ],
  2: [
    { id: 1, side: 'in', text: 'Meu dentista falou que talvez eu precise de implante. Vocês fazem?', time: '08:03' },
    { id: 2, side: 'out', text: 'Fazemos sim, Ricardo. Para orientar corretamente, o ideal é uma avaliação com o implantodontista. Posso verificar horários?', time: '08:04' },
  ],
  3: [
    { id: 1, side: 'in', text: 'Quero confirmar minha consulta de amanhã.', time: '07:49' },
    { id: 2, side: 'out', text: 'Confirmado, Fernanda! ✅ Sua avaliação está marcada para amanhã às 15:00.', time: '07:50', bot: true },
  ]
};

const appointmentsSeed = [
  { id: 1, time: '09:00', patient: 'Lucas Barros', procedure: 'Avaliação', professional: 'Dra. Ana', status: 'Confirmado' },
  { id: 2, time: '10:30', patient: 'Mariana Costa', procedure: 'Clareamento', professional: 'Dra. Ana', status: 'A confirmar' },
  { id: 3, time: '13:30', patient: 'Paula Nunes', procedure: 'Limpeza', professional: 'Dr. Paulo', status: 'Confirmado' },
  { id: 4, time: '15:00', patient: 'Fernanda Lima', procedure: 'Avaliação', professional: 'Dr. Paulo', status: 'Confirmado' },
  { id: 5, time: '16:30', patient: 'Bruno Souza', procedure: 'Ortodontia', professional: 'Dra. Ana', status: 'A confirmar' },
];

const stageNames = ['Novo lead', 'Contato iniciado', 'Qualificado', 'Consulta marcada', 'Orçamento', 'Tratamento', 'Finalizado'];
const stageAccent = { 'Novo lead':'#6366f1', 'Contato iniciado':'#f59e0b', 'Qualificado':'#0ea5e9', 'Consulta marcada':'#10b981', 'Orçamento':'#8b5cf6', 'Tratamento':'#14b8a6', 'Finalizado':'#64748b' };

function Icon({ name, size = 18 }) {
  const paths = {
    dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    chat: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/><path d="M8 9h8M8 13h5"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    pipeline: '<rect x="3" y="4" width="5" height="16" rx="2"/><rect x="10" y="4" width="5" height="10" rx="2"/><rect x="17" y="4" width="4" height="13" rx="2"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21H9.6v-.1A1.7 1.7 0 0 0 8 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 3.6 15a1.7 1.7 0 0 0-.6-1A1.7 1.7 0 0 0 1.9 13H2v-4h-.1A1.7 1.7 0 0 0 3.6 8a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 8 3.6a1.7 1.7 0 0 0 1-.6A1.7 1.7 0 0 0 9.6 1.9V2h4v-.1A1.7 1.7 0 0 0 15 3.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 8c.14.37.36.7.65.96.3.26.66.42 1.05.44H21v4h.1c-.39.02-.75.18-1.05.44-.29.26-.51.59-.65.96z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    bot: '<rect x="4" y="6" width="16" height="14" rx="3"/><path d="M12 2v4M8 11h.01M16 11h.01M8 16h8"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0 1 16 0"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    logout: '<path d="M10 17l5-5-5-5M15 12H3M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5"/>',
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{__html: paths[name] || ''}} />;
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@clinica.com');
  const [password, setPassword] = useState('123456');
  return <div className="loginShell">
    <div className="loginVisual">
      <div className="brandMark large">OF</div>
      <h1>Atenda melhor.<br/>Converta mais.</h1>
      <p>CRM de WhatsApp desenvolvido para organizar pacientes, automatizar respostas e transformar conversas em consultas.</p>
      <div className="visualCard">
        <div className="visualBubble left">Olá! Quero marcar uma avaliação 😊</div>
        <div className="visualBubble right">Claro! Tenho horários hoje às 14:30 e 16:00.</div>
        <div className="visualBubble left short">14:30 pode ser!</div>
        <div className="visualSuccess">✓ Consulta agendada automaticamente</div>
      </div>
    </div>
    <div className="loginPanel">
      <form className="loginCard" onSubmit={(e)=>{e.preventDefault(); localStorage.setItem('odonto_crm_session','1'); onLogin();}}>
        <div className="mobileBrand"><div className="brandMark">OF</div><b>OdontoFlow</b></div>
        <div className="eyebrow">ACESSO AO CRM</div>
        <h2>Bem-vindo de volta</h2>
        <p>Entre para acompanhar seus pacientes e atendimentos.</p>
        <label>E-mail</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        <label>Senha</label>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        <button className="primaryBtn loginBtn">Entrar no CRM</button>
        <div className="demoNote"><span>●</span> Modo demonstração ativo — use os dados preenchidos.</div>
      </form>
    </div>
  </div>
}

function AppShell() {
  const [page, setPage] = useState('dashboard');
  const [patients, setPatients] = useState(patientsSeed);
  const [messages, setMessages] = useState(initialMessages);
  const [selectedId, setSelectedId] = useState(1);
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(()=>setAuthenticated(localStorage.getItem('odonto_crm_session') === '1'), []);
  const notify = (text) => { setToast(text); setTimeout(()=>setToast(''), 2600); };
  if (!authenticated) return <Login onLogin={()=>setAuthenticated(true)} />;

  const nav = [
    ['dashboard','dashboard','Visão geral'], ['inbox','chat','Conversas'], ['patients','users','Pacientes'],
    ['pipeline','pipeline','Pipeline'], ['agenda','calendar','Agenda'], ['automations','bolt','Automações'], ['settings','settings','Configurações']
  ];

  return <div className="appShell">
    {toast && <div className="toast"><Icon name="check" size={16}/>{toast}</div>}
    <aside className={'sidebar '+(mobileNav?'open':'')}>
      <div className="sidebarBrand"><div className="brandMark">OF</div><div><b>OdontoFlow</b><small>CRM inteligente</small></div><button className="closeMobile" onClick={()=>setMobileNav(false)}><Icon name="x"/></button></div>
      <div className="clinicMini"><div className="clinicAvatar">CS</div><div><b>{clinicName}</b><small>Unidade principal</small></div></div>
      <nav>{nav.map(([id,icon,label])=><button key={id} className={page===id?'active':''} onClick={()=>{setPage(id);setMobileNav(false)}}><Icon name={icon}/><span>{label}</span>{id==='inbox' && <i>3</i>}</button>)}</nav>
      <div className="sidebarBottom">
        <div className="statusOnline"><span></span> WhatsApp conectado</div>
        <div className="userMini"><div className="avatarSmall">CM</div><div><b>Camila Martins</b><small>Administradora</small></div><button title="Sair" onClick={()=>{localStorage.removeItem('odonto_crm_session');setAuthenticated(false)}}><Icon name="logout" size={17}/></button></div>
      </div>
    </aside>
    <main className="main">
      <header className="topbar"><button className="menuMobile" onClick={()=>setMobileNav(true)}><Icon name="menu"/></button><div className="topSearch"><Icon name="search" size={17}/><input placeholder="Buscar paciente, telefone..." /></div><div className="topActions"><span className="livePill"><i></i> IA ativa</span><div className="avatarSmall">CM</div></div></header>
      {page==='dashboard' && <Dashboard setPage={setPage} patients={patients} />}
      {page==='inbox' && <Inbox patients={patients} setPatients={setPatients} messages={messages} setMessages={setMessages} selectedId={selectedId} setSelectedId={setSelectedId} notify={notify}/>} 
      {page==='patients' && <Patients patients={patients} setPatients={setPatients} notify={notify} />}
      {page==='pipeline' && <Pipeline patients={patients} setPatients={setPatients} notify={notify}/>} 
      {page==='agenda' && <Agenda notify={notify}/>} 
      {page==='automations' && <Automations notify={notify}/>} 
      {page==='settings' && <Settings notify={notify}/>} 
    </main>
  </div>
}

function PageHead({ eyebrow, title, subtitle, action }) { return <div className="pageHead"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div> }

function Dashboard({ setPage, patients }) {
  const cards = [
    ['Novos leads','12','+18%','users','vs. semana passada'], ['Conversas abertas','8','3 aguardando','chat','precisam de atenção'], ['Consultas hoje','17','14 confirmadas','calendar','82% de confirmação'], ['Taxa de agendamento','38%','+6,4%','pipeline','últimos 30 dias']
  ];
  return <div className="pageContent">
    <PageHead eyebrow="TERÇA-FEIRA, 11 DE AGOSTO" title="Bom dia, Camila 👋" subtitle="Aqui está o que está acontecendo na clínica hoje." action={<button className="primaryBtn" onClick={()=>setPage('inbox')}><Icon name="chat" size={17}/>Abrir conversas</button>}/>
    <div className="metricGrid">{cards.map((c,i)=><div className="metricCard" key={c[0]}><div className="metricIcon"><Icon name={c[3]}/></div><span>{c[0]}</span><strong>{c[1]}</strong><div className={i===0||i===3?'positive':'neutral'}>{c[2]} <small>{c[4]}</small></div></div>)}</div>
    <div className="dashboardGrid">
      <section className="card recentCard"><div className="cardHead"><div><h3>Conversas recentes</h3><p>Últimos contatos recebidos pelo WhatsApp</p></div><button className="linkBtn" onClick={()=>setPage('inbox')}>Ver todas <Icon name="chevron" size={15}/></button></div>
        <div className="recentList">{patients.slice(0,5).map((p,i)=><div className="recentRow" key={p.id}><div className={'avatar person c'+i}>{p.avatar}</div><div className="grow"><b>{p.name}</b><span>{i===0?'Queria marcar para essa semana.':'Tenho uma dúvida sobre '+p.interest.toLowerCase()+'.'}</span></div><div className="recentMeta"><small>{p.last}</small><span className="stageTag">{p.stage}</span></div></div>)}</div>
      </section>
      <section className="card todayCard"><div className="cardHead"><div><h3>Agenda de hoje</h3><p>Próximos atendimentos</p></div><button className="linkBtn" onClick={()=>setPage('agenda')}>Agenda <Icon name="chevron" size={15}/></button></div>
        <div className="timeline">{appointmentsSeed.slice(0,4).map(a=><div className="timelineItem" key={a.id}><div className="time">{a.time}</div><div className="line"><i></i></div><div className="appt"><b>{a.patient}</b><span>{a.procedure} • {a.professional}</span><em className={a.status==='Confirmado'?'confirmed':''}>{a.status}</em></div></div>)}</div>
      </section>
    </div>
    <section className="card performance"><div className="cardHead"><div><h3>Funil de atendimento</h3><p>Distribuição dos pacientes ativos</p></div><span className="softPill">Últimos 30 dias</span></div>
      <div className="funnelBars">{[['Novos leads',42,100],['Qualificados',31,74],['Agendados',23,55],['Compareceram',18,43],['Tratamento',11,26]].map((f,i)=><div className="funnelRow" key={f[0]}><span>{f[0]}</span><div className="bar"><i style={{width:f[2]+'%'}}></i></div><b>{f[1]}</b></div>)}</div>
    </section>
  </div>
}

function Inbox({patients,setPatients,messages,setMessages,selectedId,setSelectedId,notify}) {
  const p = patients.find(x=>x.id===selectedId) || patients[0];
  const [text,setText] = useState('');
  const list = messages[selectedId] || [{id:1,side:'in',text:'Olá! Gostaria de receber mais informações.',time:'08:00'}];
  const send = async () => {
    if(!text.trim()) return;
    const body=text.trim();
    setMessages(prev=>({...prev,[selectedId]:[...(prev[selectedId]||[]),{id:Date.now(),side:'out',text:body,time:new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}]})); setText('');
    try { const r=await fetch('/api/n8n/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({patientId:p.id,phone:p.phone,text:body})}); const j=await r.json(); notify(j.forwarded?'Mensagem enviada ao n8n':'Mensagem salva em modo demonstração'); } catch { notify('Mensagem adicionada no modo demonstração'); }
  };
  const toggleAutomation=()=>{setPatients(ps=>ps.map(x=>x.id===p.id?{...x,automation:!x.automation,owner:x.automation?'Camila':'IA'}:x));notify(p.automation?'Atendimento assumido por humano':'Conversa devolvida para a automação')};
  return <div className="inboxPage">
    <div className="conversationList"><div className="convTitle"><h2>Conversas</h2><button><Icon name="plus" size={17}/></button></div><div className="convSearch"><Icon name="search" size={16}/><input placeholder="Buscar conversa..."/></div><div className="filterTabs"><button className="active">Todas</button><button>Não lidas <i>3</i></button><button>IA</button></div>
      <div className="conversationScroll">{patients.map((x,i)=><button key={x.id} onClick={()=>setSelectedId(x.id)} className={'conversationItem '+(x.id===selectedId?'selected':'')}><div className={'avatar person c'+i}>{x.avatar}<i className="onlineDot"></i></div><div className="grow"><div><b>{x.name}</b><small>{x.last}</small></div><span>{i===0?'Queria marcar para essa semana.':'Tenho uma dúvida sobre '+x.interest.toLowerCase()+'.'}</span><div className="convBadges"><em>{x.interest}</em>{x.automation&&<em className="botBadge">IA</em>}</div></div></button>)}</div>
    </div>
    <div className="chatPane"><div className="chatHeader"><div className="avatar person">{p.avatar}</div><div className="grow"><b>{p.name}</b><span><i></i> WhatsApp • {p.phone}</span></div><button className="iconBtn"><Icon name="phone"/></button><button className="humanBtn" onClick={toggleAutomation}>{p.automation?<><Icon name="user" size={16}/>Assumir conversa</>:<><Icon name="bot" size={16}/>Devolver para IA</>}</button></div>
      <div className="chatBody"><div className="dayDivider">Hoje</div>{list.map(m=><div key={m.id} className={'messageWrap '+m.side}><div className="bubble">{m.bot&&<div className="botLabel"><Icon name="bot" size={12}/> Assistente IA</div>}<p>{m.text}</p><small>{m.time} {m.side==='out'&&'✓✓'}</small></div></div>)}</div>
      <div className="composer"><button className="attach">＋</button><textarea value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}} placeholder={p.automation?'Digite uma mensagem (envio manual)...':'Digite sua mensagem...'} /><button className="sendBtn" onClick={send}><Icon name="send" size={18}/></button></div>
    </div>
    <aside className="contactPanel"><div className="contactHero"><div className="avatar person largeAvatar">{p.avatar}</div><h3>{p.name}</h3><p>{p.phone}</p><div className="contactActions"><button><Icon name="chat" size={16}/><span>Mensagem</span></button><button><Icon name="phone" size={16}/><span>Ligar</span></button><button><Icon name="calendar" size={16}/><span>Agendar</span></button></div></div>
      <div className="infoSection"><div className="infoTitle">Dados do paciente <button>Editar</button></div><Info label="Interesse" value={p.interest}/><Info label="Origem" value={p.source}/><Info label="Etapa" value={p.stage}/><Info label="Responsável" value={p.owner}/></div>
      <div className="infoSection"><div className="infoTitle">Automação</div><div className={'automationStatus '+(p.automation?'on':'off')}><div><Icon name={p.automation?'bot':'user'} size={18}/><span><b>{p.automation?'IA respondendo':'Atendimento humano'}</b><small>{p.automation?'Respostas automáticas ativas':'Automação pausada'}</small></span></div><button onClick={toggleAutomation} className={'switch '+(p.automation?'on':'')}><i></i></button></div></div>
      <div className="infoSection"><div className="infoTitle">Notas <button>+ Adicionar</button></div><div className="note">Paciente interessado em {p.interest.toLowerCase()}. Priorizar retorno ainda hoje.<small>Camila • hoje</small></div></div>
    </aside>
  </div>
}

function Info({label,value}) { return <div className="infoRow"><span>{label}</span><b>{value}</b></div> }

function Patients({patients,setPatients,notify}) {
  const [query,setQuery]=useState('');
  const filtered=patients.filter(p=>(p.name+p.phone+p.interest).toLowerCase().includes(query.toLowerCase()));
  return <div className="pageContent"><PageHead eyebrow="BASE DE CONTATOS" title="Pacientes" subtitle="Gerencie cadastros, interesses e histórico de relacionamento." action={<button className="primaryBtn" onClick={()=>notify('Cadastro rápido será conectado ao banco na próxima etapa')}><Icon name="plus" size={17}/>Novo paciente</button>}/>
    <section className="card tableCard"><div className="tableToolbar"><div className="convSearch patientSearch"><Icon name="search" size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar por nome, telefone ou interesse..."/></div><button className="outlineBtn">Todos os pacientes ▾</button></div>
      <div className="dataTable"><div className="tr th"><div>Paciente</div><div>Interesse</div><div>Origem</div><div>Etapa</div><div>Responsável</div><div>Último contato</div></div>{filtered.map((p,i)=><div className="tr" key={p.id}><div className="patientCell"><div className={'avatar person c'+i}>{p.avatar}</div><span><b>{p.name}</b><small>{p.phone}</small></span></div><div>{p.interest}</div><div><span className="sourcePill">{p.source}</span></div><div><span className="stageTag">{p.stage}</span></div><div>{p.owner}</div><div>{p.last}</div></div>)}</div>
    </section>
  </div>
}

function Pipeline({patients,setPatients,notify}) {
  const [dragId,setDragId]=useState(null);
  const move=(stage)=>{if(!dragId)return; setPatients(ps=>ps.map(p=>p.id===dragId?{...p,stage}:p)); setDragId(null); notify('Paciente movido para '+stage)};
  return <div className="pageContent pipelinePage"><PageHead eyebrow="FUNIL COMERCIAL" title="Pipeline" subtitle="Acompanhe cada paciente do primeiro contato ao tratamento." action={<button className="primaryBtn"><Icon name="plus" size={17}/>Adicionar oportunidade</button>}/>
    <div className="kanban">{stageNames.map(stage=>{const items=patients.filter(p=>p.stage===stage);return <div className="kanbanCol" key={stage} onDragOver={e=>e.preventDefault()} onDrop={()=>move(stage)}><div className="kanbanHead"><span><i style={{background:stageAccent[stage]}}></i>{stage}</span><b>{items.length}</b></div><div className="kanbanCards">{items.map(p=><div draggable onDragStart={()=>setDragId(p.id)} className="kanbanCard" key={p.id}><div className="kanbanTop"><div className="avatar person">{p.avatar}</div><span><b>{p.name}</b><small>{p.phone}</small></span></div><div className="kanbanInfo"><span>Interesse</span><b>{p.interest}</b></div><div className="kanbanFoot"><span>{p.source}</span><small>{p.last}</small></div></div>)}</div><button className="addKanban">＋ Adicionar</button></div>})}</div>
  </div>
}

function Agenda({notify}) {
  const [selectedDay,setSelectedDay]=useState(11);
  const days=[10,11,12,13,14,15,16]; const week=['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
  return <div className="pageContent"><PageHead eyebrow="AGENDA CLÍNICA" title="Agenda" subtitle="Consultas, confirmações e disponibilidade da equipe." action={<button className="primaryBtn" onClick={()=>notify('Nova consulta aberta em modo demonstração')}><Icon name="plus" size={17}/>Nova consulta</button>}/>
    <div className="agendaGrid"><section className="card calendarCard"><div className="calendarTop"><button>‹</button><div><h3>Agosto 2026</h3><p>Semana de 10 a 16 de agosto</p></div><button>›</button></div><div className="weekStrip">{days.map((d,i)=><button className={selectedDay===d?'active':''} onClick={()=>setSelectedDay(d)} key={d}><span>{week[i]}</span><b>{d}</b>{d===11&&<i></i>}</button>)}</div><div className="scheduleList"><div className="scheduleTitle"><b>Terça-feira, {selectedDay} de agosto</b><span>{appointmentsSeed.length} consultas</span></div>{appointmentsSeed.map(a=><div className="scheduleRow" key={a.id}><div className="scheduleTime">{a.time}</div><div className="scheduleBlock"><div><b>{a.patient}</b><span>{a.procedure} • {a.professional}</span></div><em className={a.status==='Confirmado'?'confirmed':''}>{a.status}</em></div></div>)}</div></section>
      <aside className="card agendaSide"><h3>Resumo do dia</h3><div className="summaryNumber"><strong>17</strong><span>consultas<br/>agendadas</span></div><div className="miniStats"><div><i className="green"></i><span><b>14</b> Confirmadas</span></div><div><i className="yellow"></i><span><b>3</b> A confirmar</span></div><div><i className="red"></i><span><b>0</b> Canceladas</span></div></div><hr/><h4>Profissionais</h4><div className="professional"><div className="avatar person">DA</div><span><b>Dra. Ana Ribeiro</b><small>9 consultas</small></span></div><div className="professional"><div className="avatar person">DP</div><span><b>Dr. Paulo Mendes</b><small>8 consultas</small></span></div></aside>
    </div>
  </div>
}

function Automations({notify}) {
  const seed=[
    ['Boas-vindas e triagem','Responde novos contatos, identifica intenção e coleta os dados iniciais.','Novo contato',true,'bot'],
    ['Confirmação de consulta','Solicita confirmação automática 24 horas antes do horário marcado.','24h antes',true,'calendar'],
    ['Lembrete de consulta','Envia um lembrete curto 2 horas antes do atendimento.','2h antes',true,'clock'],
    ['Paciente não compareceu','Inicia fluxo de recuperação e oferece reagendamento.','Após falta',false,'users'],
    ['Orçamento pendente','Faz follow-up de pacientes que receberam orçamento e ainda não fecharam.','Após 3 dias',true,'pipeline'],
    ['Pós-atendimento','Envia mensagem de cuidado e orienta o paciente a falar com a equipe se precisar.','2h após',false,'chat']
  ];
  const [flows,setFlows]=useState(seed);
  const toggle=(i)=>{setFlows(f=>f.map((x,idx)=>idx===i?[...x.slice(0,3),!x[3],x[4]]:x));notify(flows[i][3]?'Automação pausada':'Automação ativada')};
  return <div className="pageContent"><PageHead eyebrow="AUTOMAÇÕES N8N" title="Automações" subtitle="Controle os principais fluxos que atendem seus pacientes automaticamente." action={<button className="primaryBtn" onClick={()=>notify('Crie o workflow no n8n e conecte pelo Webhook')}><Icon name="plus" size={17}/>Nova automação</button>}/>
    <div className="automationGrid">{flows.map((f,i)=><div className="automationCard card" key={f[0]}><div className="flowTop"><div className="flowIcon"><Icon name={f[4]}/></div><button onClick={()=>toggle(i)} className={'switch '+(f[3]?'on':'')}><i></i></button></div><h3>{f[0]}</h3><p>{f[1]}</p><div className="flowBottom"><span><Icon name="bolt" size={14}/>{f[2]}</span><em className={f[3]?'active':''}>{f[3]?'Ativa':'Pausada'}</em></div></div>)}</div>
    <section className="integrationBanner"><div className="integrationIcon"><span>n8n</span></div><div><h3>Integração com n8n preparada</h3><p>Use o endpoint <code>/api/n8n/inbound</code> para alimentar o CRM e <code>/api/n8n/send</code> para o CRM solicitar envios ao seu workflow.</p></div><button className="outlineBtn" onClick={()=>notify('Veja o README incluído no projeto')}>Ver configuração</button></section>
  </div>
}

function Settings({notify}) {
  const [name,setName]=useState(clinicName); const [phone,setPhone]=useState('+55 11 99999-9999');
  return <div className="pageContent"><PageHead eyebrow="PREFERÊNCIAS" title="Configurações" subtitle="Ajuste dados da clínica e prepare suas integrações." />
    <div className="settingsGrid"><section className="card settingsCard"><div className="settingsTitle"><div className="flowIcon"><Icon name="settings"/></div><div><h3>Dados da clínica</h3><p>Informações utilizadas no CRM e nas automações.</p></div></div><label>Nome da clínica</label><input value={name} onChange={e=>setName(e.target.value)}/><label>WhatsApp principal</label><input value={phone} onChange={e=>setPhone(e.target.value)}/><label>E-mail de atendimento</label><input defaultValue="contato@clinicasorriso.com.br"/><button className="primaryBtn" onClick={()=>notify('Configurações salvas em modo demonstração')}>Salvar alterações</button></section>
      <section className="card settingsCard"><div className="settingsTitle"><div className="flowIcon n8nIcon">n8n</div><div><h3>Conexão n8n</h3><p>Status da automação externa.</p></div></div><div className="connectionBox"><span className="connectionDot"></span><div><b>Endpoint do CRM disponível</b><small>POST /api/n8n/inbound</small></div></div><label>Webhook de envio do n8n</label><div className="codeBox">N8N_WEBHOOK_URL</div><label>Segredo da integração</label><div className="codeBox">CRM_WEBHOOK_SECRET</div><p className="helpText">Cadastre as duas variáveis acima em <b>Vercel → Settings → Environment Variables</b>. O segredo nunca deve ficar no navegador.</p><button className="outlineBtn full" onClick={async()=>{const r=await fetch('/api/health'); const j=await r.json(); notify(j.ok?'API do CRM respondendo normalmente':'Falha na API')}}>Testar API do CRM</button></section>
      <section className="card settingsCard span2"><div className="settingsTitle"><div className="flowIcon"><Icon name="chat"/></div><div><h3>WhatsApp Business</h3><p>O WhatsApp deve ficar conectado ao n8n; o CRM recebe os eventos já normalizados.</p></div><span className="statusConnected">● Estrutura pronta</span></div><div className="steps"><div><b>1</b><span><strong>WhatsApp Cloud API</strong><small>Recebe a mensagem do paciente.</small></span></div><i>→</i><div><b>2</b><span><strong>n8n</strong><small>Classifica, responde e chama o CRM.</small></span></div><i>→</i><div><b>3</b><span><strong>OdontoFlow CRM</strong><small>Exibe conversa, paciente e etapa.</small></span></div></div></section>
    </div>
  </div>
}

export default function Home(){ return <AppShell/> }
