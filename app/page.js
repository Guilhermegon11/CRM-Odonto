'use client';

import { useEffect, useState } from 'react';

const clinicName = process.env.NEXT_PUBLIC_CLINIC_NAME || 'Facciale Odontologia Avançada';
const DEMO_TODAY = '2026-08-11';

const patientsSeed = [
  { id: 1, name: 'Mariana Costa', phone: '(11) 98842-1090', interest: 'Clareamento', source: 'Instagram', stage: 'Novo lead', owner: 'IA', automation: true, last: 'há 2 min', avatar: 'MC', email: 'mariana@email.com', notes: 'Prefere atendimento no período da tarde.' },
  { id: 2, name: 'Ricardo Alves', phone: '(11) 97611-4428', interest: 'Implante', source: 'Google', stage: 'Qualificado', owner: 'Camila', automation: false, last: 'há 8 min', avatar: 'RA', email: 'ricardo@email.com', notes: '' },
  { id: 3, name: 'Fernanda Lima', phone: '(11) 99400-3812', interest: 'Avaliação', source: 'Indicação', stage: 'Consulta marcada', owner: 'IA', automation: true, last: 'há 21 min', avatar: 'FL', email: 'fernanda@email.com', notes: '' },
  { id: 4, name: 'João Pedro', phone: '(11) 98331-1200', interest: 'Ortodontia', source: 'Facebook', stage: 'Orçamento', owner: 'Bruna', automation: false, last: 'há 47 min', avatar: 'JP', email: 'joao@email.com', notes: '' },
  { id: 5, name: 'Aline Martins', phone: '(11) 96702-5519', interest: 'Limpeza', source: 'Site', stage: 'Não respondeu', owner: 'IA', automation: true, last: 'ontem', avatar: 'AM', email: 'aline@email.com', notes: '' },
  { id: 6, name: 'Carlos Menezes', phone: '(11) 97555-2255', interest: 'Prótese', source: 'Google', stage: 'Tratamento', owner: 'Dr. Paulo', automation: false, last: 'ontem', avatar: 'CM', email: 'carlos@email.com', notes: '' },
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
  { id: 1, date: DEMO_TODAY, time: '09:00', patientId: null, patient: 'Lucas Barros', procedure: 'Avaliação', professional: 'Dra. Ana Ribeiro', status: 'Confirmado', notes: '' },
  { id: 2, date: DEMO_TODAY, time: '10:30', patientId: 1, patient: 'Mariana Costa', procedure: 'Clareamento', professional: 'Dra. Ana Ribeiro', status: 'A confirmar', notes: '' },
  { id: 3, date: DEMO_TODAY, time: '13:30', patientId: null, patient: 'Paula Nunes', procedure: 'Limpeza', professional: 'Dr. Paulo Mendes', status: 'Confirmado', notes: '' },
  { id: 4, date: DEMO_TODAY, time: '15:00', patientId: 3, patient: 'Fernanda Lima', procedure: 'Avaliação', professional: 'Dr. Paulo Mendes', status: 'Confirmado', notes: '' },
  { id: 5, date: DEMO_TODAY, time: '16:30', patientId: null, patient: 'Bruno Souza', procedure: 'Ortodontia', professional: 'Dra. Ana Ribeiro', status: 'A confirmar', notes: '' },
];

const stageNames = ['Novo lead', 'Contato iniciado', 'Qualificado', 'Consulta marcada', 'Orçamento', 'Tratamento', 'Finalizado'];
const stageAccent = { 'Novo lead':'#1696d2', 'Contato iniciado':'#f2a12c', 'Qualificado':'#2279c9', 'Consulta marcada':'#19a974', 'Orçamento':'#7067d8', 'Tratamento':'#0d8fa8', 'Finalizado':'#708090' };
const interests = ['Avaliação', 'Clareamento', 'Implante', 'Ortodontia', 'Limpeza', 'Prótese', 'Facetas', 'Endodontia', 'Odontopediatria', 'Outro'];
const sources = ['WhatsApp', 'Instagram', 'Google', 'Facebook', 'Site', 'Indicação', 'Outro'];
const professionals = ['Dra. Ana Ribeiro', 'Dr. Paulo Mendes', 'Dra. Beatriz Lima'];

