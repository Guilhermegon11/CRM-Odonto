'use client';

import { useEffect, useState } from 'react';

const FACCIALE_INLINE_CSS = String.raw`:root{--bg:#f4f9fc;--card:#fff;--text:#15384f;--muted:#6b8394;--line:#dce9f1;--primary:#0A7FC2;--primary2:#24A5DF;--primaryDark:#075E91;--primarySoft:#E9F6FC;--green:#15936a;--greenSoft:#e9f8f1;--shadow:0 8px 30px rgba(15,85,122,.07);--sidebar:#0B3049}
*{box-sizing:border-box}html,body{margin:0;padding:0;background:var(--bg);color:var(--text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}button,input,textarea,select{font:inherit}button{cursor:pointer}button,input,textarea,select{outline:none}button{border:0}.grow{flex:1;min-width:0}.eyebrow{font-size:11px;letter-spacing:.13em;font-weight:800;color:#7d8495}.appShell{min-height:100vh;display:flex}.sidebar{width:242px;background:var(--sidebar);color:#dfe4ef;position:fixed;inset:0 auto 0 0;z-index:50;padding:20px 14px;display:flex;flex-direction:column}.sidebarBrand{height:54px;display:flex;align-items:center;gap:11px;padding:0 7px 16px;border-bottom:1px solid rgba(255,255,255,.07)}.brandMark{width:35px;height:35px;display:grid;place-items:center;border-radius:11px;background:linear-gradient(135deg,#43B8E8,#0874B3);color:#fff;font-weight:900;font-size:14px;box-shadow:0 6px 18px rgba(8,119,185,.30)}.brandMark.large{width:54px;height:54px;font-size:20px;border-radius:16px}.sidebarBrand b{display:block;font-size:15px;color:#fff}.sidebarBrand small{display:block;color:#7f889c;font-size:11px;margin-top:2px}.clinicMini{margin:18px 5px 16px;padding:11px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.03);border-radius:12px;display:flex;align-items:center;gap:9px}.clinicAvatar{width:32px;height:32px;border-radius:10px;background:#293047;display:grid;place-items:center;font-size:11px;font-weight:800;color:#d9deea}.clinicMini b{font-size:12px;color:#f3f5f8;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:145px}.clinicMini small{font-size:10px;color:#7e8799}.sidebar nav{display:flex;flex-direction:column;gap:4px}.sidebar nav button{width:100%;height:43px;border-radius:10px;background:transparent;color:#8f99ad;display:flex;align-items:center;gap:12px;padding:0 12px;font-weight:650;font-size:13px;transition:.2s}.sidebar nav button:hover{background:rgba(255,255,255,.045);color:#dfe4ef}.sidebar nav button.active{background:linear-gradient(90deg,rgba(10,127,194,.28),rgba(10,127,194,.10));color:#fff}.sidebar nav button.active svg{color:#72C9EE}.sidebar nav button i{margin-left:auto;background:#159BD2;color:white;font-style:normal;min-width:19px;height:19px;border-radius:7px;display:grid;place-items:center;font-size:10px}.sidebarBottom{margin-top:auto}.statusOnline{font-size:10px;color:#8892a4;padding:10px 9px;display:flex;align-items:center;gap:7px}.statusOnline span{width:7px;height:7px;border-radius:50%;background:#35cf85;box-shadow:0 0 0 3px rgba(53,207,133,.1)}.userMini{display:flex;align-items:center;gap:9px;border-top:1px solid rgba(255,255,255,.07);padding:16px 7px 3px}.avatarSmall{width:32px;height:32px;display:grid;place-items:center;border-radius:50%;background:#E9F6FC;color:#0A78B8;font-size:11px;font-weight:800}.userMini b{font-size:11px;color:#f0f2f6;display:block}.userMini small{font-size:10px;color:#7e8799;display:block}.userMini button{margin-left:auto;background:transparent;color:#778196;padding:4px}.main{margin-left:242px;width:calc(100% - 242px);min-height:100vh}.topbar{height:70px;border-bottom:1px solid #e8ebf0;background:rgba(255,255,255,.92);backdrop-filter:blur(10px);display:flex;align-items:center;padding:0 30px;position:sticky;top:0;z-index:30}.topSearch{width:330px;height:38px;border:1px solid #e4e8ee;border-radius:10px;background:#f9fafc;display:flex;align-items:center;gap:9px;padding:0 12px;color:#9aa2af}.topSearch input,.convSearch input{border:0;background:transparent;width:100%;font-size:12px;color:#303849}.topActions{margin-left:auto;display:flex;align-items:center;gap:14px}.livePill{font-size:11px;color:#207a58;background:#eef9f4;padding:7px 10px;border-radius:8px;font-weight:700}.livePill i{display:inline-block;width:6px;height:6px;background:#24bb7b;border-radius:50%;margin-right:5px}.menuMobile,.closeMobile{display:none;background:transparent;color:inherit}.pageContent{padding:30px 32px 44px;max-width:1530px;margin:0 auto}.pageHead{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:24px;gap:20px}.pageHead h1{font-size:27px;line-height:1.15;margin:6px 0 5px;letter-spacing:-.025em}.pageHead p{margin:0;color:var(--muted);font-size:13px}.primaryBtn{height:39px;border-radius:10px;background:linear-gradient(135deg,var(--primary2),var(--primary));color:#fff;padding:0 15px;font-weight:750;font-size:12px;display:inline-flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 7px 18px rgba(8,119,185,.18)}.outlineBtn{height:38px;border:1px solid #dfe3ea;background:#fff;border-radius:9px;padding:0 13px;color:#4d5668;font-size:11px;font-weight:700}.card{background:#fff;border:1px solid #e8ebf0;border-radius:15px;box-shadow:var(--shadow)}.metricGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-bottom:18px}.metricCard{background:#fff;border:1px solid #e7eaf0;border-radius:14px;padding:18px 18px 16px;position:relative;box-shadow:0 6px 20px rgba(30,42,74,.035)}.metricIcon{position:absolute;right:17px;top:17px;width:34px;height:34px;border-radius:10px;background:#EAF7FC;color:#0B82C5;display:grid;place-items:center}.metricCard>span{display:block;color:#7b8495;font-size:11px;font-weight:650;margin-bottom:10px}.metricCard>strong{font-size:26px;letter-spacing:-.03em}.metricCard>div:last-child{margin-top:8px;font-size:10px;font-weight:800}.metricCard .positive{color:#1aa26c}.metricCard .neutral{color:#696f7c}.metricCard small{font-weight:500;color:#9aa1ad}.dashboardGrid{display:grid;grid-template-columns:1.45fr 1fr;gap:18px}.cardHead{display:flex;justify-content:space-between;align-items:center;padding:18px 20px 13px}.cardHead h3{font-size:14px;margin:0 0 3px}.cardHead p{font-size:10px;color:#9198a6;margin:0}.linkBtn{background:transparent;color:#0A7FC2;font-size:10px;font-weight:750;display:flex;align-items:center}.recentList{padding:0 8px 7px}.recentRow{display:flex;align-items:center;gap:11px;padding:12px;border-top:1px solid #f0f2f5}.avatar.person{width:35px;height:35px;flex:0 0 35px;border-radius:50%;display:grid;place-items:center;background:#eaf0ff;color:#4d68ab;font-size:10px;font-weight:850;position:relative}.avatar.c1{background:#fff0e6;color:#a96840}.avatar.c2{background:#eaf8f0;color:#448769}.avatar.c3{background:#EAF7FC;color:#1979AA}.avatar.c4{background:#fff7dc;color:#9a7b20}.recentRow .grow b{font-size:11px;display:block}.recentRow .grow>span{font-size:10px;color:#828a99;display:block;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.recentMeta{text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:5px}.recentMeta small{font-size:9px;color:#a1a8b3}.stageTag{font-size:9px;background:#f3f4f8;color:#606979;border-radius:6px;padding:4px 6px;font-weight:700}.timeline{padding:3px 17px 11px}.timelineItem{display:grid;grid-template-columns:42px 18px 1fr;min-height:61px}.timelineItem .time{font-size:10px;font-weight:750;color:#5f6877;padding-top:5px}.timelineItem .line{position:relative;border-left:1px solid #e5e8ed;margin-left:5px}.timelineItem:last-child .line{border-color:transparent}.timelineItem .line i{position:absolute;left:-4px;top:6px;width:7px;height:7px;border-radius:50%;background:#0B82C5;border:2px solid #D8F1FC;box-sizing:content-box}.appt{padding:2px 0}.appt b{font-size:11px;display:block}.appt span{display:block;font-size:9px;color:#8e96a4;margin-top:3px}.appt em{display:inline-block;margin-top:4px;font-size:8px;font-style:normal;padding:3px 5px;background:#fff5df;color:#9c7126;border-radius:5px}.appt em.confirmed{background:#e9f8f1;color:#23805c}.performance{margin-top:18px;padding-bottom:15px}.softPill{font-size:9px;color:#727b89;border:1px solid #e4e7ed;background:#fafbfc;border-radius:7px;padding:5px 8px}.funnelBars{padding:4px 20px 7px}.funnelRow{display:grid;grid-template-columns:105px 1fr 28px;gap:12px;align-items:center;margin:11px 0}.funnelRow>span{font-size:10px;color:#667082}.funnelRow>b{font-size:10px;text-align:right}.bar{height:7px;background:#f0f1f6;border-radius:8px;overflow:hidden}.bar i{display:block;height:100%;background:linear-gradient(90deg,#40B6E6,#0877B9);border-radius:8px}.inboxPage{height:calc(100vh - 70px);display:grid;grid-template-columns:310px minmax(420px,1fr) 290px;background:#fff}.conversationList{border-right:1px solid var(--line);display:flex;flex-direction:column;min-height:0}.convTitle{height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 16px}.convTitle h2{font-size:18px}.convTitle button{width:30px;height:30px;border-radius:8px;background:#EAF7FC;color:#0A80C2;display:grid;place-items:center}.convSearch{height:36px;margin:0 13px;border:1px solid #e4e7ec;border-radius:9px;background:#f8f9fb;color:#9aa2af;display:flex;align-items:center;gap:7px;padding:0 10px}.filterTabs{display:flex;gap:3px;padding:13px 12px 8px;border-bottom:1px solid #edf0f3}.filterTabs button{background:transparent;padding:6px 8px;border-radius:7px;font-size:10px;color:#8991a0;font-weight:700}.filterTabs button.active{background:#E9F6FC;color:#0877B9}.filterTabs i{font-style:normal;background:#169BD1;color:#fff;border-radius:5px;padding:1px 4px}.conversationScroll{overflow:auto;min-height:0;flex:1}.conversationItem{width:100%;display:flex;text-align:left;gap:10px;padding:13px 12px;background:#fff;border-bottom:1px solid #f1f2f5}.conversationItem:hover{background:#F7FCFE}.conversationItem.selected{background:#EDF8FD;border-left:3px solid #0B82C5;padding-left:9px}.conversationItem .grow>div:first-child{display:flex;justify-content:space-between;gap:6px}.conversationItem b{font-size:11px}.conversationItem small{font-size:9px;color:#a1a8b2}.conversationItem .grow>span{font-size:9px;color:#7e8797;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:4px 0 5px}.onlineDot{position:absolute;right:-1px;bottom:1px;width:8px;height:8px;border-radius:50%;background:#33c882;border:2px solid #fff}.convBadges{display:flex;gap:4px}.convBadges em{font-style:normal;font-size:8px;background:#f0f2f6;color:#667080;padding:2px 5px;border-radius:5px}.convBadges em.botBadge{background:#E9F6FC;color:#0877B9}.chatPane{display:flex;flex-direction:column;min-height:0;background:#f6f7fa}.chatHeader{height:64px;background:#fff;border-bottom:1px solid var(--line);display:flex;align-items:center;gap:10px;padding:0 15px}.chatHeader b{display:block;font-size:12px}.chatHeader .grow>span{display:flex;align-items:center;gap:5px;color:#939aa8;font-size:9px;margin-top:2px}.chatHeader .grow>span i{width:5px;height:5px;border-radius:50%;background:#25bc78}.iconBtn{width:33px;height:33px;background:#fff;border:1px solid #e3e6eb;border-radius:9px;color:#667080;display:grid;place-items:center}.humanBtn{height:33px;border-radius:9px;background:#f1f1ff;color:#0877B9;padding:0 10px;font-size:9px;font-weight:750;display:flex;align-items:center;gap:5px}.chatBody{flex:1;overflow:auto;padding:22px 24px;background-color:#f5f6f8;background-image:radial-gradient(#dfe2e7 0.55px,transparent .55px);background-size:15px 15px}.dayDivider{text-align:center;font-size:8px;color:#9da4af;margin:2px 0 20px}.messageWrap{display:flex;margin:9px 0}.messageWrap.out{justify-content:flex-end}.bubble{max-width:68%;background:#fff;border:1px solid #eaecf0;border-radius:4px 13px 13px 13px;padding:9px 10px 6px;box-shadow:0 2px 7px rgba(24,32,54,.035)}.out .bubble{background:#159BD2;color:#fff;border-color:#159BD2;border-radius:13px 4px 13px 13px}.bubble p{margin:0;font-size:11px;line-height:1.48}.bubble>small{display:block;text-align:right;font-size:8px;margin-top:4px;color:#a1a6b0}.out .bubble>small{color:#CDEAF7}.botLabel{font-size:8px;color:#DDF3FC;margin-bottom:5px;display:flex;align-items:center;gap:4px;font-weight:700}.composer{min-height:64px;background:#fff;border-top:1px solid var(--line);display:flex;align-items:flex-end;gap:8px;padding:11px 13px}.composer textarea{resize:none;min-height:38px;max-height:90px;flex:1;border:1px solid #e2e5eb;border-radius:10px;padding:10px 11px;font-size:10px;background:#fafbfc}.attach{width:35px;height:38px;background:transparent;color:#828b9a;font-size:19px}.sendBtn{width:38px;height:38px;border-radius:10px;background:#0A7FC2;color:#fff;display:grid;place-items:center}.contactPanel{border-left:1px solid var(--line);background:#fff;overflow:auto}.contactHero{text-align:center;padding:22px 14px 17px;border-bottom:1px solid #edf0f3}.largeAvatar{width:58px!important;height:58px!important;margin:auto;font-size:15px!important}.contactHero h3{font-size:13px;margin:10px 0 2px}.contactHero p{font-size:9px;color:#8992a0;margin:0}.contactActions{display:flex;justify-content:center;gap:10px;margin-top:16px}.contactActions button{width:61px;background:transparent;color:#777f8e;font-size:8px;display:flex;flex-direction:column;align-items:center;gap:5px}.contactActions button svg{width:29px;height:29px;padding:7px;border:1px solid #e3e6eb;border-radius:8px;color:#0A7FC2}.infoSection{padding:14px 16px;border-bottom:1px solid #edf0f3}.infoTitle{font-size:9px;font-weight:800;color:#727b89;margin-bottom:9px;display:flex;justify-content:space-between;text-transform:uppercase;letter-spacing:.04em}.infoTitle button{background:transparent;color:#0A7FC2;font-size:8px;font-weight:750;text-transform:none}.infoRow{display:flex;justify-content:space-between;gap:10px;padding:5px 0;font-size:9px}.infoRow span{color:#9299a6}.infoRow b{font-weight:700;text-align:right}.automationStatus{background:#f6f7f9;border-radius:10px;padding:9px;display:flex;align-items:center;justify-content:space-between}.automationStatus>div{display:flex;align-items:center;gap:7px;color:#777f8e}.automationStatus.on>div{color:#0877B9}.automationStatus b{display:block;font-size:9px}.automationStatus small{display:block;font-size:7px;color:#9aa1ad;margin-top:1px}.switch{width:34px;height:19px;border-radius:20px;background:#cfd4dc;padding:2px;position:relative}.switch i{display:block;width:15px;height:15px;border-radius:50%;background:#fff;transition:.2s;box-shadow:0 1px 3px rgba(0,0,0,.15)}.switch.on{background:#0A7FC2}.switch.on i{transform:translateX(15px)}.note{font-size:9px;line-height:1.45;background:#fff9e9;border:1px solid #f7e9bc;border-radius:8px;padding:8px;color:#665b3e}.note small{display:block;font-size:7px;color:#9d9276;margin-top:5px}.tableCard{overflow:hidden}.tableToolbar{height:65px;display:flex;align-items:center;gap:10px;padding:0 18px;border-bottom:1px solid #eceff3}.patientSearch{margin:0;width:340px}.tableToolbar .outlineBtn{margin-left:auto}.dataTable{overflow:auto}.tr{display:grid;grid-template-columns:1.5fr .8fr .65fr .85fr .75fr .7fr;min-width:900px;align-items:center;min-height:62px;padding:0 18px;border-bottom:1px solid #f0f2f5;font-size:10px}.tr.th{min-height:38px;background:#fafbfc;color:#9198a5;font-size:9px;font-weight:700}.patientCell{display:flex;align-items:center;gap:9px}.patientCell b{font-size:10px;display:block}.patientCell small{font-size:8px;color:#969eaa;display:block;margin-top:2px}.sourcePill{background:#f1f4f7;border-radius:6px;padding:4px 6px;color:#657080}.kanban{display:grid;grid-template-columns:repeat(7,minmax(205px,1fr));gap:11px;overflow:auto;padding-bottom:15px}.kanbanCol{background:#f0f2f6;border-radius:12px;min-height:550px;padding:10px}.kanbanHead{height:32px;display:flex;align-items:center;justify-content:space-between;font-size:10px}.kanbanHead span{display:flex;align-items:center;gap:6px;font-weight:750}.kanbanHead span i{width:7px;height:7px;border-radius:50%}.kanbanHead b{background:#e2e5eb;color:#727b88;border-radius:6px;min-width:20px;height:20px;display:grid;place-items:center;font-size:9px}.kanbanCards{min-height:75px}.kanbanCard{background:#fff;border:1px solid #e1e5eb;border-radius:10px;padding:11px;margin:7px 0;box-shadow:0 3px 9px rgba(26,34,53,.035);cursor:grab}.kanbanTop{display:flex;align-items:center;gap:8px}.kanbanTop .avatar{width:30px!important;height:30px!important;flex-basis:30px!important}.kanbanTop b{font-size:10px;display:block}.kanbanTop small{display:block;font-size:8px;color:#9aa1ac;margin-top:2px}.kanbanInfo{margin-top:12px;padding-top:9px;border-top:1px solid #f0f2f5;display:flex;justify-content:space-between;font-size:8px}.kanbanInfo span{color:#969daa}.kanbanInfo b{font-size:9px}.kanbanFoot{display:flex;justify-content:space-between;margin-top:10px;font-size:8px;color:#8d95a3}.addKanban{width:100%;height:31px;background:transparent;color:#7f8796;font-size:9px;border:1px dashed #d5dae1;border-radius:8px}.agendaGrid{display:grid;grid-template-columns:1fr 270px;gap:18px}.calendarCard{overflow:hidden}.calendarTop{height:72px;display:flex;align-items:center;justify-content:space-between;padding:0 18px;border-bottom:1px solid #eceff3}.calendarTop button{background:#f4f5f8;width:30px;height:30px;border-radius:8px;color:#6c7482;font-size:18px}.calendarTop h3{font-size:14px;margin:0;text-align:center}.calendarTop p{font-size:9px;color:#969daa;margin:3px 0 0;text-align:center}.weekStrip{display:grid;grid-template-columns:repeat(7,1fr);border-bottom:1px solid #eceff3}.weekStrip button{height:73px;background:#fff;border-right:1px solid #f0f2f4;color:#8b93a0;position:relative}.weekStrip button:last-child{border-right:0}.weekStrip span{display:block;font-size:8px;text-transform:uppercase}.weekStrip b{font-size:15px;display:block;margin-top:6px}.weekStrip button.active{background:#EDF8FD;color:#0A7FC2}.weekStrip button.active b{width:30px;height:30px;border-radius:9px;background:#0A80C2;color:#fff;display:grid;place-items:center;margin:4px auto 0}.weekStrip button i{position:absolute;bottom:5px;left:50%;width:4px;height:4px;border-radius:50%;background:#0A80C2}.scheduleList{padding:14px 20px 22px}.scheduleTitle{display:flex;justify-content:space-between;padding:4px 0 13px}.scheduleTitle b{font-size:11px}.scheduleTitle span{font-size:9px;color:#9199a7}.scheduleRow{display:grid;grid-template-columns:55px 1fr;min-height:64px}.scheduleTime{font-size:10px;font-weight:700;padding-top:12px;color:#727b89}.scheduleBlock{border-left:3px solid #0A7FC2;background:#f8f8ff;border-radius:0 8px 8px 0;margin:4px 0;padding:8px 11px;display:flex;align-items:center;justify-content:space-between}.scheduleBlock b{display:block;font-size:10px}.scheduleBlock span{display:block;font-size:8px;color:#939aa7;margin-top:3px}.scheduleBlock em{font-style:normal;font-size:8px;background:#fff3dc;color:#9b6f22;padding:4px 6px;border-radius:6px}.scheduleBlock em.confirmed{background:#e8f8f0;color:#217a57}.agendaSide{padding:18px}.agendaSide h3{font-size:13px;margin:0 0 15px}.summaryNumber{background:#EDF8FD;border-radius:11px;padding:14px;display:flex;align-items:center;gap:10px}.summaryNumber strong{font-size:30px;color:#0A7FC2}.summaryNumber span{font-size:9px;color:#7e8693;line-height:1.4}.miniStats{padding:13px 4px}.miniStats>div{display:flex;align-items:center;gap:8px;padding:6px 0}.miniStats i{width:7px;height:7px;border-radius:50%;background:#bbb}.miniStats i.green{background:#23b97b}.miniStats i.yellow{background:#f1b94c}.miniStats i.red{background:#e76b6b}.miniStats span{font-size:9px;color:#7d8593}.miniStats b{color:#354052}.agendaSide hr{border:0;border-top:1px solid #edf0f3}.agendaSide h4{font-size:10px;margin:15px 0 10px}.professional{display:flex;align-items:center;gap:8px;padding:7px 0}.professional .avatar{width:31px!important;height:31px!important;flex-basis:31px!important}.professional b{font-size:9px;display:block}.professional small{font-size:8px;color:#969eaa;display:block;margin-top:2px}.automationGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}.automationCard{padding:17px}.flowTop{display:flex;justify-content:space-between;align-items:center}.flowIcon{width:38px;height:38px;border-radius:11px;background:#EAF7FC;color:#0A7FC2;display:grid;place-items:center;font-weight:900;font-size:10px}.automationCard h3{font-size:12px;margin:15px 0 6px}.automationCard>p{font-size:9px;color:#838c9a;line-height:1.5;min-height:40px;margin:0}.flowBottom{border-top:1px solid #edf0f3;margin-top:14px;padding-top:11px;display:flex;justify-content:space-between;align-items:center}.flowBottom span{display:flex;align-items:center;gap:5px;font-size:8px;color:#7e8796}.flowBottom em{font-style:normal;font-size:8px;background:#f1f2f5;color:#838b98;padding:4px 6px;border-radius:6px}.flowBottom em.active{background:#e9f8f1;color:#1f865e}.integrationBanner{margin-top:17px;border:1px solid #DCEFF8;background:linear-gradient(90deg,#f7f7ff,#fff);border-radius:14px;padding:16px 18px;display:flex;align-items:center;gap:14px}.integrationIcon{width:45px;height:45px;border-radius:13px;background:#ff6c4c;color:#fff;display:grid;place-items:center;font-size:11px;font-weight:900}.integrationBanner h3{font-size:12px;margin:0 0 4px}.integrationBanner p{font-size:9px;color:#7f8896;margin:0}.integrationBanner code{background:#eff0f4;padding:2px 4px;border-radius:4px;color:#0877B9}.integrationBanner .outlineBtn{margin-left:auto;flex:0 0 auto}.settingsGrid{display:grid;grid-template-columns:1fr 1fr;gap:17px}.settingsCard{padding:20px}.settingsCard.span2{grid-column:1/-1}.settingsTitle{display:flex;align-items:center;gap:11px;padding-bottom:17px;margin-bottom:15px;border-bottom:1px solid #edf0f3}.settingsTitle h3{font-size:12px;margin:0 0 3px}.settingsTitle p{font-size:9px;color:#9299a7;margin:0}.settingsCard>label{display:block;font-size:9px;font-weight:750;color:#667081;margin:12px 0 5px}.settingsCard>input{width:100%;height:38px;border:1px solid #dde2e8;border-radius:9px;padding:0 11px;font-size:10px;background:#fbfcfd}.settingsCard>.primaryBtn{margin-top:15px}.n8nIcon{background:#fff0ec;color:#ef6547}.connectionBox{border:1px solid #dcefe6;background:#f2fbf7;border-radius:10px;padding:11px;display:flex;align-items:center;gap:9px}.connectionDot{width:8px;height:8px;border-radius:50%;background:#22ba78}.connectionBox b{font-size:9px;display:block;color:#287457}.connectionBox small{font-size:8px;color:#7a9489;display:block;margin-top:2px}.codeBox{height:36px;border:1px solid #e1e5eb;background:#f8f9fb;border-radius:8px;display:flex;align-items:center;padding:0 10px;font:9px ui-monospace,SFMono-Regular,Menlo,monospace;color:#5b6371}.helpText{font-size:8px;color:#9299a6;line-height:1.5}.outlineBtn.full{width:100%;margin-top:6px}.statusConnected{margin-left:auto;font-size:8px;background:#eaf8f1;color:#26845f;padding:5px 7px;border-radius:6px;font-weight:750}.steps{display:flex;align-items:center;justify-content:space-between;gap:11px}.steps>div{flex:1;border:1px solid #e6e9ee;border-radius:10px;padding:12px;display:flex;align-items:center;gap:9px}.steps>div>b{width:25px;height:25px;border-radius:8px;background:#E9F6FC;color:#0877B9;display:grid;place-items:center;font-size:9px}.steps strong{display:block;font-size:9px}.steps small{display:block;font-size:8px;color:#9299a6;margin-top:2px}.steps>i{font-style:normal;color:#a3aab5}.toast{position:fixed;right:22px;top:82px;z-index:100;background:#202737;color:#fff;border-radius:10px;padding:10px 13px;font-size:10px;display:flex;align-items:center;gap:7px;box-shadow:0 12px 30px rgba(20,25,36,.2);animation:toastIn .2s ease}@keyframes toastIn{from{transform:translateY(-8px);opacity:0}to{transform:none;opacity:1}}.loginShell{min-height:100vh;background:#f8fafc}.premiumLogin{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(430px,.92fr);min-height:100vh;overflow:hidden}.loginHero{position:relative;overflow:hidden;padding:34px clamp(38px,5vw,78px) 30px;background:linear-gradient(150deg,#0d1727 0%,#10203b 50%,#0b3341 100%);color:#fff;display:flex;flex-direction:column}.loginHeroGrid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:42px 42px;mask-image:linear-gradient(to bottom,rgba(0,0,0,.8),transparent 80%);pointer-events:none}.loginHeroGlow{position:absolute;border-radius:999px;filter:blur(8px);pointer-events:none}.glowOne{width:420px;height:420px;right:-150px;top:-120px;background:radial-gradient(circle,rgba(61,225,197,.26),rgba(61,225,197,0) 68%)}.glowTwo{width:380px;height:380px;left:-160px;bottom:-130px;background:radial-gradient(circle,rgba(70,114,255,.23),rgba(70,114,255,0) 68%)}.loginHeroTop,.loginHeroContent,.loginHeroFooter{position:relative;z-index:2}.loginHeroTop{display:flex;align-items:center;justify-content:space-between;gap:20px}.loginBrandLockup,.mobileLoginBrand{display:flex;align-items:center;gap:11px}.loginLogoMark{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;background:linear-gradient(145deg,#69C9F0,#159DD0);box-shadow:0 12px 35px rgba(50,197,207,.28);color:#081421}.toothGlyph{font-size:20px;line-height:1}.loginBrandLockup strong,.mobileLoginBrand strong{display:block;font-size:15px;letter-spacing:-.02em}.loginBrandLockup small,.mobileLoginBrand small{display:block;font-size:8px;color:#93a9bf;margin-top:2px;letter-spacing:.08em;text-transform:uppercase}.loginSecureBadge{display:flex;align-items:center;gap:7px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.055);backdrop-filter:blur(10px);padding:7px 10px;border-radius:999px;font-size:8px;color:#b9c8d8}.loginSecureBadge span{width:7px;height:7px;border-radius:50%;background:#4ce2b1;box-shadow:0 0 0 4px rgba(76,226,177,.12)}.loginHeroContent{margin:auto 0;width:min(760px,100%);padding:44px 0 30px}.loginEyebrowPill{display:inline-flex;align-items:center;border:1px solid rgba(110,226,207,.22);background:rgba(94,228,202,.08);color:#8de9d6;border-radius:999px;padding:7px 10px;font-size:8px;font-weight:800;letter-spacing:.12em}.loginHero h1{font-size:clamp(39px,4.2vw,64px);line-height:.98;letter-spacing:-.055em;margin:18px 0 18px;max-width:760px}.loginHero h1 span{display:block;background:linear-gradient(90deg,#73ead4,#88c9ff 70%);-webkit-background-clip:text;background-clip:text;color:transparent}.loginHeroContent>p{max-width:640px;margin:0;color:#aebed0;font-size:13px;line-height:1.7}.loginFeatureRow{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:26px}.loginFeatureRow>div{display:flex;align-items:center;gap:10px;padding:11px 12px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.045);border-radius:12px}.loginFeatureRow i{font-style:normal;font-size:8px;color:#8ADAF6;font-weight:900}.loginFeatureRow b{display:block;font-size:9px}.loginFeatureRow small{display:block;margin-top:2px;font-size:7px;color:#91a4b8;line-height:1.35}.loginPreviewCard{margin-top:28px;width:min(650px,100%);border:1px solid rgba(255,255,255,.11);background:rgba(8,16,29,.52);box-shadow:0 25px 70px rgba(0,0,0,.2);backdrop-filter:blur(18px);border-radius:18px;padding:15px}.previewTopbar{display:flex;align-items:center;justify-content:space-between;padding-bottom:13px;border-bottom:1px solid rgba(255,255,255,.075)}.previewContact{display:flex;align-items:center;gap:9px}.previewAvatar{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;background:linear-gradient(145deg,#0A7FC2,#24A5DF);font-size:9px;font-weight:900}.previewContact b{display:block;font-size:9px}.previewContact small{display:flex;align-items:center;gap:5px;font-size:7px;color:#8398ad;margin-top:3px}.previewContact small span{width:5px;height:5px;border-radius:50%;background:#39B6E8}.previewTag{font-size:7px;font-weight:800;padding:5px 7px;border-radius:999px;background:rgba(94,228,202,.1);color:#9BE2F8;border:1px solid rgba(94,228,202,.16)}.previewConversation{padding:13px 0 7px;display:flex;flex-direction:column;gap:7px}.previewBubble{position:relative;max-width:70%;padding:9px 10px 16px;border-radius:11px;font-size:8px;line-height:1.45}.previewBubble time{position:absolute;right:8px;bottom:4px;font-size:6px;opacity:.58}.previewBubble.received{align-self:flex-start;background:#fff;color:#243247;border-radius:4px 11px 11px 11px}.previewBubble.sent{align-self:flex-end;background:linear-gradient(135deg,#0A7FC2,#2daab3);color:#fff;border-radius:11px 4px 11px 11px}.previewFooter{display:flex;justify-content:space-between;align-items:center;padding-top:10px;border-top:1px solid rgba(255,255,255,.075)}.previewStatus{display:flex;align-items:center;gap:8px}.previewStatus>span{width:25px;height:25px;border-radius:8px;background:rgba(74,216,155,.12);color:#68C7EF;display:grid;place-items:center;font-size:10px}.previewStatus b{display:block;font-size:8px}.previewStatus small{display:block;font-size:7px;color:#8194a8;margin-top:2px}.previewPulse{font-size:7px;color:#7f94a7;display:flex;align-items:center;gap:5px}.previewPulse span{width:6px;height:6px;border-radius:50%;background:#39B6E8;box-shadow:0 0 0 4px rgba(74,222,162,.08)}.loginHeroFooter{font-size:8px;color:#6f879c;padding-top:6px}.loginPanel{position:relative;display:grid;place-items:center;padding:48px clamp(28px,5vw,70px);background:radial-gradient(circle at 82% 12%,rgba(73,191,208,.08),transparent 26%),#f8fafc}.loginPanel:before{content:"";position:absolute;inset:0;background-image:radial-gradient(#d9e2ea .75px,transparent .75px);background-size:18px 18px;opacity:.3;pointer-events:none}.premiumCard{position:relative;z-index:1;width:min(430px,100%);background:#fff;border:1px solid #e7edf2;border-radius:24px;padding:34px;box-shadow:0 24px 75px rgba(35,54,76,.1)}.mobileLoginBrand{display:none;margin-bottom:30px}.mobileLoginBrand .loginLogoMark{width:39px;height:39px}.mobileLoginBrand small{color:#8290a0}.loginFormIntro{position:relative}.loginMiniIcon{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:#eef9f8;color:#0877B9;margin-bottom:18px}.premiumCard .eyebrow{font-size:8px;font-weight:900;letter-spacing:.14em;color:#0877B9}.premiumCard h2{font-size:30px;letter-spacing:-.045em;color:#142132;margin:7px 0 7px}.premiumCard .loginFormIntro>p{font-size:11px;color:#7d8998;margin:0 0 25px}.loginFieldGroup{margin-top:14px}.loginFieldGroup>label,.loginLabelRow label{display:block;font-size:9px;font-weight:800;color:#465365;margin:0 0 7px}.loginLabelRow{display:flex;align-items:center;justify-content:space-between}.loginLinkBtn{border:0;background:none;color:#0877B9;font-size:8px;font-weight:750;cursor:pointer;padding:0 0 7px}.loginLinkBtn:hover{text-decoration:underline}.loginInputWrap{height:46px;border:1px solid #dfe6ec;border-radius:12px;background:#fbfcfd;display:flex;align-items:center;transition:.18s;overflow:hidden}.loginInputWrap:focus-within{border-color:#62B8DF;background:#fff;box-shadow:0 0 0 3px rgba(21,157,208,.10)}.inputIcon{width:38px;height:100%;display:grid;place-items:center;color:#98a4b1;font-size:10px;font-weight:900}.loginInputWrap input{flex:1;height:100%;min-width:0;border:0!important;outline:0;background:transparent!important;padding:0 8px 0 0!important;font-size:10px!important;color:#263345}.loginInputWrap input::placeholder{color:#aab3be}.passwordToggle{height:100%;padding:0 12px;border:0;background:transparent;color:#6e7b89;font-size:8px;font-weight:750;cursor:pointer}.loginOptionsRow{display:flex;align-items:center;justify-content:space-between;margin:12px 0 18px}.rememberCheck{display:flex;align-items:center;gap:7px;font-size:8px;color:#6f7b89;cursor:pointer}.rememberCheck input{accent-color:#0877B9;width:13px;height:13px}.loginSubmitBtn{width:100%;height:48px;border:0;border-radius:13px;background:linear-gradient(135deg,#159DD0,#0877B9);color:#fff;font-weight:850;font-size:10px;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;box-shadow:0 12px 28px rgba(8,119,185,.21);transition:.18s}.loginSubmitBtn:hover{transform:translateY(-1px);box-shadow:0 16px 32px rgba(8,119,185,.27)}.loginSubmitBtn:active{transform:none}.loginDemoBox{margin-top:16px;border:1px solid #e5ecf0;background:#f7fafb;border-radius:12px;padding:10px 11px;display:flex;align-items:center;gap:9px}.demoIcon{width:29px;height:29px;border-radius:9px;display:grid;place-items:center;background:#e8f7f5;color:#0877B9;font-size:9px;font-weight:900}.loginDemoBox b{display:block;font-size:8px;color:#425263}.loginDemoBox small{display:block;font-size:7px;color:#83909d;margin-top:2px;line-height:1.4}.loginTrustLine{display:flex;align-items:center;justify-content:center;gap:5px;margin-top:17px;color:#9aa4ae;font-size:7px}.loginTrustLine span{font-size:8px}
@media(max-width:1180px){.contactPanel{display:none}.inboxPage{grid-template-columns:300px 1fr}.metricGrid{grid-template-columns:repeat(2,1fr)}.automationGrid{grid-template-columns:repeat(2,1fr)}.kanban{grid-template-columns:repeat(7,210px)}}
@media(max-width:900px){.sidebar{transform:translateX(-100%);transition:.25s;box-shadow:20px 0 40px rgba(10,15,25,.22)}.sidebar.open{transform:none}.closeMobile{display:block;margin-left:auto}.main{margin-left:0;width:100%}.menuMobile{display:grid;place-items:center;margin-right:11px}.topbar{padding:0 16px}.topSearch{width:min(380px,55vw)}.pageContent{padding:24px 18px 38px}.dashboardGrid{grid-template-columns:1fr}.agendaGrid{grid-template-columns:1fr}.agendaSide{display:none}.settingsGrid{grid-template-columns:1fr}.settingsCard.span2{grid-column:auto}.loginShell{grid-template-columns:1fr}.loginVisual{display:none}.loginPanel{min-height:100vh}.mobileBrand{display:flex}}
@media(max-width:700px){.pageHead{align-items:flex-start;flex-direction:column}.metricGrid{grid-template-columns:1fr 1fr}.inboxPage{grid-template-columns:1fr}.conversationList{display:none}.chatHeader{padding:0 10px}.humanBtn{font-size:0;width:34px;padding:0;justify-content:center}.humanBtn svg{width:17px}.chatBody{padding:18px 12px}.bubble{max-width:84%}.automationGrid{grid-template-columns:1fr}.integrationBanner{align-items:flex-start;flex-wrap:wrap}.integrationBanner .outlineBtn{margin-left:59px}.steps{flex-direction:column;align-items:stretch}.steps>i{transform:rotate(90deg);text-align:center}.tr{padding:0 12px}.tableToolbar{padding:0 12px}.patientSearch{width:100%}.tableToolbar .outlineBtn{display:none}.loginPanel{padding:25px 20px}}
@media(max-width:480px){.topSearch{display:none}.metricGrid{grid-template-columns:1fr}.topActions{margin-left:auto}.pageHead h1{font-size:24px}.metricCard{padding:16px}.weekStrip button{height:64px}.scheduleList{padding:12px}.scheduleRow{grid-template-columns:45px 1fr}.loginCard h2{font-size:25px}}

@media(max-width:1100px){.premiumLogin{grid-template-columns:1fr 440px}.loginFeatureRow{grid-template-columns:1fr}.loginFeatureRow>div{padding:9px 11px}.loginHero h1{font-size:46px}.loginPreviewCard{margin-top:22px}}
@media(max-width:900px){.premiumLogin{display:block;min-height:100vh}.loginHero{display:none}.loginPanel{min-height:100vh;padding:28px 20px}.premiumCard{padding:30px 26px}.mobileLoginBrand{display:flex}.premiumCard h2{font-size:28px}}
@media(max-width:480px){.loginPanel{padding:16px 12px}.premiumCard{border-radius:20px;padding:25px 20px}.premiumCard h2{font-size:26px}.loginTrustLine{margin-top:14px}}

/* =========================================================
   FACCIALE V3 — CLINICAL BLUE THEME + FUNCTIONAL MODALS
   ========================================================= */
:root{
  --bg:#f3f8fc;
  --card:#ffffff;
  --text:#14324a;
  --muted:#6f8495;
  --line:#dfeaf2;
  --primary:#0877b9;
  --primary2:#159dd0;
  --primaryDark:#075b8d;
  --primarySoft:#eaf6fc;
  --green:#15936a;
  --greenSoft:#eaf8f3;
  --sidebar:#0b2940;
  --shadow:0 9px 28px rgba(16,77,115,.07);
}
html,body{background:var(--bg)}
.sidebar{background:linear-gradient(180deg,#0a2a42 0%,#0c314c 100%)}
.brandMark{background:linear-gradient(135deg,#20a9db,#0877b9);box-shadow:0 8px 22px rgba(6,118,183,.32)}
.clinicAvatar{background:#123d5b;color:#dff5ff}
.sidebar nav button.active{background:linear-gradient(90deg,rgba(27,157,208,.26),rgba(27,157,208,.07));color:#fff}
.sidebar nav button.active svg{color:#64c8ef}
.sidebar nav button i{background:#159dd0}
.avatarSmall{background:#e6f5fc;color:#0877b9}
.topbar{border-bottom-color:#dce9f2;background:rgba(255,255,255,.94)}
.topSearch,.convSearch{border-color:#dce8f0;background:#f7fbfd}
.primaryBtn{background:linear-gradient(135deg,var(--primary2),var(--primary));box-shadow:0 8px 20px rgba(8,119,185,.20);transition:.18s}
.primaryBtn:hover{transform:translateY(-1px);box-shadow:0 11px 24px rgba(8,119,185,.25)}
.outlineBtn{border-color:#cfe0ea;color:#31576e;background:#fff;transition:.18s}
.outlineBtn:hover{border-color:#8dc8e5;background:#f5fbfe;color:#0877b9}
.card,.metricCard{border-color:#ddeaf2;box-shadow:var(--shadow)}
.metricIcon{background:#eaf6fc;color:#0877b9}
.linkBtn{color:#0877b9}
.timelineItem .line i{background:#159dd0;border-color:#d8f2fc}
.bar i{background:linear-gradient(90deg,#2eb0dc,#0877b9)}
.convTitle button{background:#e9f6fc;color:#0877b9}
.filterTabs button.active{background:#e9f6fc;color:#0877b9}
.filterTabs i{background:#159dd0}
.conversationItem:hover{background:#f7fbfe}
.conversationItem.selected{background:#edf8fd;border-left-color:#159dd0}
.botBadge{background:#e8f6fc!important;color:#0877b9!important}
.humanBtn,.sendBtn{background:linear-gradient(135deg,#159dd0,#0877b9)!important}
.contactActions button svg{color:#0877b9;border-color:#cfe3ee;background:#f9fdff}
.flowIcon{background:#eaf6fc;color:#0877b9}
.switch.on{background:#159dd0!important}
.integrationBanner{border-color:#cce5f1!important;background:linear-gradient(135deg,#f4fbfe,#eef8fc)!important}
.weekStrip button.active{background:#eaf6fc!important;color:#0877b9!important}
.weekStrip button.active:after{background:#159dd0!important}
.scheduleBlock{border-left-color:#159dd0;background:#f3faff}
.summaryNumber{background:#edf8fd!important}
.sourcePill{background:#edf6fa;color:#426778}
.stageTag{background:#edf5f9;color:#4c6d7f}
.toast{background:#0b4263!important}

.topQuickBtn{height:34px;padding:0 11px;border:1px solid #cfe4ef;border-radius:9px;background:#eef8fc;color:#0877b9;font-size:10px;font-weight:800;display:flex;align-items:center;gap:6px}
.topQuickBtn:hover{background:#e4f4fb}
.headActions{display:flex;align-items:center;gap:9px}
.emptyMini{padding:30px 14px;text-align:center;color:#8ca0ae;font-size:10px}
.emptyStatePage{height:calc(100vh - 70px);display:grid;place-items:center;align-content:center;text-align:center;color:#7890a0;gap:8px}.emptyStatePage h2{margin:0;color:#24465e;font-size:18px}.emptyStatePage p{margin:0;font-size:11px}

/* Patient table */
.recordCount{margin-left:auto;font-size:10px;font-weight:750;color:#78909f;background:#f3f8fb;border:1px solid #dfebf2;border-radius:8px;padding:6px 9px}
.tr.patientTable{grid-template-columns:1.65fr .75fr .6fr .85fr .75fr .65fr 88px;min-width:1060px}
.tableActions{display:flex;gap:6px;justify-content:flex-start}
.tableActions button,.scheduleActions>button{width:30px;height:30px;border:1px solid #d8e6ef;border-radius:8px;background:#fff;color:#40718d;display:grid;place-items:center;transition:.15s}
.tableActions button:hover,.scheduleActions>button:hover{background:#eaf6fc;color:#0877b9;border-color:#a9d3e8}
.emptyTable{padding:46px 20px;text-align:center;color:#8ba0af;display:flex;align-items:center;flex-direction:column;gap:6px}.emptyTable b{font-size:12px;color:#365d74}.emptyTable span{font-size:10px}

/* Agenda actions */
.capitalize{text-transform:capitalize}
.scheduleBlock{gap:12px}
.scheduleActions{display:flex;align-items:center;gap:6px;flex:0 0 auto}
.statusSelect{height:30px;border:1px solid #d3e3ed;border-radius:8px;background:#fff;padding:0 8px;font-size:8px;font-weight:750;color:#526d7e}
.statusSelect.confirmado{background:#ebf8f2;color:#167954;border-color:#caeadc}
.statusSelect.a-confirmar{background:#fff7e8;color:#946719;border-color:#f2dfb6}
.statusSelect.realizado{background:#eaf6fc;color:#0877b9;border-color:#c6e2ef}
.statusSelect.cancelado{background:#fff0f1;color:#b64f57;border-color:#f1d2d5}
.dangerIcon{color:#b55b62!important}.dangerIcon:hover{background:#fff1f2!important;border-color:#efcfd2!important;color:#b33945!important}
.apptNote{font-size:8px!important;color:#7d93a1!important;margin-top:5px!important;font-style:italic}
.emptySchedule{min-height:230px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:7px;color:#87a0af}.emptySchedule b{font-size:12px;color:#376077}.emptySchedule span{font-size:9px}

/* Modal system */
.modalBackdrop{position:fixed;inset:0;background:rgba(7,31,48,.54);backdrop-filter:blur(5px);display:grid;place-items:center;padding:24px;z-index:200;animation:modalFade .15s ease}
@keyframes modalFade{from{opacity:0}to{opacity:1}}
.modalCard{width:min(560px,100%);max-height:calc(100vh - 48px);overflow:auto;background:#fff;border:1px solid #d9e7ef;border-radius:20px;box-shadow:0 30px 90px rgba(4,45,70,.26);animation:modalRise .18s ease}
.modalCard.large{width:min(760px,100%)}
@keyframes modalRise{from{transform:translateY(8px) scale(.99);opacity:.7}to{transform:none;opacity:1}}
.modalHeader{padding:22px 24px 18px;display:flex;align-items:flex-start;justify-content:space-between;gap:20px;border-bottom:1px solid #e4edf3;background:linear-gradient(180deg,#fbfdff,#f8fcfe)}
.modalHeader h2{margin:4px 0 4px;font-size:20px;letter-spacing:-.025em;color:#173a52}.modalHeader p{margin:0;color:#738b9b;font-size:10px}.modalEyebrow{font-size:8px;letter-spacing:.13em;font-weight:900;color:#1594ca}.modalClose{width:34px;height:34px;border-radius:10px;background:#edf6fa;color:#52768a;display:grid;place-items:center}.modalClose:hover{background:#e2f1f8;color:#0877b9}
.modalBody{padding:22px 24px}.modalFooter{padding:15px 24px 20px;border-top:1px solid #e6eef3;display:flex;justify-content:flex-end;gap:9px;background:#fbfdfe}
.formGrid{display:grid;gap:16px}.formGrid.two{grid-template-columns:1fr 1fr}.field{display:block}.field.full{grid-column:1/-1}.field>span{display:block;font-size:9px;font-weight:800;color:#45677c;margin-bottom:6px}.field>span b{color:#e16368;margin-left:3px}.field input,.field select,.field textarea{width:100%;border:1px solid #d7e5ed;border-radius:10px;background:#fbfdfe;color:#264b61;font-size:10px;transition:.16s}.field input,.field select{height:42px;padding:0 11px}.field textarea{padding:10px 11px;resize:vertical;min-height:82px}.field input:focus,.field select:focus,.field textarea:focus{border-color:#62b8df;background:#fff;box-shadow:0 0 0 3px rgba(21,157,208,.10)}

/* Settings inputs harmonized */
.settingsCard>input{border-color:#d5e5ed;background:#fbfdfe}.settingsCard>input:focus{border-color:#62b8df;box-shadow:0 0 0 3px rgba(21,157,208,.10)}

/* Login recolored to clinical blue */
.loginHero{background:linear-gradient(150deg,#08263d 0%,#0a3452 53%,#07557a 100%)}
.glowOne{background:radial-gradient(circle,rgba(76,191,236,.30),rgba(61,175,225,0) 68%)}
.glowTwo{background:radial-gradient(circle,rgba(20,118,189,.34),rgba(20,118,189,0) 68%)}
.loginLogoMark{background:linear-gradient(145deg,#62cbed,#1596ce);box-shadow:0 12px 35px rgba(21,150,206,.30);color:#062538}
.loginEyebrowPill{border-color:rgba(109,205,240,.24);background:rgba(79,185,226,.10);color:#9eddf5}
.loginHero h1 span{background:linear-gradient(90deg,#78d5f4,#b1eaff 70%);-webkit-background-clip:text;background-clip:text;color:transparent}
.previewAvatar{background:linear-gradient(145deg,#159dd0,#0877b9)}
.previewTag{background:rgba(86,194,236,.11);color:#97def7;border-color:rgba(86,194,236,.18)}
.previewBubble.sent{background:linear-gradient(135deg,#159dd0,#0877b9)}
.loginPanel{background:radial-gradient(circle at 82% 12%,rgba(31,157,207,.10),transparent 26%),#f5fafd}
.loginMiniIcon{background:#eaf6fc;color:#0877b9}.premiumCard .eyebrow,.loginLinkBtn{color:#0877b9}.loginInputWrap:focus-within{border-color:#62b8df;box-shadow:0 0 0 3px rgba(21,157,208,.10)}.rememberCheck input{accent-color:#0877b9}.loginSubmitBtn{background:linear-gradient(135deg,#159dd0,#0877b9);box-shadow:0 12px 28px rgba(8,119,185,.21)}.loginSubmitBtn:hover{box-shadow:0 16px 32px rgba(8,119,185,.27)}.demoIcon{background:#eaf6fc;color:#0877b9}

@media(max-width:900px){.topQuickBtn{display:none}.modalBackdrop{padding:14px}.modalCard,.modalCard.large{max-height:calc(100vh - 28px)}}
@media(max-width:700px){.headActions{width:100%}.headActions .outlineBtn,.headActions .primaryBtn{flex:1}.formGrid.two{grid-template-columns:1fr}.field.full{grid-column:auto}.modalHeader,.modalBody,.modalFooter{padding-left:18px;padding-right:18px}.scheduleBlock{align-items:flex-start;flex-direction:column}.scheduleActions{width:100%}.statusSelect{flex:1}.tr.patientTable{min-width:1000px}}


/* =========================================================
   FACCIALE V4 — STRICT CLINICAL BLUE UI
   This final layer intentionally overrides all legacy MVP colors.
   ========================================================= */
:root{
  --bg:#F4F9FC!important;
  --card:#FFFFFF!important;
  --text:#15384F!important;
  --muted:#6B8394!important;
  --line:#DCE9F1!important;
  --primary:#0A7FC2!important;
  --primary2:#24A5DF!important;
  --primaryDark:#075E91!important;
  --primarySoft:#E9F6FC!important;
  --sidebar:#0B3049!important;
  --shadow:0 10px 30px rgba(15,85,122,.075)!important;
}
html,body{background:#F4F9FC!important;color:#15384F!important}
button,input,textarea,select{font:inherit}
select{appearance:none;-webkit-appearance:none;background-image:linear-gradient(45deg,transparent 50%,#5B7B8D 50%),linear-gradient(135deg,#5B7B8D 50%,transparent 50%);background-position:calc(100% - 14px) 50%,calc(100% - 10px) 50%;background-size:4px 4px,4px 4px;background-repeat:no-repeat;padding-right:30px!important}

/* Global brand and navigation */
.sidebar{background:linear-gradient(180deg,#092A42 0%,#0B3652 100%)!important;border-right:1px solid rgba(255,255,255,.035)}
.brandMark,.loginLogoMark{background:linear-gradient(135deg,#39B3E5,#0877B9)!important;color:#fff!important;box-shadow:0 10px 28px rgba(8,119,185,.27)!important}
.clinicAvatar{background:#124666!important;color:#DFF6FF!important}
.sidebar nav button.active{background:linear-gradient(90deg,rgba(36,165,223,.26),rgba(36,165,223,.07))!important;color:#fff!important;box-shadow:inset 3px 0 0 #43B8E8}
.sidebar nav button.active svg{color:#7DD4F4!important}
.sidebar nav button i{background:#159BD2!important}
.avatarSmall{background:#DFF3FC!important;color:#0877B9!important}
.topbar{background:rgba(255,255,255,.96)!important;border-bottom:1px solid #DCE9F1!important}
.topSearch,.convSearch{background:#F7FBFD!important;border-color:#D9E8F0!important}

/* Every principal action uses clinical blue */
.primaryBtn,.humanBtn,.sendBtn,.loginSubmitBtn{
  background:linear-gradient(135deg,#24A5DF 0%,#0A7FC2 58%,#0874B3 100%)!important;
  color:#fff!important;border:0!important;
  box-shadow:0 8px 20px rgba(8,119,185,.20)!important
}
.primaryBtn:hover,.humanBtn:hover,.sendBtn:hover,.loginSubmitBtn:hover{filter:brightness(.98);transform:translateY(-1px);box-shadow:0 12px 26px rgba(8,119,185,.25)!important}
.outlineBtn{background:#fff!important;border:1px solid #CFE2EC!important;color:#24536E!important}
.outlineBtn:hover{background:#F0F9FD!important;border-color:#8ECBE6!important;color:#0877B9!important}
.linkBtn,.premiumCard .eyebrow,.loginLinkBtn{color:#0877B9!important}
.metricIcon,.flowIcon,.loginMiniIcon,.demoIcon{background:#E9F6FC!important;color:#0877B9!important}
.bar i{background:linear-gradient(90deg,#39B3E5,#0877B9)!important}
.timelineItem .line i{background:#159BD2!important;border-color:#D7F0FB!important}

/* Inbox */
.convTitle button{background:#E9F6FC!important;color:#0877B9!important}
.filterTabs button.active{background:#E9F6FC!important;color:#0877B9!important}
.filterTabs i{background:#159BD2!important}
.conversationItem:hover{background:#F6FBFE!important}
.conversationItem.selected{background:#EDF8FD!important;border-left-color:#159BD2!important}
.botBadge{background:#E6F5FC!important;color:#0877B9!important}

/* Data tables and action buttons */
.card,.metricCard,.dataTable{border-color:#DCE9F1!important;box-shadow:0 10px 28px rgba(15,85,122,.055)!important}
.dataTable{overflow:auto;border-radius:15px;background:#fff}
.tr.th{background:#F7FBFD!important;color:#738B9B!important}
.tr{border-bottom-color:#E6EFF4!important}
.sourcePill{background:#EDF6FA!important;color:#416A80!important}
.stageTag{background:#EAF4F9!important;color:#3F667C!important}
.recordCount{background:#F1F8FB!important;border-color:#DCEAF2!important;color:#6A8393!important}
.tableActions{display:flex!important;align-items:center!important;gap:7px!important}
.tableActions button,.scheduleActions>button{
  width:32px!important;height:32px!important;border-radius:9px!important;
  border:1px solid #D5E5ED!important;background:#fff!important;color:#26729A!important;
  display:grid!important;place-items:center!important;transition:.16s!important;padding:0!important
}
.tableActions button:hover,.scheduleActions>button:hover{background:#E9F6FC!important;border-color:#9DD1E8!important;color:#0877B9!important}

/* Agenda — no native-looking dropdowns */
.weekStrip button.active{background:#E9F6FC!important;color:#0877B9!important}
.weekStrip button.active:after,.weekStrip button.active i{background:#159BD2!important}
.scheduleBlock{border-left:3px solid #159BD2!important;background:#F1FAFE!important;border-radius:0 10px 10px 0!important;padding:10px 12px!important;gap:12px!important}
.scheduleActions{display:flex!important;align-items:center!important;gap:7px!important;flex:0 0 auto!important}
.statusSelect{
  min-width:108px!important;height:32px!important;border:1px solid #CFE1EB!important;border-radius:9px!important;
  background-color:#fff!important;color:#49697B!important;font-size:9px!important;font-weight:800!important;padding:0 28px 0 10px!important
}
.statusSelect:focus{border-color:#59B5DD!important;box-shadow:0 0 0 3px rgba(36,165,223,.12)!important}
.statusSelect.confirmado{background-color:#EAF8F2!important;color:#177650!important;border-color:#CBEADB!important}
.statusSelect.a-confirmar{background-color:#FFF8EA!important;color:#95691C!important;border-color:#F0DFB8!important}
.statusSelect.realizado{background-color:#E9F6FC!important;color:#0877B9!important;border-color:#C8E4F0!important}
.statusSelect.cancelado{background-color:#FFF0F2!important;color:#B54954!important;border-color:#F0D0D4!important}
.summaryNumber{background:#EAF7FC!important}.summaryNumber strong{color:#0877B9!important}
.dangerIcon{color:#B44E59!important}.dangerIcon:hover{background:#FFF0F2!important;border-color:#EDC9CE!important;color:#AC3542!important}

/* Modals — force full styling even if old CSS is cached */
.modalBackdrop{position:fixed!important;inset:0!important;z-index:9999!important;background:rgba(6,39,61,.58)!important;backdrop-filter:blur(6px)!important;display:grid!important;place-items:center!important;padding:24px!important}
.modalCard{width:min(580px,100%)!important;max-height:calc(100vh - 48px)!important;overflow:auto!important;background:#fff!important;border:1px solid #D5E5ED!important;border-radius:20px!important;box-shadow:0 32px 100px rgba(4,52,82,.30)!important}
.modalCard.large{width:min(780px,100%)!important}
.modalHeader{padding:22px 24px 18px!important;display:flex!important;align-items:flex-start!important;justify-content:space-between!important;gap:20px!important;border-bottom:1px solid #E3EDF3!important;background:linear-gradient(180deg,#FCFEFF,#F5FBFE)!important}
.modalHeader h2{font-size:21px!important;color:#153D57!important;margin:4px 0!important}
.modalHeader p{color:#718A9A!important;font-size:11px!important}
.modalEyebrow{color:#0A87C8!important;font-size:9px!important;font-weight:900!important;letter-spacing:.14em!important}
.modalClose{width:36px!important;height:36px!important;border-radius:10px!important;background:#EAF6FC!important;color:#3E6C84!important;display:grid!important;place-items:center!important}
.modalClose:hover{background:#DFF2FB!important;color:#0877B9!important}
.modalBody{padding:23px 24px!important}
.modalFooter{padding:16px 24px 21px!important;border-top:1px solid #E5EEF3!important;background:#FBFDFE!important;display:flex!important;justify-content:flex-end!important;gap:10px!important}
.formGrid{display:grid!important;gap:16px!important}.formGrid.two{grid-template-columns:1fr 1fr!important}
.field{display:block!important;min-width:0}.field.full{grid-column:1/-1!important}
.field>span{display:block!important;margin-bottom:7px!important;font-size:10px!important;font-weight:800!important;color:#365F77!important}.field>span b{color:#DF5D64!important;margin-left:3px!important}
.field input,.field select,.field textarea,.settingsCard input{
  width:100%!important;border:1px solid #D3E3EC!important;border-radius:10px!important;background:#FBFDFE!important;
  color:#244B63!important;font-size:11px!important;transition:.16s!important;box-shadow:none!important
}
.field input,.field select{height:43px!important;padding-left:12px!important}.field textarea{min-height:88px!important;padding:11px 12px!important;resize:vertical!important}
.field input:focus,.field select:focus,.field textarea:focus,.settingsCard input:focus{background:#fff!important;border-color:#58B8E1!important;box-shadow:0 0 0 3px rgba(36,165,223,.12)!important}

/* Pipeline */
.kanbanCol{background:#EEF5F9!important}.kanbanCard{border-color:#D9E7EF!important;box-shadow:0 5px 14px rgba(15,85,122,.045)!important}
.kanbanAdd{color:#0877B9!important;border-color:#CFE4EF!important;background:#F4FBFE!important}

/* Login */
.loginHero{background:linear-gradient(150deg,#08283F 0%,#0A3858 54%,#07648D 100%)!important}
.loginHero h1 span{background:linear-gradient(90deg,#72D0F3,#C3EEFF 75%)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important}
.loginEyebrowPill{border-color:rgba(112,209,244,.25)!important;background:rgba(65,176,220,.11)!important;color:#A7E2F8!important}
.previewAvatar{background:linear-gradient(145deg,#24A5DF,#0877B9)!important}.previewBubble.sent{background:linear-gradient(135deg,#24A5DF,#0877B9)!important}.previewTag{background:rgba(86,194,236,.11)!important;color:#A3E2F8!important;border-color:rgba(86,194,236,.18)!important}
.loginPanel{background:radial-gradient(circle at 82% 12%,rgba(36,165,223,.11),transparent 26%),#F5FAFD!important}
.loginInputWrap:focus-within{border-color:#59B8E0!important;box-shadow:0 0 0 3px rgba(36,165,223,.11)!important}.rememberCheck input{accent-color:#0A7FC2!important}

/* Remove remaining legacy violet from avatars without making status colors monotonous */
.avatar.c3{background:#E7F6FC!important;color:#1779A9!important}
.toast{background:#0B4263!important}

@media(max-width:700px){
  .formGrid.two{grid-template-columns:1fr!important}.field.full{grid-column:auto!important}
  .modalBackdrop{padding:12px!important}.modalCard,.modalCard.large{max-height:calc(100vh - 24px)!important;border-radius:16px!important}
  .scheduleBlock{align-items:flex-start!important;flex-direction:column!important}.scheduleActions{width:100%!important}.statusSelect{flex:1!important}
}

/* FACCIALE V5 — hardening visual self-contained */
html,body{min-height:100%;background:#F4F9FC!important;color:#15384F!important}
body{margin:0!important}
button{appearance:none;-webkit-appearance:none}
select{appearance:auto}
.primaryBtn,.loginSubmitBtn,.humanBtn,.sendBtn{background:linear-gradient(135deg,#159DD0,#0877B9)!important;color:#fff!important}
.sidebar nav button.active{background:linear-gradient(90deg,rgba(10,127,194,.32),rgba(10,127,194,.12))!important}
.sidebar nav button.active svg{color:#82D7F5!important}
.brandMark,.loginLogoMark{background:linear-gradient(145deg,#39B6E8,#0877B9)!important}
.loginHero{background:linear-gradient(150deg,#08283F 0%,#0A3858 54%,#07648D 100%)!important;color:#fff!important;padding:34px clamp(38px,5vw,78px) 30px!important;display:flex!important;flex-direction:column!important}
.loginPanel{background:radial-gradient(circle at 82% 12%,rgba(36,165,223,.09),transparent 26%),#F8FBFD!important}
.loginInputWrap{border:1px solid #D7E5ED!important;background:#FBFDFE!important;border-radius:12px!important}
.loginLinkBtn{background:transparent!important;color:#0877B9!important}
.loginSubmitBtn{border-radius:13px!important;min-height:48px!important}
.rememberCheck input{accent-color:#0877B9!important}
.modalCard{background:#fff!important;border:1px solid #DCEAF2!important}
.statusSelect{border:1px solid #D8E6EE!important;border-radius:9px!important;background:#F8FBFD!important;color:#31566D!important}
.tableActions button,.scheduleActions button{border:1px solid #DCE8EF!important;background:#fff!important;color:#477087!important;border-radius:8px!important}
.tableActions button:hover,.scheduleActions button:hover{border-color:#8DCDE9!important;color:#0877B9!important;background:#F0F9FD!important}
@media(max-width:900px){.loginPanel{min-height:100vh!important}.premiumCard{width:min(430px,100%)!important}}


/* =========================================================
   FACCIALE V6 — COMFORTABLE TYPOGRAPHY / READABILITY
   Larger UI text across dashboard, inbox, patients, pipeline,
   agenda, automations, settings, modals and login.
   ========================================================= */
html,body{font-size:14px!important;line-height:1.45!important}
.eyebrow{font-size:12px!important}
.sidebarBrand b{font-size:16px!important}.sidebarBrand small{font-size:12px!important}
.clinicMini b{font-size:13px!important}.clinicMini small{font-size:11px!important}
.sidebar nav button{font-size:14px!important}.sidebar nav button i{font-size:11px!important}
.statusOnline{font-size:11px!important}.userMini b{font-size:12px!important}.userMini small{font-size:11px!important}
.topSearch input,.convSearch input{font-size:13px!important}.livePill{font-size:12px!important}.topQuickBtn{font-size:12px!important}
.pageHead h1{font-size:31px!important}.pageHead p{font-size:15px!important;line-height:1.45!important}
.primaryBtn{font-size:13px!important}.outlineBtn{font-size:12px!important}
.metricCard>span{font-size:13px!important}.metricCard>strong{font-size:31px!important}.metricCard>div:last-child{font-size:12px!important}
.cardHead h3{font-size:16px!important}.cardHead p{font-size:12px!important}.linkBtn{font-size:12px!important}.softPill{font-size:10.5px!important}
.recentRow .grow b{font-size:13px!important}.recentRow .grow>span{font-size:12px!important}.recentMeta small{font-size:10.5px!important}.stageTag{font-size:10.5px!important}
.timelineItem .time{font-size:12px!important}.appt b{font-size:13px!important}.appt span{font-size:11px!important}.appt em{font-size:10px!important}
.funnelRow>span,.funnelRow>b{font-size:12px!important}

/* Inbox */
.convTitle h2{font-size:20px!important}.filterTabs button{font-size:11.5px!important}
.conversationItem b{font-size:13px!important}.conversationItem small{font-size:10.5px!important}.conversationItem .grow>span{font-size:11px!important}.convBadges em{font-size:9.5px!important}
.chatHeader b{font-size:14px!important}.chatHeader .grow>span{font-size:11px!important}.humanBtn{font-size:11px!important}
.dayDivider{font-size:10px!important}.bubble p{font-size:13px!important;line-height:1.5!important}.bubble>small{font-size:10px!important}.botLabel{font-size:10px!important}
.composer textarea{font-size:12.5px!important}.contactHero h3{font-size:15px!important}.contactHero p{font-size:11px!important}.contactActions button{font-size:10px!important}
.infoTitle{font-size:10.5px!important}.infoTitle button{font-size:10px!important}.infoRow{font-size:11px!important}
.automationStatus b{font-size:11px!important}.automationStatus small{font-size:9.5px!important}.note{font-size:11px!important}.note small{font-size:9px!important}

/* Patients */
.tr{font-size:12.5px!important}.tr.th{font-size:10.5px!important}.patientCell b{font-size:12.5px!important}.patientCell small{font-size:10px!important}
.recordCount{font-size:11.5px!important}.sourcePill{font-size:10.5px!important}.emptyTable b{font-size:14px!important}.emptyTable span{font-size:12px!important}

/* Pipeline */
.kanbanHead{font-size:12px!important}.kanbanHead b{font-size:10.5px!important}.kanbanTop b{font-size:12.5px!important}.kanbanTop small{font-size:10px!important}
.kanbanInfo{font-size:10.5px!important}.kanbanInfo b{font-size:11.5px!important}.kanbanFoot{font-size:10px!important}.addKanban{font-size:11.5px!important}

/* Agenda */
.calendarTop h3{font-size:16px!important}.calendarTop p{font-size:11px!important}.weekStrip span{font-size:9.5px!important}.weekStrip b{font-size:17px!important}
.scheduleTitle b{font-size:13px!important}.scheduleTitle span{font-size:11px!important}.scheduleTime{font-size:12px!important}
.scheduleBlock b{font-size:12.5px!important}.scheduleBlock span{font-size:10.5px!important}.scheduleBlock em{font-size:10px!important}
.statusSelect{font-size:10.5px!important}.apptNote{font-size:10px!important}.agendaSide h3{font-size:15px!important}.summaryNumber span{font-size:11px!important}.miniStats span{font-size:11px!important}.agendaSide h4{font-size:12px!important}.professional b{font-size:11.5px!important}.professional small{font-size:10px!important}

/* Automations & settings */
.automationCard h3{font-size:14px!important}.automationCard>p{font-size:11px!important}.flowBottom span,.flowBottom em{font-size:10px!important}
.integrationBanner h3{font-size:14px!important}.integrationBanner p{font-size:11px!important}.settingsTitle h3{font-size:14px!important}.settingsTitle p{font-size:11px!important}
.settingsCard>label{font-size:11px!important}.settingsCard>input{font-size:12.5px!important}.connectionBox b{font-size:11px!important}.connectionBox small{font-size:10px!important}.helpText{font-size:10px!important}.statusConnected{font-size:10px!important}
.steps strong{font-size:11px!important}.steps small{font-size:10px!important}.toast{font-size:12px!important}
.emptyMini{font-size:12px!important}.emptyStatePage h2{font-size:21px!important}.emptyStatePage p{font-size:13px!important}

/* Modals */
.modalHeader h2{font-size:24px!important}.modalHeader p{font-size:13px!important}.modalEyebrow{font-size:10.5px!important}
.field>span{font-size:11.5px!important}.field input,.field select,.field textarea,.settingsCard input{font-size:13px!important}

/* Login */
.loginBrandLockup strong,.mobileLoginBrand strong{font-size:17px!important}.loginBrandLockup small,.mobileLoginBrand small{font-size:10px!important}
.loginSecureBadge{font-size:10px!important}.loginEyebrowPill{font-size:10px!important}.loginHeroContent>p{font-size:15px!important;line-height:1.6!important}
.loginFeatureRow i{font-size:10px!important}.loginFeatureRow b{font-size:11px!important}.loginFeatureRow small{font-size:9.5px!important}
.previewContact b{font-size:11px!important}.previewContact small{font-size:9px!important}.previewTag{font-size:9px!important}.previewBubble{font-size:10.5px!important}.previewBubble time{font-size:8px!important}
.previewStatus b{font-size:10px!important}.previewStatus small{font-size:9px!important}.previewPulse{font-size:9px!important}.loginHeroFooter{font-size:9.5px!important}
.premiumCard .eyebrow{font-size:10.5px!important}.premiumCard h2{font-size:32px!important}.premiumCard .loginFormIntro>p{font-size:13.5px!important;line-height:1.5!important}
.loginFieldGroup>label,.loginLabelRow label{font-size:11px!important}.loginLinkBtn{font-size:10px!important}.loginInputWrap input{font-size:13px!important}.passwordToggle{font-size:10px!important}.rememberCheck{font-size:10.5px!important}.loginSubmitBtn{font-size:13px!important}
.loginDemoBox b{font-size:10px!important}.loginDemoBox small{font-size:9px!important}.loginTrustLine{font-size:9px!important}.loginTrustLine span{font-size:10px!important}

@media(max-width:700px){
  .pageHead h1{font-size:28px!important}.pageHead p{font-size:14px!important}
  .tr{font-size:12px!important}.bubble p{font-size:13px!important}
}
`;

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
const stageAccent = { 'Novo lead':'#1696d2', 'Contato iniciado':'#f2a12c', 'Qualificado':'#2279c9', 'Consulta marcada':'#19a974', 'Orçamento':'#2d83c5', 'Tratamento':'#0d8fa8', 'Finalizado':'#708090' };
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
  const [email, setEmail] = useState('admin@facciale.com.br');
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
      <form className="loginCard premiumCard" onSubmit={(e)=>{e.preventDefault(); localStorage.setItem('facciale_crm_session','1'); onLogin();}}>
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
    setAuthenticated(localStorage.getItem('facciale_crm_session') === '1' || localStorage.getItem('odonto_crm_session') === '1');
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
      <div className="sidebarBottom"><div className="statusOnline"><span></span> WhatsApp conectado</div><div className="userMini"><div className="avatarSmall">CM</div><div><b>Camila Martins</b><small>Administradora</small></div><button title="Sair" onClick={()=>{localStorage.removeItem('facciale_crm_session');setAuthenticated(false)}}><Icon name="logout" size={17}/></button></div></div>
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

export default function Home(){ return <><style dangerouslySetInnerHTML={{__html:FACCIALE_INLINE_CSS}}/><AppShell/></>; }
