export const plans = [
 {id:'essential',name:'Essential',tag:'Your foundation.',monthly:95,annual:1020,benefits:['Unlimited gym access','Strength & functional areas','Member app & class schedule'],level:0},
 {id:'performance',name:'Performance',tag:'Build your momentum.',monthly:145,annual:1500,benefits:['Everything in Essential','Unlimited group classes','Personal progress tracking'],level:1},
 {id:'private',name:'Private',tag:'A focus entirely on you.',monthly:285,annual:3000,benefits:['Everything in Performance','4 coaching sessions / month','4 recovery sessions / month'],level:2}
];
export const features=[['Gym & standard training areas',0],['Group classes',1],['Progress tracking',1],['Personal coaching',2],['Recovery sessions',2]];
export const classes=[
 {id:'c1',day:'Monday',time:'07:00',name:'Strength Foundations',type:'Strength',coach:'Alex Morgan',duration:50},
 {id:'c2',day:'Monday',time:'18:30',name:'Athletic Engine',type:'Performance',coach:'Jordan Lee',duration:45},
 {id:'c3',day:'Tuesday',time:'08:00',name:'Mobility & Restore',type:'Recovery',coach:'Sam Rivera',duration:40},
 {id:'c4',day:'Wednesday',time:'12:00',name:'Lift with Intent',type:'Strength',coach:'Alex Morgan',duration:50},
 {id:'c5',day:'Thursday',time:'18:00',name:'Conditioning Club',type:'Performance',coach:'Jordan Lee',duration:45},
 {id:'c6',day:'Friday',time:'17:30',name:'Recovery Ritual',type:'Recovery',coach:'Sam Rivera',duration:40}
];
export const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:n%1?2:0}).format(n);
export const cost=(plan,billing)=>billing==='annual'?plan.annual:plan.monthly;
export const savings=plan=>Math.round((1-plan.annual/(12*plan.monthly))*100);
export const defaultState={version:1,profile:null,session:false,plan:'performance',billing:'monthly',method:'card',outcome:'success',membership:null,payments:[],bookings:[]};
const validPlan=id=>plans.some(p=>p.id===id);
const validBill=b=>['monthly','annual'].includes(b);
export function sanitize(raw){
 if(!raw || raw.version!==1)return {...defaultState};
 const profile=raw.profile&&typeof raw.profile.name==='string'&&typeof raw.profile.email==='string'?{name:raw.profile.name.slice(0,70),email:raw.profile.email.slice(0,120)}:null;
 const payments=Array.isArray(raw.payments)?raw.payments.filter(p=>p&&typeof p.ref==='string'&&p.ref.startsWith('DEMO-')&&validPlan(p.plan)&&validBill(p.billing)&&Number.isFinite(p.amount)&&p.amount>=0&&typeof p.date==='string'&&Number.isFinite(Date.parse(p.date))).slice(-30).map(p=>({ref:p.ref,plan:p.plan,billing:p.billing,amount:p.amount,date:p.date,status:'Simulated success'})):[];
 const m=raw.membership;const membership=m&&validPlan(m.plan)&&validBill(m.billing)&&payments.some(p=>p.ref===m.ref)?{plan:m.plan,billing:m.billing,ref:m.ref}:null;
 return {version:1,profile,session:!!profile&&raw.session===true,plan:validPlan(raw.plan)?raw.plan:'performance',billing:validBill(raw.billing)?raw.billing:'monthly',method:raw.method==='upi'?'upi':'card',outcome:['success','declined','cancelled'].includes(raw.outcome)?raw.outcome:'success',membership,payments,bookings:Array.isArray(raw.bookings)?[...new Set(raw.bookings.filter(id=>classes.some(c=>c.id===id)))]:[]};
}
export function readState(){try{return sanitize(JSON.parse(localStorage.getItem('form-demo-v1')))}catch{return {...defaultState}}}