function avatarFromName(name='') {
  return name.trim().split(/\s+/).slice(0,2).map(x=>x[0] || '').join('').toUpperCase() || 'PA';
}

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
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v5M14 11v5"/>',
    note: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{__html: paths[name] || ''}} />;
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@clinica.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);

  return <div className="loginShell premiumLogin">
    <section className="loginHero">
      <div className="loginHeroGlow glowOne"></div>
      <div className="loginHeroGlow glowTwo"></div>
      <div className="loginHeroGrid"></div>
      <div className="loginHeroTop">
        <div className="loginBrandLockup"><div className="loginLogoMark"><span className="toothGlyph">✦</span></div><div><strong>Facciale</strong><small>Odontologia Avançada</small></div></div>
        <div className="loginSecureBadge"><span></span> Ambiente seguro</div>
      </div>
      <div className="loginHeroContent">
        <div className="loginEyebrowPill">ATENDIMENTO + AUTOMAÇÃO</div>
        <h1>Seu WhatsApp virou uma <span>central de atendimento.</span></h1>
        <p>Organize pacientes, agenda e oportunidades em uma experiência criada para clínicas odontológicas.</p>
        <div className="loginFeatureRow">
          <div><i>01</i><span><b>Inbox unificada</b><small>Todas as conversas em um só lugar</small></span></div>
          <div><i>02</i><span><b>Agenda clínica</b><small>Cadastre e confirme consultas</small></span></div>
          <div><i>03</i><span><b>IA + humano</b><small>Troca de atendimento em um clique</small></span></div>
        </div>
        <div className="loginPreviewCard">
          <div className="previewTopbar"><div className="previewContact"><div className="previewAvatar">MC</div><div><b>Mariana Costa</b><small><span></span> WhatsApp • agora</small></div></div><div className="previewTag">Novo lead</div></div>
          <div className="previewConversation"><div className="previewBubble received">Olá! Gostaria de marcar uma avaliação 😊<time>09:18</time></div><div className="previewBubble sent">Claro, Mariana! Tenho dois horários disponíveis para hoje. Quer ver?<time>09:18 · IA</time></div></div>
          <div className="previewFooter"><div className="previewStatus"><span>✓</span><div><b>Lead respondido em 4s</b><small>Automação n8n ativa</small></div></div><div className="previewPulse"><span></span> online</div></div>
        </div>
      </div>
      <div className="loginHeroFooter">Atendimento mais rápido, agenda organizada e visão completa da jornada do paciente.</div>
    </section>

    <section className="loginPanel">
      <form className="loginCard premiumCard" onSubmit={(e)=>{e.preventDefault(); localStorage.setItem('odonto_crm_session','1'); onLogin();}}>
        <div className="mobileLoginBrand"><div className="loginLogoMark"><span className="toothGlyph">✦</span></div><div><strong>Facciale</strong><small>Odontologia Avançada</small></div></div>
        <div className="loginFormIntro"><div className="loginMiniIcon"><Icon name="user" size={18}/></div><div className="eyebrow">ÁREA RESTRITA</div><h2>Bem-vindo de volta</h2><p>Acesse a central de atendimento da Facciale Odontologia Avançada.</p></div>
        <div className="loginFieldGroup"><label htmlFor="login-email">E-mail</label><div className="loginInputWrap"><span className="inputIcon">@</span><input id="login-email" value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="seuemail@clinica.com" required /></div></div>
        <div className="loginFieldGroup"><div className="loginLabelRow"><label htmlFor="login-password">Senha</label><button className="loginLinkBtn" type="button">Esqueci minha senha</button></div><div className="loginInputWrap"><span className="inputIcon">●</span><input id="login-password" value={password} onChange={e=>setPassword(e.target.value)} type={showPassword?'text':'password'} required /><button className="passwordToggle" type="button" onClick={()=>setShowPassword(v=>!v)}>{showPassword?'Ocultar':'Mostrar'}</button></div></div>
        <div className="loginOptionsRow"><label className="rememberCheck"><input type="checkbox" defaultChecked/> Lembrar acesso</label></div>
        <button className="loginSubmitBtn" type="submit">ENTRAR NO CRM <Icon name="chevron" size={15}/></button>
        <div className="loginDemoBox"><div className="demoIcon">D</div><div><b>Modo demonstração</b><small>Os dados já estão preenchidos para você entrar e testar.</small></div></div>
        <div className="loginTrustLine"><span>🔒</span> Seus dados de acesso são protegidos.</div>
      </form>
    </section>
  </div>;
}

function Modal({open,onClose,title,subtitle,children,size='medium'}) {
  useEffect(()=>{
    if(!open) return;
    const handler=(e)=>{ if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown',handler);
    return ()=>window.removeEventListener('keydown',handler);
  },[open,onClose]);
  if(!open) return null;
  return <div className="modalBackdrop" onMouseDown={e=>{if(e.target===e.currentTarget) onClose();}}>
    <div className={'modalCard '+size}>
      <div className="modalHeader"><div><div className="modalEyebrow">FACCIALE CRM</div><h2>{title}</h2>{subtitle&&<p>{subtitle}</p>}</div><button className="modalClose" onClick={onClose}><Icon name="x" size={18}/></button></div>
      {children}
    </div>
  </div>;
}

function PatientModal({state,onClose,onSave}) {
  const isEdit=Boolean(state?.patient);
  const patient=state?.patient;
  const [form,setForm]=useState({});
  useEffect(()=>{
    if(!state?.open) return;
    setForm(patient ? {...patient} : {name:'',phone:'',email:'',interest:'Avaliação',source:'WhatsApp',stage:state?.initialStage || 'Novo lead',owner:'IA',automation:true,notes:''});
  },[state?.open, patient, state?.initialStage]);
  const set=(key,value)=>setForm(f=>({...f,[key]:value}));
  const submit=(e)=>{e.preventDefault(); if(!form.name?.trim() || !form.phone?.trim()) return; onSave(form);};
  return <Modal open={state?.open} onClose={onClose} title={isEdit?'Editar paciente':'Novo paciente'} subtitle={isEdit?'Atualize os dados do cadastro.':'Cadastre o paciente e coloque-o imediatamente no funil.'} size="large">
    <form onSubmit={submit}>
      <div className="modalBody">
        <div className="formGrid two">
          <Field label="Nome completo" required><input value={form.name||''} onChange={e=>set('name',e.target.value)} placeholder="Ex.: Maria da Silva" required/></Field>
          <Field label="WhatsApp" required><input value={form.phone||''} onChange={e=>set('phone',e.target.value)} placeholder="(11) 99999-9999" required/></Field>
          <Field label="E-mail"><input value={form.email||''} onChange={e=>set('email',e.target.value)} type="email" placeholder="paciente@email.com"/></Field>
          <Field label="Interesse"><select value={form.interest||'Avaliação'} onChange={e=>set('interest',e.target.value)}>{interests.map(x=><option key={x}>{x}</option>)}</select></Field>
          <Field label="Origem"><select value={form.source||'WhatsApp'} onChange={e=>set('source',e.target.value)}>{sources.map(x=><option key={x}>{x}</option>)}</select></Field>
          <Field label="Etapa do funil"><select value={form.stage||'Novo lead'} onChange={e=>set('stage',e.target.value)}>{stageNames.map(x=><option key={x}>{x}</option>)}<option>Não respondeu</option></select></Field>
          <Field label="Responsável"><select value={form.owner||'IA'} onChange={e=>set('owner',e.target.value)}><option>IA</option><option>Camila</option><option>Bruna</option><option>Dra. Ana Ribeiro</option><option>Dr. Paulo Mendes</option></select></Field>
          <Field label="Automação"><select value={form.automation?'Ativa':'Pausada'} onChange={e=>set('automation',e.target.value==='Ativa')}><option>Ativa</option><option>Pausada</option></select></Field>
          <Field label="Observações" full><textarea rows="3" value={form.notes||''} onChange={e=>set('notes',e.target.value)} placeholder="Preferências de horário, observações administrativas..."/></Field>
        </div>
      </div>
      <div className="modalFooter"><button type="button" className="outlineBtn" onClick={onClose}>Cancelar</button><button className="primaryBtn" type="submit"><Icon name="check" size={16}/>{isEdit?'Salvar alterações':'Cadastrar paciente'}</button></div>
    </form>
  </Modal>;
}

function AppointmentModal({state,onClose,onSave,patients}) {
  const isEdit=Boolean(state?.appointment);
  const appointment=state?.appointment;
  const [form,setForm]=useState({});
  useEffect(()=>{
    if(!state?.open) return;
    setForm(appointment ? {...appointment,patientId: appointment.patientId ?? ''} : {patientId:state?.patientId || '',date:DEMO_TODAY,time:'09:00',procedure:'Avaliação',professional:professionals[0],status:'A confirmar',notes:''});
  },[state?.open, appointment, state?.patientId]);
  const set=(key,value)=>setForm(f=>({...f,[key]:value}));
  const submit=(e)=>{
    e.preventDefault();
    const selected=patients.find(p=>String(p.id)===String(form.patientId));
    if(!selected || !form.date || !form.time || !form.procedure) return;
    onSave({...form,patientId:selected.id,patient:selected.name});
  };
  return <Modal open={state?.open} onClose={onClose} title={isEdit?'Editar consulta':'Agendar consulta'} subtitle="Defina paciente, data, horário e profissional responsável." size="large">
    <form onSubmit={submit}>
      <div className="modalBody">
        <div className="formGrid two">
          <Field label="Paciente" required full><select value={form.patientId??''} onChange={e=>set('patientId',e.target.value)} required><option value="">Selecione um paciente</option>{patients.map(p=><option value={p.id} key={p.id}>{p.name} — {p.phone}</option>)}</select></Field>
          <Field label="Data" required><input type="date" value={form.date||''} onChange={e=>set('date',e.target.value)} required/></Field>
          <Field label="Horário" required><input type="time" value={form.time||''} onChange={e=>set('time',e.target.value)} required/></Field>
          <Field label="Procedimento" required><select value={form.procedure||'Avaliação'} onChange={e=>set('procedure',e.target.value)}>{interests.filter(x=>x!=='Outro').map(x=><option key={x}>{x}</option>)}</select></Field>
          <Field label="Profissional"><select value={form.professional||professionals[0]} onChange={e=>set('professional',e.target.value)}>{professionals.map(x=><option key={x}>{x}</option>)}</select></Field>
          <Field label="Status"><select value={form.status||'A confirmar'} onChange={e=>set('status',e.target.value)}><option>A confirmar</option><option>Confirmado</option><option>Realizado</option><option>Cancelado</option></select></Field>
          <Field label="Observações" full><textarea rows="3" value={form.notes||''} onChange={e=>set('notes',e.target.value)} placeholder="Ex.: paciente pediu encaixe ou retorno via WhatsApp."/></Field>
        </div>
      </div>
      <div className="modalFooter"><button type="button" className="outlineBtn" onClick={onClose}>Cancelar</button><button className="primaryBtn" type="submit"><Icon name="calendar" size={16}/>{isEdit?'Salvar consulta':'Agendar consulta'}</button></div>
    </form>
  </Modal>;
}

function Field({label,children,required,full}) { return <label className={'field '+(full?'full':'')}><span>{label}{required&&<b>*</b>}</span>{children}</label>; }

function AppShell() {
  const [page, setPage] = useState('dashboard');
  const [patients, setPatients] = useState(patientsSeed);
  const [appointments, setAppointments] = useState(appointmentsSeed);
  const [messages, setMessages] = useState(initialMessages);
  const [selectedId, setSelectedId] = useState(1);
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [dataReady,setDataReady] = useState(false);
  const [patientModal,setPatientModal]=useState({open:false,patient:null,initialStage:'Novo lead'});
  const [appointmentModal,setAppointmentModal]=useState({open:false,appointment:null,patientId:null});

  useEffect(()=>{
    setAuthenticated(localStorage.getItem('odonto_crm_session') === '1');
    try {
      const storedPatients=localStorage.getItem('odonto_crm_patients');
      const storedAppointments=localStorage.getItem('odonto_crm_appointments');
      const storedMessages=localStorage.getItem('odonto_crm_messages');
      if(storedPatients) setPatients(JSON.parse(storedPatients));
      if(storedAppointments) setAppointments(JSON.parse(storedAppointments));
      if(storedMessages) setMessages(JSON.parse(storedMessages));
    } catch {}
    setDataReady(true);
  }, []);

  useEffect(()=>{if(dataReady) localStorage.setItem('odonto_crm_patients',JSON.stringify(patients));},[patients,dataReady]);
  useEffect(()=>{if(dataReady) localStorage.setItem('odonto_crm_appointments',JSON.stringify(appointments));},[appointments,dataReady]);
  useEffect(()=>{if(dataReady) localStorage.setItem('odonto_crm_messages',JSON.stringify(messages));},[messages,dataReady]);

  const notify = (text) => { setToast(text); window.clearTimeout(window.__odontoToast); window.__odontoToast=setTimeout(()=>setToast(''), 2600); };
  const openNewPatient=(initialStage='Novo lead')=>setPatientModal({open:true,patient:null,initialStage});
  const openEditPatient=(patient)=>setPatientModal({open:true,patient,initialStage:patient.stage});
  const savePatient=(form)=>{
    if(form.id){
      setPatients(ps=>ps.map(p=>p.id===form.id?{...p,...form,avatar:avatarFromName(form.name),last:'agora'}:p));
      notify('Paciente atualizado com sucesso');
    } else {
      const newPatient={...form,id:Date.now(),avatar:avatarFromName(form.name),last:'agora'};
      setPatients(ps=>[newPatient,...ps]);
      setSelectedId(newPatient.id);
      notify('Paciente cadastrado com sucesso');
    }
    setPatientModal({open:false,patient:null,initialStage:'Novo lead'});
  };
  const openAppointment=(patientId=null,appointment=null)=>setAppointmentModal({open:true,patientId,appointment});
  const saveAppointment=(form)=>{
    if(form.id){
      setAppointments(list=>list.map(a=>a.id===form.id?{...a,...form}:a));
      notify('Consulta atualizada com sucesso');
    } else {
      setAppointments(list=>[...list,{...form,id:Date.now()}].sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time)));
      notify('Consulta agendada com sucesso');
    }
    setPatients(ps=>ps.map(p=>p.id===form.patientId && ['Novo lead','Contato iniciado','Qualificado','Não respondeu'].includes(p.stage)?{...p,stage:'Consulta marcada',last:'agora'}:p));
    setAppointmentModal({open:false,appointment:null,patientId:null});
  };
  const updateAppointmentStatus=(id,status)=>{setAppointments(list=>list.map(a=>a.id===id?{...a,status}:a));notify('Status da consulta atualizado');};
  const deleteAppointment=(id)=>{setAppointments(list=>list.filter(a=>a.id!==id));notify('Consulta removida da agenda');};

  if (!authenticated) return <Login onLogin={()=>setAuthenticated(true)} />;

  const nav = [
    ['dashboard','dashboard','Visão geral'], ['inbox','chat','Conversas'], ['patients','users','Pacientes'],
    ['pipeline','pipeline','Pipeline'], ['agenda','calendar','Agenda'], ['automations','bolt','Automações'], ['settings','settings','Configurações']
  ];

  return <div className="appShell">
    {toast && <div className="toast"><Icon name="check" size={16}/>{toast}</div>}
    <PatientModal state={patientModal} onClose={()=>setPatientModal({open:false,patient:null,initialStage:'Novo lead'})} onSave={savePatient}/>
    <AppointmentModal state={appointmentModal} onClose={()=>setAppointmentModal({open:false,appointment:null,patientId:null})} onSave={saveAppointment} patients={patients}/>
    <aside className={'sidebar '+(mobileNav?'open':'')}>
      <div className="sidebarBrand"><div className="brandMark">FA</div><div><b>Facciale</b><small>Odontologia Avançada</small></div><button className="closeMobile" onClick={()=>setMobileNav(false)}><Icon name="x"/></button></div>
      <div className="clinicMini"><div className="clinicAvatar">FA</div><div><b>{clinicName}</b><small>Unidade principal</small></div></div>
      <nav>{nav.map(([id,icon,label])=><button key={id} className={page===id?'active':''} onClick={()=>{setPage(id);setMobileNav(false)}}><Icon name={icon}/><span>{label}</span>{id==='inbox' && <i>3</i>}</button>)}</nav>
      <div className="sidebarBottom"><div className="statusOnline"><span></span> WhatsApp conectado</div><div className="userMini"><div className="avatarSmall">CM</div><div><b>Camila Martins</b><small>Administradora</small></div><button title="Sair" onClick={()=>{localStorage.removeItem('odonto_crm_session');setAuthenticated(false)}}><Icon name="logout" size={17}/></button></div></div>
    </aside>
    <main className="main">
      <header className="topbar"><button className="menuMobile" onClick={()=>setMobileNav(true)}><Icon name="menu"/></button><div className="topSearch"><Icon name="search" size={17}/><input placeholder="Buscar paciente, telefone..." /></div><div className="topActions"><button className="topQuickBtn" onClick={()=>openNewPatient()}><Icon name="plus" size={15}/> Paciente</button><span className="livePill"><i></i> IA ativa</span><div className="avatarSmall">CM</div></div></header>
      {page==='dashboard' && <Dashboard setPage={setPage} patients={patients} appointments={appointments} openNewPatient={openNewPatient} openAppointment={openAppointment} />}
      {page==='inbox' && <Inbox patients={patients} setPatients={setPatients} messages={messages} setMessages={setMessages} selectedId={selectedId} setSelectedId={setSelectedId} notify={notify} openAppointment={openAppointment} openEditPatient={openEditPatient}/>} 
      {page==='patients' && <Patients patients={patients} notify={notify} openNewPatient={openNewPatient} openEditPatient={openEditPatient} openAppointment={openAppointment} />}
      {page==='pipeline' && <Pipeline patients={patients} setPatients={setPatients} notify={notify} openNewPatient={openNewPatient} openEditPatient={openEditPatient}/>} 
      {page==='agenda' && <Agenda appointments={appointments} patients={patients} openAppointment={openAppointment} updateAppointmentStatus={updateAppointmentStatus} deleteAppointment={deleteAppointment} />}
      {page==='automations' && <Automations notify={notify}/>} 
      {page==='settings' && <Settings notify={notify}/>} 
    </main>
  </div>;
}

function PageHead({ eyebrow, title, subtitle, action }) { return <div className="pageHead"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>; }

function Dashboard({ setPage, patients, appointments, openNewPatient, openAppointment }) {
  const today=appointments.filter(a=>a.date===DEMO_TODAY && a.status!=='Cancelado');
  const newLeads=patients.filter(p=>p.stage==='Novo lead').length;
  const confirmed=today.filter(a=>a.status==='Confirmado').length;
  const appointmentRate=patients.length?Math.round((patients.filter(p=>['Consulta marcada','Orçamento','Tratamento','Finalizado'].includes(p.stage)).length/patients.length)*100):0;
  const cards = [
    ['Novos leads',String(newLeads),'+18%','users','vs. semana passada'], ['Conversas abertas',String(patients.length),'3 aguardando','chat','precisam de atenção'], ['Consultas hoje',String(today.length),confirmed+' confirmadas','calendar',today.length?Math.round(confirmed/today.length*100)+'% de confirmação':'sem consultas'], ['Taxa de agendamento',appointmentRate+'%','+6,4%','pipeline','base atual']
  ];
  return <div className="pageContent">
    <PageHead eyebrow="TERÇA-FEIRA, 11 DE AGOSTO" title="Bom dia, Camila 👋" subtitle="Aqui está o que está acontecendo na clínica hoje." action={<div className="headActions"><button className="outlineBtn" onClick={()=>openNewPatient()}><Icon name="users" size={16}/>Novo paciente</button><button className="primaryBtn" onClick={()=>openAppointment()}><Icon name="calendar" size={17}/>Nova consulta</button></div>}/>
    <div className="metricGrid">{cards.map((c,i)=><div className="metricCard" key={c[0]}><div className="metricIcon"><Icon name={c[3]}/></div><span>{c[0]}</span><strong>{c[1]}</strong><div className={i===0||i===3?'positive':'neutral'}>{c[2]} <small>{c[4]}</small></div></div>)}</div>
    <div className="dashboardGrid">
      <section className="card recentCard"><div className="cardHead"><div><h3>Conversas recentes</h3><p>Últimos contatos recebidos pelo WhatsApp</p></div><button className="linkBtn" onClick={()=>setPage('inbox')}>Ver todas <Icon name="chevron" size={15}/></button></div><div className="recentList">{patients.slice(0,5).map((p,i)=><div className="recentRow" key={p.id}><div className={'avatar person c'+i}>{p.avatar}</div><div className="grow"><b>{p.name}</b><span>{i===0?'Queria marcar para essa semana.':'Tenho uma dúvida sobre '+p.interest.toLowerCase()+'.'}</span></div><div className="recentMeta"><small>{p.last}</small><span className="stageTag">{p.stage}</span></div></div>)}</div></section>
      <section className="card todayCard"><div className="cardHead"><div><h3>Agenda de hoje</h3><p>Próximos atendimentos</p></div><button className="linkBtn" onClick={()=>setPage('agenda')}>Agenda <Icon name="chevron" size={15}/></button></div><div className="timeline">{today.length?today.slice(0,5).map(a=><div className="timelineItem" key={a.id}><div className="time">{a.time}</div><div className="line"><i></i></div><div className="appt"><b>{a.patient}</b><span>{a.procedure} • {a.professional}</span><em className={a.status==='Confirmado'?'confirmed':''}>{a.status}</em></div></div>):<div className="emptyMini">Nenhuma consulta cadastrada para hoje.</div>}</div></section>
    </div>
    <section className="card performance"><div className="cardHead"><div><h3>Funil de atendimento</h3><p>Distribuição dos pacientes ativos</p></div><span className="softPill">Atualizado agora</span></div><div className="funnelBars">{stageNames.slice(0,6).map((stage,i)=>{const count=patients.filter(p=>p.stage===stage).length;const max=Math.max(1,...stageNames.map(s=>patients.filter(p=>p.stage===s).length));return <div className="funnelRow" key={stage}><span>{stage}</span><div className="bar"><i style={{width:Math.max(5,count/max*100)+'%'}}></i></div><b>{count}</b></div>})}</div></section>
  </div>;
}

function Inbox({patients,setPatients,messages,setMessages,selectedId,setSelectedId,notify,openAppointment,openEditPatient}) {
  const p = patients.find(x=>x.id===selectedId) || patients[0];
  const [text,setText] = useState('');
  if(!p) return <div className="emptyStatePage"><Icon name="users" size={30}/><h2>Nenhum paciente cadastrado</h2><p>Cadastre um paciente para iniciar o atendimento.</p></div>;
  const list = messages[selectedId] || [{id:1,side:'in',text:'Olá! Gostaria de receber mais informações.',time:'08:00'}];
  const send = async () => {
    if(!text.trim()) return;
    const body=text.trim();
    setMessages(prev=>({...prev,[selectedId]:[...(prev[selectedId]||[]),{id:Date.now(),side:'out',text:body,time:new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}]})); setText('');
    try { const r=await fetch('/api/n8n/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({patientId:p.id,phone:p.phone,text:body})}); const j=await r.json(); notify(j.forwarded?'Mensagem enviada ao n8n':'Mensagem salva em modo demonstração'); } catch { notify('Mensagem adicionada no modo demonstração'); }
  };
  const toggleAutomation=()=>{setPatients(ps=>ps.map(x=>x.id===p.id?{...x,automation:!x.automation,owner:x.automation?'Camila':'IA'}:x));notify(p.automation?'Atendimento assumido por humano':'Conversa devolvida para a automação');};
  return <div className="inboxPage">
    <div className="conversationList"><div className="convTitle"><h2>Conversas</h2><button><Icon name="plus" size={17}/></button></div><div className="convSearch"><Icon name="search" size={16}/><input placeholder="Buscar conversa..."/></div><div className="filterTabs"><button className="active">Todas</button><button>Não lidas <i>3</i></button><button>IA</button></div><div className="conversationScroll">{patients.map((x,i)=><button key={x.id} onClick={()=>setSelectedId(x.id)} className={'conversationItem '+(x.id===selectedId?'selected':'')}><div className={'avatar person c'+i}>{x.avatar}<i className="onlineDot"></i></div><div className="grow"><div><b>{x.name}</b><small>{x.last}</small></div><span>{i===0?'Queria marcar para essa semana.':'Tenho uma dúvida sobre '+x.interest.toLowerCase()+'.'}</span><div className="convBadges"><em>{x.interest}</em>{x.automation&&<em className="botBadge">IA</em>}</div></div></button>)}</div></div>
    <div className="chatPane"><div className="chatHeader"><div className="avatar person">{p.avatar}</div><div className="grow"><b>{p.name}</b><span><i></i> WhatsApp • {p.phone}</span></div><button className="iconBtn"><Icon name="phone"/></button><button className="humanBtn" onClick={toggleAutomation}>{p.automation?<><Icon name="user" size={16}/>Assumir conversa</>:<><Icon name="bot" size={16}/>Devolver para IA</>}</button></div><div className="chatBody"><div className="dayDivider">Hoje</div>{list.map(m=><div key={m.id} className={'messageWrap '+m.side}><div className="bubble">{m.bot&&<div className="botLabel"><Icon name="bot" size={12}/> Assistente IA</div>}<p>{m.text}</p><small>{m.time} {m.side==='out'&&'✓✓'}</small></div></div>)}</div><div className="composer"><button className="attach">＋</button><textarea value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}}} placeholder={p.automation?'Digite uma mensagem (envio manual)...':'Digite sua mensagem...'} /><button className="sendBtn" onClick={send}><Icon name="send" size={18}/></button></div></div>
    <aside className="contactPanel"><div className="contactHero"><div className="avatar person largeAvatar">{p.avatar}</div><h3>{p.name}</h3><p>{p.phone}</p><div className="contactActions"><button onClick={()=>openAppointment(p.id)}><Icon name="calendar" size={15}/>Agendar</button><button onClick={()=>openEditPatient(p)}><Icon name="edit" size={15}/>Editar</button></div></div><div className="infoSection"><div className="infoTitle">INFORMAÇÕES</div><Info label="Interesse" value={p.interest}/><Info label="Origem" value={p.source}/><Info label="Etapa" value={p.stage}/><Info label="Responsável" value={p.owner}/></div><div className="infoSection"><div className="infoTitle">AUTOMAÇÃO</div><div className={'automationStatus '+(p.automation?'on':'')}><Icon name="bot" size={16}/><div><b>{p.automation?'IA respondendo':'Atendimento humano'}</b><span>{p.automation?'n8n pode responder automaticamente':'Automação temporariamente pausada'}</span></div></div></div><div className="infoSection"><div className="infoTitle">OBSERVAÇÕES</div><div className="note">{p.notes || `Paciente interessado em ${p.interest.toLowerCase()}. Priorizar retorno ainda hoje.`}<small>Administrativo • atualizado recentemente</small></div></div></aside>
  </div>;
}

function Info({label,value}) { return <div className="infoRow"><span>{label}</span><b>{value}</b></div>; }

function Patients({patients,openNewPatient,openEditPatient,openAppointment}) {
  const [query,setQuery]=useState('');
  const filtered=patients.filter(p=>(p.name+p.phone+p.interest+(p.email||'')).toLowerCase().includes(query.toLowerCase()));
  return <div className="pageContent"><PageHead eyebrow="BASE DE CONTATOS" title="Pacientes" subtitle="Cadastre pacientes, atualize informações e agende consultas rapidamente." action={<button className="primaryBtn" onClick={()=>openNewPatient()}><Icon name="plus" size={17}/>Novo paciente</button>}/>
    <section className="card tableCard"><div className="tableToolbar"><div className="convSearch patientSearch"><Icon name="search" size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar por nome, telefone, e-mail ou interesse..."/></div><span className="recordCount">{filtered.length} paciente{filtered.length===1?'':'s'}</span></div>
      <div className="dataTable"><div className="tr th patientTable"><div>Paciente</div><div>Interesse</div><div>Origem</div><div>Etapa</div><div>Responsável</div><div>Último contato</div><div>Ações</div></div>{filtered.map((p,i)=><div className="tr patientTable" key={p.id}><div className="patientCell"><div className={'avatar person c'+i}>{p.avatar}</div><span><b>{p.name}</b><small>{p.phone}{p.email?' • '+p.email:''}</small></span></div><div>{p.interest}</div><div><span className="sourcePill">{p.source}</span></div><div><span className="stageTag">{p.stage}</span></div><div>{p.owner}</div><div>{p.last}</div><div className="tableActions"><button title="Agendar consulta" onClick={()=>openAppointment(p.id)}><Icon name="calendar" size={15}/></button><button title="Editar paciente" onClick={()=>openEditPatient(p)}><Icon name="edit" size={15}/></button></div></div>)}</div>
      {!filtered.length&&<div className="emptyTable"><Icon name="search" size={22}/><b>Nenhum paciente encontrado</b><span>Tente outro termo de busca ou cadastre um novo paciente.</span></div>}
    </section>
  </div>;
}

function Pipeline({patients,setPatients,notify,openNewPatient,openEditPatient}) {
  const [dragId,setDragId]=useState(null);
  const move=(stage)=>{if(!dragId)return; setPatients(ps=>ps.map(p=>p.id===dragId?{...p,stage,last:'agora'}:p)); setDragId(null); notify('Paciente movido para '+stage);};
  return <div className="pageContent pipelinePage"><PageHead eyebrow="FUNIL COMERCIAL" title="Pipeline" subtitle="Acompanhe cada paciente do primeiro contato ao tratamento." action={<button className="primaryBtn" onClick={()=>openNewPatient('Novo lead')}><Icon name="plus" size={17}/>Adicionar oportunidade</button>}/>
    <div className="kanban">{stageNames.map(stage=>{const items=patients.filter(p=>p.stage===stage);return <div className="kanbanCol" key={stage} onDragOver={e=>e.preventDefault()} onDrop={()=>move(stage)}><div className="kanbanHead"><span><i style={{background:stageAccent[stage]}}></i>{stage}</span><b>{items.length}</b></div><div className="kanbanCards">{items.map(p=><div draggable onDragStart={()=>setDragId(p.id)} className="kanbanCard" key={p.id} onDoubleClick={()=>openEditPatient(p)}><div className="kanbanTop"><div className="avatar person">{p.avatar}</div><span><b>{p.name}</b><small>{p.phone}</small></span></div><div className="kanbanInfo"><span>Interesse</span><b>{p.interest}</b></div><div className="kanbanFoot"><span>{p.source}</span><small>{p.last}</small></div></div>)}</div><button className="addKanban" onClick={()=>openNewPatient(stage)}>＋ Adicionar</button></div>})}</div>
  </div>;
}

function Agenda({appointments,openAppointment,updateAppointmentStatus,deleteAppointment}) {
  const weekDates=['2026-08-10','2026-08-11','2026-08-12','2026-08-13','2026-08-14','2026-08-15','2026-08-16'];
  const week=['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
  const [selectedDate,setSelectedDate]=useState(DEMO_TODAY);
  const list=appointments.filter(a=>a.date===selectedDate).sort((a,b)=>a.time.localeCompare(b.time));
  const confirmed=list.filter(a=>a.status==='Confirmado').length;
  const awaiting=list.filter(a=>a.status==='A confirmar').length;
  const canceled=list.filter(a=>a.status==='Cancelado').length;
  const dateLabel=new Intl.DateTimeFormat('pt-BR',{weekday:'long',day:'numeric',month:'long',timeZone:'UTC'}).format(new Date(selectedDate+'T12:00:00Z'));
  return <div className="pageContent"><PageHead eyebrow="AGENDA CLÍNICA" title="Agenda" subtitle="Cadastre, edite, confirme ou cancele consultas da equipe." action={<button className="primaryBtn" onClick={()=>openAppointment()}><Icon name="plus" size={17}/>Nova consulta</button>}/>
    <div className="agendaGrid"><section className="card calendarCard"><div className="calendarTop"><button>‹</button><div><h3>Agosto 2026</h3><p>Semana de 10 a 16 de agosto</p></div><button>›</button></div><div className="weekStrip">{weekDates.map((date,i)=><button className={selectedDate===date?'active':''} onClick={()=>setSelectedDate(date)} key={date}><span>{week[i]}</span><b>{Number(date.slice(-2))}</b>{date===DEMO_TODAY&&<i></i>}</button>)}</div><div className="scheduleList"><div className="scheduleTitle"><b className="capitalize">{dateLabel}</b><span>{list.length} consulta{list.length===1?'':'s'}</span></div>{list.length?list.map(a=><div className="scheduleRow" key={a.id}><div className="scheduleTime">{a.time}</div><div className="scheduleBlock"><div className="grow"><b>{a.patient}</b><span>{a.procedure} • {a.professional}</span>{a.notes&&<small className="apptNote">{a.notes}</small>}</div><div className="scheduleActions"><select className={'statusSelect '+a.status.toLowerCase().replace(/\s/g,'-')} value={a.status} onChange={e=>updateAppointmentStatus(a.id,e.target.value)}><option>A confirmar</option><option>Confirmado</option><option>Realizado</option><option>Cancelado</option></select><button title="Editar" onClick={()=>openAppointment(a.patientId,a)}><Icon name="edit" size={15}/></button><button className="dangerIcon" title="Excluir" onClick={()=>{if(confirm('Remover esta consulta da agenda?')) deleteAppointment(a.id);}}><Icon name="trash" size={15}/></button></div></div></div>):<div className="emptySchedule"><Icon name="calendar" size={25}/><b>Agenda livre neste dia</b><span>Use “Nova consulta” para adicionar um horário.</span></div>}</div></section>
      <aside className="card agendaSide"><h3>Resumo do dia</h3><div className="summaryNumber"><strong>{list.length}</strong><span>consultas<br/>na agenda</span></div><div className="miniStats"><div><i className="green"></i><span><b>{confirmed}</b> Confirmadas</span></div><div><i className="yellow"></i><span><b>{awaiting}</b> A confirmar</span></div><div><i className="red"></i><span><b>{canceled}</b> Canceladas</span></div></div><hr/><h4>Profissionais</h4>{professionals.slice(0,2).map((pro,i)=><div className="professional" key={pro}><div className="avatar person">{i===0?'DA':'DP'}</div><span><b>{pro}</b><small>{list.filter(a=>a.professional===pro && a.status!=='Cancelado').length} consultas</small></span></div>)}</aside>
    </div>
  </div>;
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
  const toggle=(i)=>{setFlows(f=>f.map((x,idx)=>idx===i?[...x.slice(0,3),!x[3],x[4]]:x));notify(flows[i][3]?'Automação pausada':'Automação ativada');};
  return <div className="pageContent"><PageHead eyebrow="AUTOMAÇÕES N8N" title="Automações" subtitle="Controle os principais fluxos que atendem seus pacientes automaticamente." action={<button className="primaryBtn" onClick={()=>notify('Crie o workflow no n8n e conecte pelo Webhook')}><Icon name="plus" size={17}/>Nova automação</button>}/><div className="automationGrid">{flows.map((f,i)=><div className="automationCard card" key={f[0]}><div className="flowTop"><div className="flowIcon"><Icon name={f[4]}/></div><button onClick={()=>toggle(i)} className={'switch '+(f[3]?'on':'')}><i></i></button></div><h3>{f[0]}</h3><p>{f[1]}</p><div className="flowBottom"><span><Icon name="bolt" size={14}/>{f[2]}</span><em className={f[3]?'active':''}>{f[3]?'Ativa':'Pausada'}</em></div></div>)}</div><section className="integrationBanner"><div className="integrationIcon"><span>n8n</span></div><div><h3>Integração com n8n preparada</h3><p>Use o endpoint <code>/api/n8n/inbound</code> para alimentar o CRM e <code>/api/n8n/send</code> para o CRM solicitar envios ao seu workflow.</p></div><button className="outlineBtn" onClick={()=>notify('Veja o README incluído no projeto')}>Ver configuração</button></section></div>;
}

function Settings({notify}) {
  const [name,setName]=useState(clinicName); const [phone,setPhone]=useState('+55 11 99999-9999');
  return <div className="pageContent"><PageHead eyebrow="PREFERÊNCIAS" title="Configurações" subtitle="Ajuste dados da clínica e prepare suas integrações." /><div className="settingsGrid"><section className="card settingsCard"><div className="settingsTitle"><div className="flowIcon"><Icon name="settings"/></div><div><h3>Dados da clínica</h3><p>Informações utilizadas no CRM e nas automações.</p></div></div><label>Nome da clínica</label><input value={name} onChange={e=>setName(e.target.value)}/><label>WhatsApp principal</label><input value={phone} onChange={e=>setPhone(e.target.value)}/><label>E-mail de atendimento</label><input placeholder="contato@sua-clinica.com.br"/><button className="primaryBtn" onClick={()=>notify('Configurações salvas em modo demonstração')}>Salvar alterações</button></section><section className="card settingsCard"><div className="settingsTitle"><div className="flowIcon n8nIcon">n8n</div><div><h3>Conexão n8n</h3><p>Status da automação externa.</p></div></div><div className="connectionBox"><span className="connectionDot"></span><div><b>Endpoint do CRM disponível</b><small>POST /api/n8n/inbound</small></div></div><label>Webhook de envio do n8n</label><div className="codeBox">N8N_WEBHOOK_URL</div><label>Segredo da integração</label><div className="codeBox">CRM_WEBHOOK_SECRET</div><p className="helpText">Cadastre as duas variáveis acima em <b>Vercel → Settings → Environment Variables</b>. O segredo nunca deve ficar no navegador.</p><button className="outlineBtn full" onClick={async()=>{const r=await fetch('/api/health'); const j=await r.json(); notify(j.ok?'API do CRM respondendo normalmente':'Falha na API');}}>Testar API do CRM</button></section><section className="card settingsCard span2"><div className="settingsTitle"><div className="flowIcon"><Icon name="chat"/></div><div><h3>WhatsApp Business</h3><p>O WhatsApp deve ficar conectado ao n8n; o CRM recebe os eventos já normalizados.</p></div><span className="statusConnected">● Estrutura pronta</span></div><div className="steps"><div><b>1</b><span><strong>WhatsApp Cloud API</strong><small>Recebe a mensagem do paciente.</small></span></div><i>→</i><div><b>2</b><span><strong>n8n</strong><small>Classifica, responde e chama o CRM.</small></span></div><i>→</i><div><b>3</b><span><strong>Facciale CRM</strong><small>Exibe conversa, paciente e etapa.</small></span></div></div></section></div></div>;
}

export default function Home(){ return <AppShell/>; }
