const icon=(name,cls='')=>{const fa={home:'fa-house',folder:'fa-folder',users:'fa-users',book:'fa-book-bible',heart:'fa-heart',wallet:'fa-wallet',calendar:'fa-calendar-days',settings:'fa-gear',file:'fa-file-lines',chart:'fa-chart-line',cross:'fa-cross',bell:'fa-bell',megaphone:'fa-bullhorn',trophy:'fa-trophy',pray:'fa-hands-praying',church:'fa-church',map:'fa-location-dot',rupee:'fa-indian-rupee-sign',chevLeft:'fa-chevron-left',chevRight:'fa-chevron-right',down:'fa-chevron-down',search:'fa-magnifying-glass',menu:'fa-bars'};return `<i class="fa-solid ${fa[name]||fa.folder} ${cls}" aria-hidden="true"></i>`};const navData={'Parish Administration':['Upcoming Events & Services','Sacrament Reports','Birthdays & Anniversaries','Prayer Request Summary','Notifications & Announcements','Committee Activity Overview','Branch Church Overview'],'Member Management':['Family Registration','Individual Member Registration','Member Directory','New Member Enrollment','Visitor Management','Member Transfer In','Member Transfer Out','Inactive Member Tracking','Migrated Member Tracking','Senior Citizen Registry','Widow/Widower Registry','Member Photo Management'],'Sacramental Records':['Baptism Register','Confirmation Register','Holy Communion Register','Marriage Register','Funeral Register','Membership Certificate','Transfer Certificate','Baptism Certificate','Marriage Certificate','Confirmation Certificate'],'Family Management':['Family Directory','Family Tree','Family Visit Records','Family Contribution History'],'Finance & Accounting':['Tithe Collection','Sunday Offerings','Special Offerings','Mission Offerings','Donation Management','Donor Management','Expense Management','Income Management','General Ledger','Budget Planning','Fund Accounting','Endowment Fund Management','Payroll Management','Bank Reconciliation','Audit Management','Financial Statements'],'Online Giving & Payments':['Online Donation Portal','Payment Gateway Integration','Donation Receipt Generation','Recurring Donations','Donation Analytics'],'Sunday School Management':['Student Registration','Teacher Management','Class Management','Attendance Tracking','Exam Management','Progress Reports','Vacation Bible School'],'Youth Ministry':['Youth Registration','Youth Events','Youth Attendance','Youth Leadership Management','Youth Reports'],"Women's Fellowship":['Women Members','Women Programs','Women Attendance','Women Reports'],"Men's Fellowship":['Men Members','Men Programs','Men Attendance','Men Reports'],'Choir & Worship Team':['Choir Members','Practice Scheduling','Worship Team Roster','Song Library','Special Service Planning'],'Prayer Ministry':['Prayer Requests','Prayer Cell Management','Cottage Prayer Management','Intercessory Team Management','Prayer Reports'],'Event Management':['Church Calendar','Convention Management','Retreat Management','Seminar Management','Special Services','Event Registration','Volunteer Assignment'],'Volunteer Management':['Volunteer Registration','Skill Management','Duty Assignment','Duty Roster','Volunteer Attendance'],'Communication Module':['SMS Notifications','WhatsApp Integration','Email Broadcasting','Push Notifications','Church Announcements','Newsletter Management','Birthday Greetings','Anniversary Greetings'],'Cemetery Management':['Burial Records','Grave Allocation','Cemetery Mapping','Cemetery Reports'],'Asset Management':['Church Property Register','Building Management','Land Records','Vehicle Management','Furniture Inventory','Equipment Inventory','Asset Maintenance'],'Facility Booking':['Hall Booking','Auditorium Booking','Resource Booking','Booking Approval Workflow'],'Human Resource Management':['Staff Management','Employee Records','Leave Management','Payroll Processing','Performance Tracking','Retirement Tracking'],'Document Management':['Meeting Minutes','Circulars','Legal Documents','Property Documents','Policies & Procedures','Digital Archive'],'Election Management (CSI Specific)':['Parish Elections','Voter Registration','Nomination Management','Candidate Management','Voting Management','Election Results'],'Mission & Evangelism':['Mission Field Management','Missionary Records','Evangelism Events','Outreach Programs','Mission Fund Tracking'],'Reports & Analytics':['Membership Reports','Family Reports','Attendance Reports','Financial Reports','Donation Reports','Sacrament Reports','Sunday School Reports','Ministry Reports','Asset Reports','Diocese MIS Dashboard'],'Settings':['General Settings','Diocese Settings','Parish Settings','Payment Settings','SMS Settings','Email Settings','Backup & Restore','Audit Logs']};
function setupNav(){
  const nav=document.getElementById('navMenu');if(!nav)return;
  const page=(location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const iconNames=['folder','users','book','users','wallet','wallet','book','users','heart','users','heart','heart','calendar','users','bell','cross','folder','calendar','users','file','folder','heart','chart','settings'];
  const linkFor=(title,sub)=>{
    if(title==='Parish Administration' && sub==='Upcoming Events & Services') return 'UpcomingEventsServices.html';
    if(title==='Parish Administration' && sub==='Sacrament Reports') return 'SacramentReports.html';
    if(title==='Parish Administration' && sub==='Birthdays & Anniversaries') return 'BirthdaysAnniversaries.html';
    if(title==='Parish Administration' && sub==='Prayer Request Summary') return 'PrayerRequestSummary.html';
    if(title==='Parish Administration' && sub==='Notifications & Announcements') return 'NotificationsAnnouncements.html';
    if(title==='Parish Administration' && sub==='Committee Activity Overview') return 'CommitteeActivityOverview.html';
    if(title==='Parish Administration' && sub==='Branch Church Overview') return 'BranchChurchOverview.html';
    if(title==='Parish Administration') return 'ParishAdministration.html';
    return '#';
  };
  const isSubActive=(title,sub)=>{
    if(page==='upcomingeventsservices.html' && title==='Parish Administration' && sub==='Upcoming Events & Services') return true;
    if(page==='sacramentreports.html' && title==='Parish Administration' && sub==='Sacrament Reports') return true;
    if(page==='birthdaysanniversaries.html' && title==='Parish Administration' && sub==='Birthdays & Anniversaries') return true;
    if(page==='prayerrequestsummary.html' && title==='Parish Administration' && sub==='Prayer Request Summary') return true;
    if(page==='notificationsannouncements.html' && title==='Parish Administration' && sub==='Notifications & Announcements') return true;
    if(page==='committeeactivityoverview.html' && title==='Parish Administration' && sub==='Committee Activity Overview') return true;
    if(page==='branchchurchoverview.html' && title==='Parish Administration' && sub==='Branch Church Overview') return true;
    return false;
  };
  const isMainActive=(title)=>{
    if(page==='parishadministration.html' && title==='Parish Administration') return true;
    if((page==='upcomingeventsservices.html'||page==='sacramentreports.html'||page==='birthdaysanniversaries.html'||page==='prayerrequestsummary.html'||page==='notificationsannouncements.html'||page==='committeeactivityoverview.html'||page==='branchchurchoverview.html') && title==='Parish Administration') return true;
    return false;
  };
  nav.innerHTML=`<div class="nav-group"><a class="nav-main ${page==='index.html'?'active':''}" href="index.html"><span class="nav-icon">${icon('home')}</span><span class="nav-title">Dashboard</span></a></div>`+
  Object.keys(navData).map((title,i)=>{
    const active=isMainActive(title);
    const mainHref=title==='Parish Administration'?'ParishAdministration.html':'#';
    return `<div class="nav-group ${active?'open':''}"><a class="nav-main ${active?'active':''}" href="${mainHref}"><span class="nav-icon">${icon(iconNames[i])}</span><span class="nav-title">${title}</span><span class="nav-arrow">${icon('down')}</span></a><div class="subnav">${navData[title].map(sub=>`<a class="${isSubActive(title,sub)?'active':''}" href="${linkFor(title,sub)}"><span class="sub-dash">-</span> ${sub}</a>`).join('')}</div></div>`
  }).join('');
  document.querySelectorAll('.nav-main').forEach(btn=>btn.addEventListener('click',e=>{
    const g=btn.closest('.nav-group');
    if(g.querySelector('.subnav')){if(btn.getAttribute('href')==='#')e.preventDefault();g.classList.toggle('open')}
    document.querySelectorAll('.nav-main').forEach(b=>b.classList.remove('active'));btn.classList.add('active')
  }));
}
function setupTop(){const cb=document.getElementById('calendarBtn');if(cb)cb.innerHTML=icon('calendar');const nb=document.getElementById('notifyBtn');if(nb)nb.innerHTML=icon('bell')+'<small>12</small>';document.querySelectorAll('.profile-caret,[data-svg=\"down\"],.inline-caret').forEach(el=>el.innerHTML=icon('down'));const db=document.getElementById('dateBtn');if(db)db.innerHTML=(document.body.classList.contains('parish-page')?'18 May 2025':'Sunday, 18 May 2025')+' <span>'+icon('calendar')+'</span>';}
setupNav();setupTop();
const side=document.getElementById('sidebar'),over=document.getElementById('overlay');const menu=document.getElementById('menuBtn');if(menu)menu.onclick=()=>{if(innerWidth>820){document.querySelectorAll('.nav-group.open').forEach(g=>g.classList.remove('open'));document.body.classList.toggle('desktop-collapsed')}else{side?.classList.toggle('open');over?.classList.toggle('show')}};if(over)over.onclick=()=>{side?.classList.remove('open');over.classList.remove('show')};
const modal=document.getElementById('modal'),modalContent=document.getElementById('modalContent');function cleanupModalState(){document.body.classList.remove('announcement-modal','category-modal-open','announcement-view-open')}function showModal(html){if(!modal)return;modalContent.innerHTML=html;modal.classList.add('show')}document.getElementById('modalClose')?.addEventListener('click',()=>{modal.classList.remove('show');cleanupModalState()});modal?.addEventListener('click',e=>{if(e.target===modal){modal.classList.remove('show');cleanupModalState()}});
const dropdown=document.getElementById('dropdownPanel');function showDrop(anchor,html,w=300){if(!dropdown)return;dropdown.innerHTML=html;dropdown.style.width=w+'px';dropdown.classList.add('show');const r=anchor.getBoundingClientRect();dropdown.style.top=(r.bottom+8)+'px';dropdown.style.right=Math.max(10,(innerWidth-r.right+2))+'px';dropdown.onclick=e=>e.stopPropagation();}document.addEventListener('click',e=>{if(!dropdown?.contains(e.target)&&!e.target.closest('.icon-btn,.date-btn,.profile-pill,.drop-item,.month-arrow,.calendar-mini span'))dropdown?.classList.remove('show')});
let calMonth=4,calYear=2025,selectedDay=18;function calendarHtml(){const names=['January','February','March','April','May','June','July','August','September','October','November','December'];const first=new Date(calYear,calMonth,1).getDay(),days=new Date(calYear,calMonth+1,0).getDate();let cells=['SUN','MON','TUE','WED','THU','FRI','SAT'];for(let i=0;i<first;i++)cells.push('');for(let d=1;d<=days;d++)cells.push(d);return `<div class="calendar-popup-head"><button class="month-arrow" id="prevMonth" type="button">${icon('chevLeft')}</button><b>${names[calMonth]} ${calYear}</b><button class="month-arrow" id="nextMonth" type="button">${icon('chevRight')}</button></div><div class="calendar-mini">${cells.map((d,i)=>`<span data-day="${typeof d==='number'?d:''}" class="${d==selectedDay&&calMonth==4&&calYear==2025?'active':''} ${d===''?'blank':''} ${i<7?'day-name':''}">${d}</span>`).join('')}</div>`}
function bindCalendar(){document.getElementById('prevMonth')?.addEventListener('click',ev=>{ev.stopPropagation();calMonth--;if(calMonth<0){calMonth=11;calYear--}dropdown.innerHTML=calendarHtml();bindCalendar();});document.getElementById('nextMonth')?.addEventListener('click',ev=>{ev.stopPropagation();calMonth++;if(calMonth>11){calMonth=0;calYear++}dropdown.innerHTML=calendarHtml();bindCalendar();});dropdown?.querySelectorAll('.calendar-mini span[data-day]').forEach(s=>s.onclick=ev=>{ev.stopPropagation();if(!s.dataset.day)return;selectedDay=+s.dataset.day;dropdown.querySelectorAll('.calendar-mini span').forEach(x=>x.classList.remove('active'));s.classList.add('active');const dateBtn=document.getElementById('dateBtn');if(dateBtn){const names=['January','February','March','April','May','June','July','August','September','October','November','December'];dateBtn.innerHTML=`${selectedDay} ${names[calMonth]} ${calYear} <span>${icon('calendar')}</span>`}})}
document.getElementById('calendarBtn')?.addEventListener('click',e=>{e.stopPropagation();showDrop(e.currentTarget,calendarHtml(),292);bindCalendar()});document.getElementById('dateBtn')?.addEventListener('click',e=>{e.stopPropagation();showDrop(e.currentTarget,calendarHtml(),292);bindCalendar()});
document.getElementById('notifyBtn')?.addEventListener('click',e=>{e.stopPropagation();showDrop(e.currentTarget,`<div class="drop-title">Notifications</div><button class="drop-item"><b>New family registered</b><span>Sarah Elizabeth family added.</span></button><button class="drop-item"><b>Donation received</b><span>₹10,000 tithe received.</span></button><button class="drop-item"><b>Event reminder</b><span>Youth Fellowship at 6 PM.</span></button>`,320)});document.getElementById('profileBtn')?.addEventListener('click',e=>{e.stopPropagation();showDrop(e.currentTarget,`<div class="drop-profile"><span class="profile-dot">PO</span><div><b>Parish Office</b><small>St. John's Church</small></div></div><button class="drop-item">Profile Settings</button><button class="drop-item">Account Preferences</button><button class="drop-item">Logout</button>`,260)});
function initDashboard(){if(!document.getElementById('statsGrid'))return;const stats=[['users','Total Families','1,248','↑ 24 this month'],['users','Total Members','4,732','↑ 68 this month'],['users','Active Members','3,890','82.2% of total'],['cross','Baptized Members','4,215','↑ 55 this month'],['users','New Members','32','↑ 12 this month'],['wallet','Contributions (May)','₹ 2,45,780','↑ 15.6% vs Apr']];statsGrid.innerHTML=stats.map(s=>`<div class="stat-card"><div class="stat-icon">${icon(s[0])}</div><div><h4>${s[1]}</h4><div class="num">${s[2]}</div><div class="trend">${s[3]}</div></div></div>`).join('');const events=[['MAY','20','Youth Fellowship Meeting','Tuesday, 6:00 PM','Youth Hall'],['MAY','25','Sunday School Anniversary','Sunday, 9:30 AM','Main Auditorium'],['JUN','01','Holy Communion Service','Sunday, 8:00 AM','Main Church'],['JUN','07',"Women's Fellowship Meeting",'Saturday, 4:00 PM','Fellowship Hall'],['JUN','15','Parish Council Meeting','Sunday, 5:00 PM','Conference Room']];eventsList.innerHTML=events.map((e,i)=>`<div class="event"><div class="datebox" style="background:${i==2?'#fff1e6':i==3?'#e8faec':i==4?'#f1edff':'#eaf8ff'}"><span>${e[0]}</span>${e[1]}</div><div><h4>${e[2]}</h4><p>${e[3]}</p><div class="event-meta"><span></span><span>${icon('map')} ${e[4]}</span></div></div></div>`).join('');const sch=[['08:00 AM','Holy Communion Service','Main Church'],['09:30 AM','Sunday School Classes','Sunday School Rooms'],['11:00 AM','English Service','Main Church'],['04:00 PM','Choir Practice','Music Room'],['06:00 PM','Youth Meeting','Youth Hall']];scheduleList.innerHTML=sch.map(s=>`<div class="schedule"><b>${s[0]}</b><i></i><div><h4>${s[1]}</h4><p>${s[2]}</p></div></div>`).join('');sacramentList.innerHTML=[['cross','Baptisms','56'],['book','Confirmations','48'],['trophy','First Communions','62'],['heart','Marriages','18'],['cross','Funerals','23']].map(x=>`<div class="list-row"><div class="list-left"><span class="mini-icon">${icon(x[0])}</span>${x[1]}</div><span>${x[2]}</span></div>`).join('');financeList.innerHTML=[['Tithe','₹ 1,20,000 (48.9%)'],['Offerings','₹ 65,300 (26.6%)'],['Donations','₹ 45,250 (18.4%)'],['Other Income','₹ 15,230 (6.1%)']].map((x,i)=>`<div class="list-row"><div class="list-left"><span class="dot ${['teal','green','orange',''][i]}" style="${i==3?'background:#8b65d6':''};width:10px;height:10px"></span>${x[0]}</div><span>${x[1]}</span></div>`).join('');prayerList.innerHTML=[['file','New Requests','12'],['pray','In Prayer','28'],['heart','Answered','45'],['chart','Total Requests','85']].map(x=>`<div class="list-row"><div class="list-left"><span class="mini-icon">${icon(x[0])}</span>${x[1]}</div><span>${x[2]}</span></div>`).join('');const quick=['Add Family','Add Member','Record Baptism','Record Marriage','Add Donation','Create Event','Send Announcement','View Reports'];const qicons=['users','users','cross','heart','rupee','calendar','megaphone','chart'];quickActions.innerHTML=quick.map((q,i)=>`<button data-action="${q}"><span>${icon(qicons[i])}</span>${q}</button>`).join('');function table(id,heads,rows){document.getElementById(id).innerHTML=`<thead><tr>${heads.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>`}table('regTable',['Name','Type','Date','Added By'],[['James Thomas','New Member','18/05/2025','Parish Office'],['Anna Grace','New Member','18/05/2025','Parish Office'],['Michael David','New Member','17/05/2025','Parish Office'],['Sarah Elizabeth','New Family','16/05/2025','Parish Office'],['Daniel Varghese','New Member','16/05/2025','Parish Office']]);table('contribTable',['Donor Name','Amount','Type','Date'],[['John Samuel','₹ 10,000','Tithe','18/05/2025'],['Mary Samuel','₹ 5,000','Sunday Offering','18/05/2025'],['David Joseph','₹ 7,500','Donation','17/05/2025'],['George Thomas','₹ 3,000','Mission Offering','17/05/2025'],['Anna Mathew','₹ 2,500','Special Offering','16/05/2025']]);announcementList.innerHTML=[['users','Bible Convention 2025','Annual Bible Convention will be held from May 30 - June 1, 2025.','17 May 2025'],['calendar','Church Office Holiday','Church office will be closed on May 20, 2025 due to staff retreat.','16 May 2025'],['heart','Blood Donation Camp','Blood donation camp on June 5, 2025. Please participate and support.','15 May 2025']].map(a=>`<div class="announce"><span class="stat-icon small-soft">${icon(a[0])}</span><div><h4>${a[1]}</h4><p>${a[2]}</p></div><span class="date">${a[3]}</span></div>`).join('');document.querySelectorAll('#quickActions button').forEach(b=>b.onclick=()=>quickForm(b.dataset.action));lineChart();donut();window.addEventListener('resize',lineChart);viewCalendar.onclick=()=>showModal(`<h2>Church Calendar</h2>${events.map(e=>`<div class="list-row"><div>${e[0]} ${e[1]} - ${e[2]}<br><small>${e[3]} • ${e[4]}</small></div></div>`).join('')}`);viewSchedule.onclick=()=>showModal(`<h2>Today's Schedule</h2>${sch.map(s=>`<div class="list-row"><div>${s[0]} - ${s[1]}<br><small>${s[2]}</small></div></div>`).join('')}`)}
function quickForm(title){showModal(`<h2>${title}</h2><div class="form-grid"><div class="field"><label>Name / Title</label><input placeholder="Enter ${title.toLowerCase()}"></div><div class="field"><label>Date</label><input type="date"></div><div class="field"><label>Status</label><select><option>Active</option><option>Pending</option><option>Completed</option></select></div><div class="field"><label>Category</label><input placeholder="Category"></div><div class="field full"><label>Notes</label><textarea rows="3" placeholder="Add notes"></textarea></div></div><div class="modal-actions"><button class="btn ghost" onclick="modal.classList.remove('show')">Cancel</button><button class="btn primary">Save</button></div>`)}
function lineChart(){const c=document.getElementById('memberChart');if(!c)return;const ctx=c.getContext('2d'),w=c.width,h=c.height,p=38;ctx.clearRect(0,0,w,h);ctx.font='12px Open Sans';ctx.strokeStyle='#d9e3ec';ctx.fillStyle='#123';for(let i=0;i<=5;i++){let y=p+i*(h-2*p)/5;ctx.beginPath();ctx.moveTo(p,y);ctx.lineTo(w-p,y);ctx.stroke();ctx.fillText(['5K','4K','3K','2K','1K','0'][i],8,y+4)}['Dec 2024','Jan 2025','Feb 2025','Mar 2025','Apr 2025','May 2025'].forEach((l,i)=>ctx.fillText(l,p+i*(w-2*p)/5-22,h-8));function plot(data,color,max=5000){ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=2;ctx.beginPath();data.forEach((v,i)=>{let x=p+i*(w-2*p)/5,y=h-p-(v/max)*(h-2*p);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke();data.forEach((v,i)=>{let x=p+i*(w-2*p)/5,y=h-p-(v/max)*(h-2*p);ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill()})}plot([3400,3800,4000,4200,4350,4500],'#0077b6');plot([2900,3150,3400,3550,3700,3850],'#22b638');plot([350,460,520,590,660,760],'#ff7518')}
function donut(){const c=document.getElementById('donutChart');if(!c)return;const ctx=c.getContext('2d'),cx=95,cy=95,r=72,vals=[48.9,26.6,18.4,6.1],cols=['#16a9b4','#27bd38','#ff9f1c','#8b65d6'];let start=-Math.PI/2;ctx.clearRect(0,0,c.width,c.height);vals.forEach((v,i)=>{let end=start+v/100*Math.PI*2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,start,end);ctx.fillStyle=cols[i];ctx.fill();start=end});ctx.globalCompositeOperation='destination-out';ctx.beginPath();ctx.arc(cx,cy,39,0,Math.PI*2);ctx.fill();ctx.globalCompositeOperation='source-over';ctx.fillStyle='#07183d';ctx.font='700 16px Open Sans';ctx.textAlign='center';ctx.fillText('₹ 2,45,780',cx,cy-2);ctx.font='11px Open Sans';ctx.fillText('Total Income',cx,cy+15)}
function initParish(){if(!document.body.classList.contains('parish-page'))return;const cards=[['calendar','Upcoming Events','12','This Month','View Calendar'],['trophy','Sacraments This Year','186','Completed','View Reports'],['pray','Prayer Requests','85','Total Requests','View Summary'],['megaphone','Announcements','8','Active','View All'],['users','Active Committees','15','Committees','View Overview'],['church','Branch Churches','4','Branches','View Overview']];document.getElementById('parishStats').innerHTML=cards.map(c=>`<div class="stat-card parish-stat"><div class="stat-icon flat">${icon(c[0])}</div><div><h4>${c[1]}</h4><div class="num">${c[2]}</div><p>${c[3]}</p><a>${c[4]} ${icon('chevRight')}</a></div></div>`).join('');document.getElementById('parishEvents').innerHTML=[['MAY','20','Youth Fellowship Meeting','Tuesday, 6:00 PM','Youth Hall'],['MAY','25','Sunday School Anniversary','Sunday, 9:30 AM','Main Auditorium'],['JUN','01','Holy Communion Service','Sunday, 8:00 AM','Main Church'],['JUN','07',"Women’s Fellowship Meeting",'Saturday, 4:00 PM','Fellowship Hall'],['JUN','15','Parish Council Meeting','Sunday, 5:00 PM','Conference Room']].map((e,i)=>`<div class="event parish-event"><div class="datebox"><span>${e[0]}</span>${e[1]}</div><div class="event-copy"><h4>${e[2]}</h4><p>${e[3]}</p></div><div class="event-meta">${icon('map')} <span>${e[4]}</span></div></div>`).join('');document.getElementById('parishAnnouncements').innerHTML=[['Bible Convention 2025','Annual Bible Convention will be held from May 30 – June 1, 2025.','17 May 2025'],['Church Office Holiday','Church office will be closed on May 20, 2025 due to staff retreat.','16 May 2025'],['Blood Donation Camp','Blood donation camp on June 5, 2025. Please participate and support.','15 May 2025'],['Sunday School Summer Classes','Summer classes will begin from June 10, 2025.','14 May 2025'],['Youth Retreat Registration','Register for Youth Retreat before May 25, 2025.','13 May 2025']].map((a,i)=>`<div class="notice notice-${i}"><div><h4>${a[0]}</h4><p>${a[1]}</p></div><span>${a[2]}</span></div>`).join('');document.getElementById('birthdays').innerHTML=['John Samuel|20 May','Mary Samuel|21 May','David Samuel|22 May','Ruth Samuel|23 May','Anna Samuel|24 May'].map(x=>{let [n,d]=x.split('|');return `<div class="person-row"><i>${n.split(' ').map(s=>s[0]).join('')}</i><b>${n}</b><span>${d}</span></div>`}).join('');document.getElementById('anniversaries').innerHTML=['John & Mary Samuel|20 May','David & Ruth Samuel|22 May','Daniel & Anna Samuel|24 May'].map(x=>{let [n,d]=x.split('|');return `<div class="person-row"><i>${icon('users')}</i><b>${n}</b><span>${d}</span></div>`}).join('');document.getElementById('committee').innerHTML=['Parish Council|8 / 10|88','Finance Committee|6 / 8|70','Worship Committee|7 / 10|76','Youth Committee|5 / 7|68','Outreach Committee|6 / 9|72'].map(x=>{let[n,c,w]=x.split('|');return `<div class="progress-row"><span>${icon('users')} ${n}</span><b>${c}</b><i><em style="width:${w}%"></em></i></div>`}).join('');document.getElementById('branchTable').innerHTML='<thead><tr><th>Branch Church</th><th>Location</th><th>Families</th><th>Members</th><th>Last Service</th><th>Activities</th><th>Status</th></tr></thead><tbody>'+[['St. Peter’s Church','Nagercoil','120','456','18 May 2025','Sunday Service, Prayer Meet'],['Good Shepherd Church','Kanyakumari','86','312','18 May 2025','Sunday School, Bible Study'],['CSI Bethel Church','Marungoor','64','198','11 May 2025','Youth Fellowship'],['Emmanuel Church','Thovalai','74','265','17 May 2025','Family Fellowship']].map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}<td><span class="status">Active</span></td></tr>`).join('')+'</tbody>';drawParishCalendar();bindParishCalendar();drawPrayerDonut();}

let parishMonth=4, parishYear=2025, parishSelected=18, parishView='month';
function drawParishCalendar(){const el=document.getElementById('parishCalendar');if(!el)return;const title=document.getElementById('parishMonthTitle');const names=['January','February','March','April','May','June','July','August','September','October','November','December'];const short=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];if(title)title.textContent=parishView==='year'?`${parishYear}`:`${names[parishMonth]} ${parishYear}`;const mode=document.getElementById('calendarMode');if(mode)mode.innerHTML=(parishView==='year'?'Year':'Month')+' <span class="inline-caret">'+icon('down')+'</span>';if(parishView==='year'){el.classList.add('year-view');el.innerHTML=short.map((m,i)=>`<button type="button" data-month="${i}" class="month-cell ${i===parishMonth?'active':''}">${m}<small>${parishYear}</small></button>`).join('');el.querySelectorAll('[data-month]').forEach(btn=>btn.onclick=()=>{parishMonth=+btn.dataset.month;parishView='month';drawParishCalendar()});return;}el.classList.remove('year-view');const first=new Date(parishYear,parishMonth,1).getDay();const days=new Date(parishYear,parishMonth+1,0).getDate();const prevDays=new Date(parishYear,parishMonth,0).getDate();let cells=['SUN','MON','TUE','WED','THU','FRI','SAT'];for(let i=first-1;i>=0;i--)cells.push({d:prevDays-i,muted:true});for(let d=1;d<=days;d++)cells.push({d});while((cells.length-7)%7!==0)cells.push({d:cells.length,muted:true});const marked=[1,7,18,20,25];el.innerHTML=cells.map(cell=>{if(typeof cell==='string')return `<button type="button" class="day-name" disabled>${cell}</button>`;return `<button type="button" data-day="${cell.muted?'':cell.d}" class="${cell.muted?'muted':''} ${marked.includes(cell.d)&&!cell.muted?'marked':''} ${cell.d===parishSelected&&!cell.muted?'active':''}">${cell.d}</button>`}).join('');el.querySelectorAll('button[data-day]').forEach(btn=>btn.onclick=()=>{if(!btn.dataset.day)return;parishSelected=+btn.dataset.day;el.querySelectorAll('button').forEach(b=>b.classList.remove('active'));btn.classList.add('active')});}
function bindParishCalendar(){const pp=document.getElementById('parishPrev'),pn=document.getElementById('parishNext');if(pp)pp.innerHTML=icon('chevLeft');if(pn)pn.innerHTML=icon('chevRight');pp?.addEventListener('click',e=>{e.stopPropagation();if(parishView==='year'){parishYear--}else{parishMonth--;if(parishMonth<0){parishMonth=11;parishYear--}}drawParishCalendar()});pn?.addEventListener('click',e=>{e.stopPropagation();if(parishView==='year'){parishYear++}else{parishMonth++;if(parishMonth>11){parishMonth=0;parishYear++}}drawParishCalendar()});document.getElementById('calendarMode')?.addEventListener('click',e=>{e.stopPropagation();showDrop(e.currentTarget,`<div class="drop-title">Calendar View</div><button class="drop-item" data-cal-view="month"><b>Month View</b><span>Show selected month</span></button><button class="drop-item" data-cal-view="year"><b>Year View</b><span>Select month from year</span></button>`,220);dropdown.querySelectorAll('[data-cal-view]').forEach(b=>b.onclick=()=>{parishView=b.dataset.calView;dropdown.classList.remove('show');drawParishCalendar()})})}
function drawPrayerDonut(){const c=document.getElementById('prayerDonut');if(!c)return;const ctx=c.getContext('2d'),cx=75,cy=75,r=62,vals=[14.1,32.9,52.9],cols=['#3478f6','#ff9f1c','#51c76a'];let start=-Math.PI/2;vals.forEach((v,i)=>{let end=start+v/100*Math.PI*2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,start,end);ctx.fillStyle=cols[i];ctx.fill();start=end});ctx.globalCompositeOperation='destination-out';ctx.beginPath();ctx.arc(cx,cy,36,0,Math.PI*2);ctx.fill();ctx.globalCompositeOperation='source-over';ctx.textAlign='center';ctx.fillStyle='#07183d';ctx.font='800 22px Open Sans';ctx.fillText('85',cx,cy-2);ctx.font='11px Open Sans';ctx.fillText('Total Requests',cx,cy+15)}
initDashboard();initParish();

/* ===== Updated navigation links and Upcoming Events page ===== */
(function(){
  function pageSlug(){return location.pathname.split('/').pop()||'index.html'}
  function buildNavV2(){
    const nav=document.getElementById('navMenu'); if(!nav||typeof navData==='undefined')return;
    const page=pageSlug().toLowerCase();
    const iconNames=['folder','users','book','users','wallet','wallet','book','users','heart','users','heart','heart','calendar','users','bell','cross','folder','calendar','users','file','folder','heart','chart','settings'];
    const subHref=(title,s)=> {
      if(title==='Parish Administration' && s==='Upcoming Events & Services') return 'UpcomingEventsServices.html';
      if(title==='Parish Administration' && s==='Sacrament Reports') return 'SacramentReports.html';
      if(title==='Parish Administration' && s==='Birthdays & Anniversaries') return 'BirthdaysAnniversaries.html';
      if(title==='Parish Administration' && s==='Prayer Request Summary') return 'PrayerRequestSummary.html';
      if(title==='Parish Administration' && s==='Notifications & Announcements') return 'NotificationsAnnouncements.html';
      if(title==='Parish Administration' && s==='Committee Activity Overview') return 'CommitteeActivityOverview.html';
      if(title==='Parish Administration' && s==='Branch Church Overview') return 'BranchChurchOverview.html';
      if(title==='Parish Administration') return 'ParishAdministration.html';
      return '#';
    };
    nav.innerHTML=`<div class="nav-group"><a class="nav-main ${page==='index.html'?'active':''}" href="index.html"><span class="nav-icon">${icon('home')}</span><span class="nav-title">Dashboard</span></a></div>`+
    Object.keys(navData).map((title,i)=>{
      const mainHref=title==='Parish Administration'?'ParishAdministration.html':'#';
      const active=title==='Parish Administration' && ['parishadministration.html','upcomingeventsservices.html','sacramentreports.html','birthdaysanniversaries.html','prayerrequestsummary.html','notificationsannouncements.html','committeeactivityoverview.html','branchchurchoverview.html'].includes(page);
      return `<div class="nav-group ${active?'open':''}"><a class="nav-main ${active?'active':''}" href="${mainHref}"><span class="nav-icon">${icon(iconNames[i]||'folder')}</span><span class="nav-title">${title}</span><span class="nav-arrow">${icon('down')}</span></a><div class="subnav">${navData[title].map(s=>`<a class="${(page==='upcomingeventsservices.html'&&s==='Upcoming Events & Services')||(page==='sacramentreports.html'&&s==='Sacrament Reports')||(page==='birthdaysanniversaries.html'&&s==='Birthdays & Anniversaries')||(page==='prayerrequestsummary.html'&&s==='Prayer Request Summary')||(page==='notificationsannouncements.html'&&s==='Notifications & Announcements')||(page==='committeeactivityoverview.html'&&s==='Committee Activity Overview')||(page==='branchchurchoverview.html'&&s==='Branch Church Overview')?'active':''}" href="${subHref(title,s)}">- ${s}</a>`).join('')}</div></div>`
    }).join('');
    nav.querySelectorAll('.nav-main').forEach(btn=>btn.addEventListener('click',e=>{const g=btn.closest('.nav-group'); if(g.querySelector('.subnav')){ if(btn.getAttribute('href')==='#')e.preventDefault(); g.classList.toggle('open'); } nav.querySelectorAll('.nav-main').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); }));
  }
  function initUpcomingEvents(){
    if(!document.body.classList.contains('events-page'))return;
    const stats=[['calendar','Total Events','24','This Month','View Calendar'],['users','Services','16','This Month','View Services'],['cross','Special Services','4','This Month','View Details'],['users','Retreats & Programs','3','This Month','View Details'],['megaphone','Registrations','178','This Month','View Registrations']];
    const statsEl=document.getElementById('eventStats'); if(statsEl)statsEl.innerHTML=stats.map(s=>`<div class="stat-card"><div class="stat-icon">${icon(s[0])}</div><div><h4>${s[1]}</h4><div class="num">${s[2]}</div><p>${s[3]}</p><a>${s[4]} ${icon('chevRight')}</a></div></div>`).join('');
    const rows=[['MAY','20','TUE','06:00 PM','Youth Fellowship Meeting','A time of worship, fellowship and bible study for youth.','Meeting','Youth Hall','Youth Ministry','45 / 60',75],['MAY','25','SUN','09:30 AM','Sunday School Anniversary','Thanksgiving service for Sunday School Anniversary.','Special Service','Main Auditorium','Sunday School','120 / 150',80],['JUN','01','SUN','08:00 AM','Holy Communion Service','Holy Communion Service & Worship.','Service','Main Church','Worship Committee','–',0],['JUN','07','SAT','04:00 PM',"Women’s Fellowship Meeting",'Monthly fellowship and prayer meeting for women.','Meeting','Fellowship Hall',"Women's Fellowship",'35 / 50',70],['JUN','15','SUN','05:00 PM','Parish Council Meeting','Monthly Parish Council Committee Meeting.','Meeting','Conference Room','Parish Council','18 / 20',90],['JUN','21','SAT','09:00 AM','Prayer Retreat','One day prayer retreat for spiritual growth.','Retreat','Retreat Center','Prayer Ministry','60 / 80',75],['JUN','29','SAT','06:00 PM','Gospel Music Night','An evening of gospel music and worship.','Program','Main Auditorium','Choir & Worship Team','200 / 250',80],['JUL','05','SAT','10:00 AM','Bible Convention 2025','Annual Bible Convention with various speakers.','Event','Convention Center','Parish Office','350 / 500',70],['JUL','13','SUN','08:00 AM','Youth Sunday Service','Youth led worship service.','Service','Main Church','Youth Ministry','–',0],['AUG','02','SAT','04:00 PM','Family Retreat','Retreat for all families of the church.','Retreat','Hill View Resort','Family Ministry','75 / 100',75]];
    const table=document.getElementById('eventsTable'); if(table)table.innerHTML='<thead><tr><th>Date & Time</th><th>Event / Service</th><th>Category</th><th>Location</th><th>Organized By</th><th>Registrations</th><th>Status</th><th>Actions</th></tr></thead><tbody>'+rows.map(r=>{const catClass='cat-'+r[6].toLowerCase().replace('special service','special').replace(/ /g,'-');return `<tr><td><div class="event-date-cell"><div class="datebox"><span>${r[0]}</span>${r[1]}<small>${r[2]}</small></div><b>${r[3]}</b></div></td><td><div class="event-title-cell"><h4>${r[4]}</h4><p>${r[5]}</p></div></td><td><span class="category-badge ${catClass}">${r[6]}</span></td><td>${r[7]}</td><td>${r[8]}</td><td>${r[9]}${r[10]?`<div class="reg-progress"><span style="width:${r[10]}%"></span></div>`:''}</td><td><span class="status">Upcoming</span></td><td><button class="action-dot" type="button"><i class="fa-solid fa-ellipsis-vertical"></i></button></td></tr>`}).join('')+'</tbody>';
    document.querySelectorAll('#eventTabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#eventTabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active')});
    document.getElementById('addEventBtn')?.addEventListener('click',()=>showModal(`<h2>Add Event</h2><div class="modal-form"><div class="field"><label>Event Name</label><input placeholder="Enter event name"></div><div class="field"><label>Category</label><select><option>Event</option><option>Service</option><option>Meeting</option></select></div><div class="field"><label>Date</label><input type="date"></div><div class="field"><label>Time</label><input type="time"></div><div class="field"><label>Location</label><input placeholder="Location"></div><div class="field"><label>Organizer</label><input placeholder="Organizer"></div><div class="field full"><label>Description</label><textarea rows="3" placeholder="Event details"></textarea></div></div><div class="modal-actions"><button class="btn ghost" onclick="modal.classList.remove('show')">Cancel</button><button class="btn primary">Save Event</button></div>`));
  }
  setTimeout(()=>{buildNavV2(); setupTop?.(); initUpcomingEvents();},0);
})();

/* ===== Upcoming Events enhanced interactions and blue theme ===== */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  let evMonth=4, evYear=2025, evView='month', evSelected=18;
  const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
  const eventRowsData=[
    ['MAY','20','TUE','06:00 PM','Youth Fellowship Meeting','A time of worship, fellowship and bible study for youth.','Meeting','Youth Hall','Youth Ministry','45 / 60',75],
    ['MAY','25','SUN','09:30 AM','Sunday School Anniversary','Thanksgiving service for Sunday School Anniversary.','Special Service','Main Auditorium','Sunday School','120 / 150',80],
    ['JUN','01','SUN','08:00 AM','Holy Communion Service','Holy Communion Service & Worship.','Service','Main Church','Worship Committee','–',0],
    ['JUN','07','SAT','04:00 PM',"Women’s Fellowship Meeting",'Monthly fellowship and prayer meeting for women.','Meeting','Fellowship Hall',"Women's Fellowship",'35 / 50',70],
    ['JUN','15','SUN','05:00 PM','Parish Council Meeting','Monthly Parish Council Committee Meeting.','Meeting','Conference Room','Parish Council','18 / 20',90],
    ['JUN','21','SAT','09:00 AM','Prayer Retreat','One day prayer retreat for spiritual growth.','Retreat','Retreat Center','Prayer Ministry','60 / 80',75],
    ['JUN','29','SAT','06:00 PM','Gospel Music Night','An evening of gospel music and worship.','Program','Main Auditorium','Choir & Worship Team','200 / 250',80],
    ['JUL','05','SAT','10:00 AM','Bible Convention 2025','Annual Bible Convention with various speakers.','Event','Convention Center','Parish Office','350 / 500',70],
    ['JUL','13','SUN','08:00 AM','Youth Sunday Service','Youth led worship service.','Service','Main Church','Youth Ministry','–',0],
    ['AUG','02','SAT','04:00 PM','Family Retreat','Retreat for all families of the church.','Retreat','Hill View Resort','Family Ministry','75 / 100',75]
  ];
  function paintTopIcons(){
    const cb=$('#calendarBtn'), nb=$('#notifyBtn'); if(cb)cb.innerHTML='<i class="fa-regular fa-calendar-days"></i>'; if(nb)nb.innerHTML='<i class="fa-regular fa-bell"></i><small>12</small>'; $$('.profile-caret,.small-arrow,.nav-arrow').forEach(el=>{ if(!el.querySelector('i')) el.innerHTML='<i class="fa-solid fa-chevron-down"></i>'; });
  }
  function renderEvents(rows=eventRowsData){
    const table=$('#eventsTable'); if(!table)return;
    table.innerHTML='<thead><tr><th>Date & Time</th><th>Event / Service</th><th>Category</th><th>Location</th><th>Organized By</th><th>Registrations</th><th>Status</th><th>Actions</th></tr></thead><tbody>'+rows.map((r,idx)=>{const catClass='cat-'+r[6].toLowerCase().replace('special service','special').replace(/ /g,'-');return `<tr data-cat="${r[6].toLowerCase()}"><td><div class="event-date-cell"><div class="datebox"><span>${r[0]}</span>${r[1]}<small>${r[2]}</small></div><b>${r[3]}</b></div></td><td><div class="event-title-cell"><h4>${r[4]}</h4><p>${r[5]}</p></div></td><td><span class="category-badge ${catClass}">${r[6]}</span></td><td>${r[7]}</td><td>${r[8]}</td><td>${r[9]}${r[10]?`<div class="reg-progress"><span style="width:${r[10]}%"></span></div>`:''}</td><td><span class="status">Upcoming</span></td><td><button class="action-dot" type="button" data-action-index="${idx}"><i class="fa-solid fa-ellipsis-vertical"></i></button></td></tr>`}).join('')+'</tbody>';
    bindActionButtons();
  }
  function renderStats(){
    const stats=[['calendar','Total Events','24','This Month','View Calendar'],['users','Services','16','This Month','View Services'],['cross','Special Services','4','This Month','View Details'],['users','Retreats & Programs','3','This Month','View Details'],['megaphone','Registrations','178','This Month','View Registrations']];
    const el=$('#eventStats'); if(!el)return; el.innerHTML=stats.map(s=>`<div class="stat-card"><div class="stat-icon"><i class="fa-solid ${({calendar:'fa-calendar-days',users:'fa-users',cross:'fa-cross',megaphone:'fa-bullhorn'})[s[0]]}"></i></div><div><h4>${s[1]}</h4><div class="num">${s[2]}</div><p>${s[3]}</p><a href="#">${s[4]} <i class="fa-solid fa-arrow-right"></i></a></div></div>`).join('');
  }
  function addCalendarPanel(){
    const card=$('.event-table-card'); if(!card || $('#eventCalendarPanel'))return;
    card.insertAdjacentHTML('beforebegin',`<section class="calendar-view-panel" id="eventCalendarPanel"><div class="event-cal-head"><button id="eventCalPrev" type="button"><i class="fa-solid fa-chevron-left"></i></button><div class="event-cal-title" id="eventCalTitle"></div><div class="event-cal-controls"><button id="eventCalMonth" type="button">Month</button><button id="eventCalYear" type="button">Year</button><button id="eventCalNext" type="button"><i class="fa-solid fa-chevron-right"></i></button></div></div><div class="event-cal-grid" id="eventCalGrid"></div></section>`);
    $('#eventCalendarBtn')?.addEventListener('click',()=>{$('#eventCalendarPanel')?.classList.toggle('show'); drawEventCalendar();});
    $('#eventCalPrev')?.addEventListener('click',()=>{ if(evView==='year')evYear--; else {evMonth--; if(evMonth<0){evMonth=11;evYear--}} drawEventCalendar();});
    $('#eventCalNext')?.addEventListener('click',()=>{ if(evView==='year')evYear++; else {evMonth++; if(evMonth>11){evMonth=0;evYear++}} drawEventCalendar();});
    $('#eventCalMonth')?.addEventListener('click',()=>{evView='month';drawEventCalendar();});
    $('#eventCalYear')?.addEventListener('click',()=>{evView='year';drawEventCalendar();});
  }
  function drawEventCalendar(){
    const grid=$('#eventCalGrid'), title=$('#eventCalTitle'); if(!grid)return;
    if(title) title.textContent= evView==='year' ? String(evYear) : `${months[evMonth]} ${evYear}`;
    if(evView==='year'){
      grid.className='event-cal-grid year'; grid.innerHTML=months.map((m,i)=>`<button type="button" data-m="${i}" class="${i===evMonth?'active':''}">${m.slice(0,3)}<br><small>${evYear}</small></button>`).join('');
      $$('[data-m]',grid).forEach(b=>b.onclick=()=>{evMonth=+b.dataset.m;evView='month';drawEventCalendar();}); return;
    }
    grid.className='event-cal-grid'; const first=new Date(evYear,evMonth,1).getDay(), days=new Date(evYear,evMonth+1,0).getDate(); let cells=['SUN','MON','TUE','WED','THU','FRI','SAT']; for(let i=0;i<first;i++)cells.push(''); for(let d=1;d<=days;d++)cells.push(d); const marks=[5,13,18,20,21,25,29];
    grid.innerHTML=cells.map((d,i)=> typeof d==='string'?`<button class="day-name" disabled>${d}</button>`:`<button type="button" data-day="${d}" class="${marks.includes(d)?'has-event':''} ${d===evSelected?'active':''}">${d}</button>`).join('');
    $$('[data-day]',grid).forEach(b=>b.onclick=()=>{evSelected=+b.dataset.day;drawEventCalendar();});
  }
  function bindTabsFilters(){
    const filters=$('.filters'); if(filters && !filters.dataset.enhanced){filters.dataset.enhanced='1'; filters.querySelectorAll('select').forEach(sel=>{const w=document.createElement('span');w.className='select-wrap';sel.parentNode.insertBefore(w,sel);w.appendChild(sel);});}
    $$('#eventTabs button').forEach(btn=>{btn.onclick=()=>{ $$('#eventTabs button').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); const t=btn.textContent.trim().toLowerCase(); filterRows(t); }});
    $$('.filters select').forEach(sel=>sel.onchange=()=>filterRows($('#eventTabs .active')?.textContent.trim().toLowerCase()||'all'));
    const fbtn=$$('.filter-btn').pop(); if(fbtn)fbtn.onclick=()=>filterRows($('#eventTabs .active')?.textContent.trim().toLowerCase()||'all');
  }
  function filterRows(tab){
    const map={events:'event',services:'service','special services':'special service',programs:'program',retreats:'retreat',meetings:'meeting'}; const needle=map[tab]||'all'; let count=0;
    $$('#eventsTable tbody tr').forEach(tr=>{ if(tr.classList.contains('empty-row'))tr.remove(); });
    $$('#eventsTable tbody tr').forEach(tr=>{ const ok=needle==='all'||tr.dataset.cat===needle; tr.style.display=ok?'':'none'; if(ok)count++; });
    if(count===0)$('#eventsTable tbody')?.insertAdjacentHTML('beforeend','<tr class="empty-row"><td colspan="8">No events found for this filter</td></tr>');
  }
  function bindActionButtons(){
    $$('.action-dot').forEach(btn=>{btn.onclick=(e)=>{e.stopPropagation(); $('.action-menu')?.remove(); const m=document.createElement('div'); m.className='action-menu'; m.innerHTML='<button data-act="view"><i class="fa-regular fa-eye"></i> View Details</button><button data-act="edit"><i class="fa-regular fa-pen-to-square"></i> Edit Event</button><button data-act="reg"><i class="fa-solid fa-users"></i> Registrations</button><button data-act="del"><i class="fa-regular fa-trash-can"></i> Delete</button>'; document.body.appendChild(m); const r=btn.getBoundingClientRect(); m.style.top=(r.bottom+6+scrollY)+'px'; m.style.left=Math.max(12,r.left-132+scrollX)+'px'; m.querySelectorAll('button').forEach(b=>b.onclick=()=>{showModal(`<h2>${b.textContent.trim()}</h2><p style="font-size:13px;color:#66728a">Action selected for this event.</p><div class="modal-actions"><button class="btn primary" onclick="modal.classList.remove('show')">OK</button></div>`); m.remove();});}; });
  }
  document.addEventListener('click',()=>$('.action-menu')?.remove());
  function wizardHTML(tab='details'){
    const tabs=[['details','fa-calendar-days','Event Details'],['schedule','fa-calendar-days','Schedule'],['location','fa-location-dot','Location'],['organizers','fa-users','Organizers'],['info','fa-circle-info','Additional Info']];
    const active=(id)=>tab===id?'active':'';
    const bodies={
      details:`<div class="wizard-grid"><div class="field full"><label>Event / Service Title *</label><input placeholder="Enter event or service title"></div><div class="field"><label>Category *</label><select><option>Select category</option><option>Event</option><option>Service</option></select></div><div class="field"><label>Date *</label><input value="18/05/2025"></div><div class="field"><label>Event Type *</label><div class="check-grid"><label class="radio-item"><input type="radio" checked> Event</label><label class="radio-item"><input type="radio"> Service</label><label class="radio-item"><input type="radio"> Meeting</label><label class="radio-item"><input type="radio"> Program</label><label class="radio-item"><input type="radio"> Retreat</label><label class="radio-item"><input type="radio"> Other</label></div></div><div class="field"><label>Start Time *</label><input value="06:00 PM"></div><div class="field"><label>End Time *</label><input value="07:30 PM"></div><div class="field full"><label>Description *</label><div class="richbar"><b>Normal</b><i class="fa-solid fa-bold"></i><i class="fa-solid fa-italic"></i><i class="fa-solid fa-underline"></i><i class="fa-solid fa-list"></i></div><textarea placeholder="Enter event description..."></textarea></div><div class="field"><label>Organized By *</label><select><option>Select ministry / department</option></select></div><div class="field"><label>Registration Limit</label><input placeholder="Enter limit"></div><div class="field full"><label>Target Audience</label><div class="check-grid"><label class="check-item"><input type="checkbox" checked> All Members</label><label class="check-item"><input type="checkbox"> Families</label><label class="check-item"><input type="checkbox"> Youth</label><label class="check-item"><input type="checkbox"> Children</label><label class="check-item"><input type="checkbox"> Women</label><label class="check-item"><input type="checkbox"> Men</label></div></div></div>`,
      schedule:`<div class="field full"><label>Schedule Type</label><div class="check-grid"><label class="radio-item"><input type="radio"> One Time Event</label><label class="radio-item"><input type="radio" checked> Multiple Sessions</label><label class="radio-item"><input type="radio"> Recurring Event</label></div></div><div class="schedule-table"><table><thead><tr><th>#</th><th>Date *</th><th>Day</th><th>Start Time *</th><th>End Time *</th><th>Session Title</th><th>Actions</th></tr></thead><tbody>${['Opening Worship','Bible Study Session','Prayer & Fellowship','Closing Service'].map((x,i)=>`<tr><td>${i+1}</td><td><input value="${20+i*7}/05/2025"></td><td><select><option>Tuesday</option></select></td><td><input value="06:00 PM"></td><td><input value="08:00 PM"></td><td><input value="${x}"></td><td><i class="fa-regular fa-trash-can" style="color:#e63946"></i></td></tr>`).join('')}</tbody></table></div><button class="outline-action" style="margin-top:14px"><i class="fa-solid fa-plus"></i> Add Session</button><div class="wizard-grid" style="margin-top:22px"><div class="field"><label>Registration Opens On</label><input value="01/05/2025"></div><div class="field"><label>Reminder Notifications</label><select><option>1 Day Before</option></select></div><div class="field"><label>Registration Closes On</label><input value="18/05/2025"></div><div class="field"><label>Follow-up</label><select><option>1 Day After</option></select></div></div>`,
      location:`<div class="wizard-grid"><div><div class="field"><label>Location Type *</label><div class="check-grid"><label class="radio-item"><input type="radio" checked> Church / Parish Location</label><label class="radio-item"><input type="radio"> Custom Location</label></div></div><div class="field"><label>Venue / Location *</label><select><option>Select church / venue</option></select></div><div class="field"><label>Building / Hall</label><select><option>Select building / hall</option></select></div><div class="field"><label>Address</label><textarea>12, Church Road, Nagercoil, Tamil Nadu – 629001, India</textarea></div><div class="field"><label>Capacity</label><input value="200"></div></div><div><label style="font-weight:800;font-size:12px">Location Map</label><div class="map-mock"><i class="fa-solid fa-location-dot map-pin"></i></div><button class="add-action" style="float:right;margin-top:10px">Reset Location</button></div><div class="field full"><label>Service / Program Specific Location</label><button class="outline-action"><i class="fa-solid fa-plus"></i> Add Another Location</button></div></div>`,
      organizers:`<div class="wizard-grid"><div class="field"><label>Primary Organizer *</label><select><option>Select primary organizer</option></select></div><div class="field"><label>Organizer Role</label><select><option>Select role</option></select></div><div class="field"><label>Co-Organizers</label><div style="border:1px solid #dbe7f0;border-radius:8px;padding:8px">${['John Samuel','Mary Samuel','David Samuel','Ruth Samuel','Anna Samuel','Peter Thomas'].map(n=>`<label class="check-item" style="justify-content:space-between;margin:8px"><span><input type="checkbox"> ${n}</span><small>+91 98765 43210</small></label>`).join('')}</div></div><div class="field"><label>Contact Person</label><select><option>Same as Primary Organizer</option></select><label style="margin-top:16px">Contact Phone</label><input value="+91 98765 43210"><label style="margin-top:16px">Organizer Note</label><textarea placeholder="Add a note for organizers..."></textarea></div><div class="field full"><label>Organizer Permissions</label><div class="check-grid"><label class="check-item"><input type="checkbox" checked> Can edit event details</label><label class="check-item"><input type="checkbox" checked> Can manage schedule</label><label class="check-item"><input type="checkbox" checked> Can manage registrations</label><label class="check-item"><input type="checkbox" checked> Can send notifications</label><label class="check-item"><input type="checkbox" checked> Can manage attendees</label><label class="check-item"><input type="checkbox"> Can delete event</label></div></div></div>`,
      info:`<div class="wizard-grid"><div class="field"><label>Event Description</label><div class="richbar"><b>Normal</b><i class="fa-solid fa-bold"></i><i class="fa-solid fa-italic"></i><i class="fa-solid fa-underline"></i><i class="fa-solid fa-list"></i></div><textarea placeholder="Provide more details about the event..."></textarea></div><div><div class="field"><label>Event Category *</label><select><option>Select category</option></select></div><div class="field"><label>Event Tags</label><input placeholder="Type and press Enter to add tags"></div><div class="field"><label>Target Age Group</label><div class="check-grid"><label class="check-item"><input type="checkbox"> Children</label><label class="check-item"><input type="checkbox"> Youth</label><label class="check-item"><input type="checkbox" checked> Adults</label><label class="check-item"><input type="checkbox"> Seniors</label><label class="check-item"><input type="checkbox" checked> All Age Groups</label></div></div><div class="field"><label>Language</label><select><option>English</option></select></div></div><div class="field"><label>Attachments</label><div class="upload-box"><i class="fa-solid fa-cloud-arrow-up"></i><p><b>Click to upload</b> or drag and drop</p><small>PDF, DOC, JPG, PNG</small></div></div><div class="field"><label>Notes</label><textarea placeholder="Internal notes..."></textarea></div></div>`
    };
    return `<div class="event-modal-title">Add Event</div><div class="wizard-tabs">${tabs.map(t=>`<button type="button" data-wtab="${t[0]}" class="${active(t[0])}"><i class="fa-solid ${t[1]}"></i>${t[2]}</button>`).join('')}</div><div class="wizard-body">${bodies[tab]}</div><div class="wizard-footer"><button type="button" data-back>Back</button><span></span><button type="button" onclick="modal.classList.remove('show')">Cancel</button><button type="button" class="primary" data-next>${tab==='info'?'Save Event':'Next'}</button></div>`;
  }
  function openEventWizard(start='details'){
    showModal(wizardHTML(start)); $('.modal-box')?.classList.add('add-event-modal');
    const order=['details','schedule','location','organizers','info']; let idx=order.indexOf(start);
    function refresh(){ modalContent.innerHTML=wizardHTML(order[idx]); $('.modal-box')?.classList.add('add-event-modal'); bindWizard(); }
    function bindWizard(){ $$('[data-wtab]',modalContent).forEach(b=>b.onclick=()=>{idx=order.indexOf(b.dataset.wtab);refresh();}); $('[data-next]',modalContent)?.addEventListener('click',()=>{ if(idx<order.length-1){idx++;refresh();} else modal.classList.remove('show');}); $('[data-back]',modalContent)?.addEventListener('click',()=>{ if(idx>0){idx--;refresh();} }); }
    bindWizard();
  }
  function enhanceUpcomingPage(){
    if(!document.body.classList.contains('events-page'))return;
    paintTopIcons(); renderStats(); renderEvents(); addCalendarPanel(); bindTabsFilters(); drawEventCalendar();
    $('#addEventBtn')?.replaceWith($('#addEventBtn').cloneNode(true)); $('#addEventBtn')?.addEventListener('click',()=>openEventWizard('details'));
    $('.event-actions .outline-action:nth-child(2)')?.addEventListener('click',()=>showModal('<h2>Export</h2><p style="font-size:13px;color:#66728a">Event report exported successfully.</p><div class="modal-actions"><button class="btn primary" onclick="modal.classList.remove(\'show\')">OK</button></div>'));
  }
  setTimeout(enhanceUpcomingPage,80);
})();

/* Final event-page delegated fixes */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  document.addEventListener('click',function(e){
    const calBtn=e.target.closest('#eventCalendarBtn');
    if(calBtn){
      e.preventDefault();
      const panel=$('#eventCalendarPanel');
      if(panel){ panel.classList.toggle('show'); }
    }
    const filterBtn=e.target.closest('.filters .filter-btn');
    if(filterBtn){
      e.preventDefault();
      const active=($('#eventTabs .active')?.textContent||'All').trim().toLowerCase();
      const map={events:'event',services:'service','special services':'special service',programs:'program',retreats:'retreat',meetings:'meeting'};
      const needle=map[active]||'all';
      $$('#eventsTable tbody tr').forEach(tr=>{ if(!tr.classList.contains('empty-row')) tr.style.display=(needle==='all'||tr.dataset.cat===needle)?'':'none'; });
    }
  },true);
  document.addEventListener('change',function(e){
    if(e.target.matches('.filters select')){
      const active=($('#eventTabs .active')?.textContent||'All').trim().toLowerCase();
      const map={events:'event',services:'service','special services':'special service',programs:'program',retreats:'retreat',meetings:'meeting'};
      const needle=map[active]||'all';
      $$('#eventsTable tbody tr').forEach(tr=>{ if(!tr.classList.contains('empty-row')) tr.style.display=(needle==='all'||tr.dataset.cat===needle)?'':'none'; });
    }
  },true);
})();

/* ===== final functional fixes: section icons + upcoming calendar/tabs/responsive helpers ===== */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
  let m=4,y=2025,view='month',selected=18;
  function fa(n){return `<i class="fa-solid ${n}" aria-hidden="true"></i>`}
  function fixSectionLinks(){
    $$('.section-link,.card-head a,.stat-card a').forEach(a=>{
      a.innerHTML=a.textContent.replace(/→/g,'').trim()+` ${fa('fa-arrow-right')}`;
    });
  }
  function ensureCalendarPanel(){
    if(!document.body.classList.contains('events-page'))return;
    let panel=$('#eventCalendarPanel');
    const tableCard=$('.event-table-card');
    if(!panel && tableCard){
      tableCard.insertAdjacentHTML('beforebegin',`<section class="calendar-view-panel" id="eventCalendarPanel"><div class="event-cal-head"><button id="eventCalPrev" type="button">${fa('fa-chevron-left')}</button><div class="event-cal-title" id="eventCalTitle"></div><div class="event-cal-controls"><button id="eventCalMonth" type="button">Month</button><button id="eventCalYear" type="button">Year</button><button id="eventCalNext" type="button">${fa('fa-chevron-right')}</button></div></div><div class="event-cal-grid" id="eventCalGrid"></div></section>`);
      panel=$('#eventCalendarPanel');
    }
    drawCalendar();
  }
  function drawCalendar(){
    const grid=$('#eventCalGrid'), title=$('#eventCalTitle'); if(!grid)return;
    title.textContent=view==='year'?String(y):`${months[m]} ${y}`;
    if(view==='year'){
      grid.className='event-cal-grid year';
      grid.innerHTML=months.map((mo,i)=>`<button type="button" data-month="${i}" class="${i===m?'active':''}">${mo.slice(0,3)}<br><small>${y}</small></button>`).join('');
      $$('[data-month]',grid).forEach(b=>b.addEventListener('click',()=>{m=+b.dataset.month;view='month';drawCalendar();}));
      return;
    }
    const first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate(), marks=[1,5,13,18,20,21,25,29];
    let cells=['SUN','MON','TUE','WED','THU','FRI','SAT']; for(let i=0;i<first;i++)cells.push(''); for(let d=1;d<=days;d++)cells.push(d);
    grid.className='event-cal-grid';
    grid.innerHTML=cells.map((d,i)=>i<7?`<button class="day-name" disabled>${d}</button>`:(d===''?`<button disabled class="muted"></button>`:`<button type="button" data-day="${d}" class="${marks.includes(d)?'has-event':''} ${d===selected?'active':''}">${d}</button>`)).join('');
    $$('[data-day]',grid).forEach(b=>b.addEventListener('click',()=>{selected=+b.dataset.day;drawCalendar();}));
  }
  function filterRows(tab){
    const map={all:'all',events:'event',services:'service','special services':'special service',programs:'program',retreats:'retreat',meetings:'meeting'};
    const needle=map[(tab||'all').toLowerCase()]||'all'; let visible=0;
    $$('#eventsTable tbody tr').forEach(tr=>{ if(tr.classList.contains('empty-row'))tr.remove(); });
    $$('#eventsTable tbody tr').forEach(tr=>{const ok=needle==='all'||(tr.dataset.cat||'').toLowerCase()===needle;tr.style.display=ok?'':'none'; if(ok)visible++;});
    if(!visible && $('#eventsTable tbody')) $('#eventsTable tbody').insertAdjacentHTML('beforeend',`<tr class="empty-row"><td colspan="8">No ${tab} found</td></tr>`);
  }
  function bindFinalEvents(){
    if(!document.body.classList.contains('events-page'))return;
    ensureCalendarPanel();
    // white icons, section arrows
    $$('.event-stat-grid .stat-icon i').forEach(i=>i.style.color='#fff');
    const calBtn=$('#eventCalendarBtn');
    if(calBtn && !calBtn.dataset.finalBound){calBtn.dataset.finalBound='1';calBtn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();ensureCalendarPanel();$('#eventCalendarPanel')?.classList.toggle('show');drawCalendar();},true);}
    $('#eventCalPrev')?.addEventListener('click',e=>{e.preventDefault(); if(view==='year')y--; else{m--; if(m<0){m=11;y--;}} drawCalendar();});
    $('#eventCalNext')?.addEventListener('click',e=>{e.preventDefault(); if(view==='year')y++; else{m++; if(m>11){m=0;y++;}} drawCalendar();});
    $('#eventCalMonth')?.addEventListener('click',e=>{e.preventDefault();view='month';drawCalendar();});
    $('#eventCalYear')?.addEventListener('click',e=>{e.preventDefault();view='year';drawCalendar();});
    $$('#eventTabs button').forEach(btn=>{btn.onclick=()=>{$$('#eventTabs button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');filterRows(btn.textContent.trim());};});
    $$('.filters select').forEach(sel=>{if(!sel.closest('.select-wrap')){const w=document.createElement('span');w.className='select-wrap';sel.parentNode.insertBefore(w,sel);w.appendChild(sel);} sel.onchange=()=>filterRows($('#eventTabs .active')?.textContent.trim()||'All');});
    $$('.filter-btn').forEach(b=>{if(!b.id)b.onclick=()=>filterRows($('#eventTabs .active')?.textContent.trim()||'All');});
  }
  document.addEventListener('click',e=>{
    const p=e.target.closest('#eventCalPrev,#eventCalNext,#eventCalMonth,#eventCalYear');
    if(p){e.preventDefault();e.stopPropagation(); if(p.id==='eventCalPrev'){ if(view==='year')y--; else{m--; if(m<0){m=11;y--;}} } if(p.id==='eventCalNext'){ if(view==='year')y++; else{m++; if(m>11){m=0;y++;}} } if(p.id==='eventCalMonth')view='month'; if(p.id==='eventCalYear')view='year'; drawCalendar();}
  },true);
  window.addEventListener('resize',()=>{ if(innerWidth>900){$('#sidebar')?.classList.remove('open');$('#overlay')?.classList.remove('show');} });
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{fixSectionLinks();bindFinalEvents();}); else {fixSectionLinks();bindFinalEvents();}
  setTimeout(()=>{fixSectionLinks();bindFinalEvents();},250);
})();

/* ===== FINAL PATCH 2: force requested behaviors ===== */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
  let calMonth=4, calYear=2025, calView='month', calSelected=18;
  const fa=(c)=>`<i class="fa-solid ${c}" aria-hidden="true"></i>`;

  function forceNavLinks(){
    $$('#navMenu .subnav a').forEach(a=>{
      const t=a.textContent.replace(/^\s*-\s*/,'').trim();
      if(t==='Upcoming Events & Services') a.setAttribute('href','UpcomingEventsServices.html');
      if(t==='Parish Administration') a.setAttribute('href','ParishAdministration.html');
    });
  }

  function forceSectionArrows(){
    $$('.section-link,.card-head a,.stat-card a,.parish-stat a').forEach(a=>{
      const txt=a.textContent.replace(/[→➜›»]+/g,'').trim();
      a.innerHTML=`${txt} ${fa('fa-arrow-right')}`;
    });
  }

  function ensureCalendarPanel(){
    if(!document.body.classList.contains('events-page')) return null;
    let panel=$('#eventCalendarPanel');
    const tableCard=$('.event-table-card');
    if(!panel && tableCard){
      tableCard.insertAdjacentHTML('beforebegin',`<section class="calendar-view-panel" id="eventCalendarPanel" aria-label="Event calendar"><div class="event-cal-head"><button type="button" id="eventCalPrev" aria-label="Previous">${fa('fa-chevron-left')}</button><div class="event-cal-title" id="eventCalTitle"></div><div class="event-cal-controls"><button type="button" id="eventCalMonth">Month</button><button type="button" id="eventCalYear">Year</button><button type="button" id="eventCalNext" aria-label="Next">${fa('fa-chevron-right')}</button></div></div><div class="event-cal-grid" id="eventCalGrid"></div></section>`);
      panel=$('#eventCalendarPanel');
    }
    renderCalendar();
    return panel;
  }

  function renderCalendar(){
    const title=$('#eventCalTitle'), grid=$('#eventCalGrid');
    if(!grid || !title) return;
    title.textContent=calView==='year'?String(calYear):`${months[calMonth]} ${calYear}`;
    if(calView==='year'){
      grid.className='event-cal-grid year';
      grid.innerHTML=months.map((m,i)=>`<button type="button" data-cal-month="${i}" class="${i===calMonth?'active':''}">${m}<small>${calYear}</small></button>`).join('');
      return;
    }
    const first=new Date(calYear,calMonth,1).getDay();
    const days=new Date(calYear,calMonth+1,0).getDate();
    const marked=[1,5,13,18,20,21,25,29];
    const cells=['SUN','MON','TUE','WED','THU','FRI','SAT'];
    for(let i=0;i<first;i++) cells.push('');
    for(let d=1;d<=days;d++) cells.push(d);
    grid.className='event-cal-grid';
    grid.innerHTML=cells.map((d,i)=>{
      if(i<7) return `<button type="button" class="day-name" disabled>${d}</button>`;
      if(d==='') return `<button type="button" class="muted" disabled></button>`;
      return `<button type="button" data-cal-day="${d}" class="${marked.includes(d)?'has-event':''} ${d===calSelected?'active':''}">${d}</button>`;
    }).join('');
  }

  function toggleCalendar(){
    const p=ensureCalendarPanel();
    if(p) p.classList.toggle('show');
  }

  function applyFilter(){
    const active=($('#eventTabs .active')?.textContent||'All').trim().toLowerCase();
    const catSel=$$('.filters select')[0]?.value || 'All Categories';
    const locSel=$$('.filters select')[1]?.value || 'All Locations';
    const map={all:'all',events:'event',services:'service','special services':'special service',programs:'program',retreats:'retreat',meetings:'meeting'};
    const wanted=map[active]||'all';
    let count=0;
    $$('#eventsTable tbody .empty-row').forEach(r=>r.remove());
    $$('#eventsTable tbody tr').forEach(tr=>{
      const cat=(tr.dataset.cat||'').toLowerCase();
      const loc=(tr.children[3]?.textContent||'').trim();
      const okTab=wanted==='all'||cat===wanted;
      const okCat=catSel==='All Categories'||cat===catSel.toLowerCase();
      const okLoc=locSel==='All Locations'||loc===locSel;
      const ok=okTab&&okCat&&okLoc;
      tr.style.display=ok?'':'none';
      if(ok) count++;
    });
    if(count===0 && $('#eventsTable tbody')) $('#eventsTable tbody').insertAdjacentHTML('beforeend','<tr class="empty-row"><td colspan="8">No matching events found</td></tr>');
  }

  function bindActions(){
    const calBtn=$('#eventCalendarBtn');
    if(calBtn){
      calBtn.onclick=function(e){e.preventDefault();e.stopPropagation();toggleCalendar();};
    }
    document.addEventListener('click',function(e){
      const target=e.target.closest('#eventCalPrev,#eventCalNext,#eventCalMonth,#eventCalYear,[data-cal-day],[data-cal-month]');
      if(!target) return;
      e.preventDefault(); e.stopPropagation();
      if(target.id==='eventCalPrev'){
        if(calView==='year') calYear--; else {calMonth--; if(calMonth<0){calMonth=11;calYear--;}}
      } else if(target.id==='eventCalNext'){
        if(calView==='year') calYear++; else {calMonth++; if(calMonth>11){calMonth=0;calYear++;}}
      } else if(target.id==='eventCalMonth') calView='month';
      else if(target.id==='eventCalYear') calView='year';
      else if(target.dataset.calMonth){ calMonth=Number(target.dataset.calMonth); calView='month'; }
      else if(target.dataset.calDay){ calSelected=Number(target.dataset.calDay); }
      renderCalendar();
    },true);
    $$('#eventTabs button').forEach(btn=>{btn.onclick=function(){ $$('#eventTabs button').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); applyFilter(); };});
    $$('.filters select').forEach(sel=>{sel.onchange=applyFilter;});
    $$('.filters .filter-btn').forEach(btn=>{ if(btn.id!=='eventCalendarBtn') btn.onclick=(e)=>{e.preventDefault();applyFilter();}; });
    document.addEventListener('click',function(e){
      const btn=e.target.closest('.action-dot');
      if(!btn) return;
      e.preventDefault();e.stopPropagation();
      document.querySelector('.action-menu')?.remove();
      const menu=document.createElement('div');
      menu.className='action-menu';
      menu.innerHTML='<button type="button"><i class="fa-regular fa-eye"></i> View Details</button><button type="button"><i class="fa-regular fa-pen-to-square"></i> Edit Event</button><button type="button"><i class="fa-solid fa-users"></i> Registrations</button><button type="button"><i class="fa-regular fa-trash-can"></i> Delete</button>';
      document.body.appendChild(menu);
      const r=btn.getBoundingClientRect();
      menu.style.top=(r.bottom+6+window.scrollY)+'px';
      menu.style.left=Math.max(12,r.left-140+window.scrollX)+'px';
      menu.querySelectorAll('button').forEach(b=>b.onclick=()=>{ if(window.showModal){showModal(`<h2>${b.textContent.trim()}</h2><p style="font-size:13px;color:#66728a">Action selected successfully.</p><div class="modal-actions"><button class="btn primary" onclick="modal.classList.remove('show')">OK</button></div>`);} menu.remove(); });
    },true);
  }

  function whiteIcons(){
    $$('.event-stat-grid .stat-icon i,.stat-icon i').forEach(i=>{ if(i.closest('.stat-icon')) i.style.color='#fff'; });
  }
  function mobileMenuFix(){
    const menu=$('#menuBtn'), sidebar=$('#sidebar'), overlay=$('#overlay');
    if(menu && sidebar){ menu.onclick=function(e){ e.preventDefault(); if(innerWidth<=900){sidebar.classList.toggle('open'); overlay?.classList.toggle('show');} else document.body.classList.toggle('desktop-collapsed'); }; }
    overlay && (overlay.onclick=function(){sidebar?.classList.remove('open'); overlay.classList.remove('show');});
  }
  function init(){forceNavLinks();forceSectionArrows();ensureCalendarPanel();bindActions();whiteIcons();mobileMenuFix();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
  setTimeout(init,300);
})();

/* FINAL REQUEST PATCH - reliable calendar, filters, popup buttons */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
  let mm=4, yy=2025, view='month', selected=18;
  const arrowIcon='<i class="fa-solid fa-arrow-right" aria-hidden="true"></i>';
  function replaceTextArrows(){
    $$('.section-link,.card-head a,.stat-card a,.parish-stat a').forEach(a=>{
      const txt=(a.textContent||'').replace(/[→➜›»]+/g,'').trim();
      if(txt) a.innerHTML=txt+' '+arrowIcon;
    });
  }
  function forceWhiteIcons(){
    $$('.event-stat-grid .stat-icon i,.stat-card .stat-icon i,.stat-icon i').forEach(i=>{i.style.setProperty('color','#fff','important');});
  }
  function stripPopupButtons(){
    $$('.wizard-footer [data-back],.wizard-footer button').forEach(b=>{
      if(b.hasAttribute('data-back') || /cancel/i.test(b.textContent||'')) b.remove();
    });
  }
  const oldShow=window.showModal;
  if(typeof oldShow==='function' && !window.__patchedShowModal){
    window.__patchedShowModal=true;
    window.showModal=function(html){ oldShow(html); setTimeout(()=>{stripPopupButtons(); compactChecks();},0); };
  }
  function compactChecks(){
    $$('input[type="radio"],input[type="checkbox"]').forEach(inp=>{
      inp.style.setProperty('width','14px','important');inp.style.setProperty('height','14px','important');inp.style.setProperty('min-width','14px','important');inp.style.setProperty('margin','0','important');
      const l=inp.closest('label'); if(l){l.style.display='inline-flex';l.style.alignItems='center';l.style.gap='7px';l.style.marginRight='18px';}
    });
    $$('.field label,.wizard-tabs button').forEach(el=>el.style.setProperty('font-weight','600','important'));
  }
  function ensurePanel(){
    if(!document.body.classList.contains('events-page')) return null;
    let panel=$('#eventCalendarPanel');
    const anchor=$('.event-table-card');
    if(!panel && anchor){
      anchor.insertAdjacentHTML('beforebegin',`<section class="calendar-view-panel" id="eventCalendarPanel"><div class="event-cal-head"><button type="button" id="eventCalPrev"><i class="fa-solid fa-chevron-left"></i></button><div class="event-cal-title" id="eventCalTitle"></div><div class="event-cal-controls"><button type="button" id="eventCalMonth">Month</button><button type="button" id="eventCalYear">Year</button><button type="button" id="eventCalNext"><i class="fa-solid fa-chevron-right"></i></button></div></div><div class="event-cal-grid" id="eventCalGrid"></div></section>`);
      panel=$('#eventCalendarPanel');
    }
    draw();
    return panel;
  }
  function draw(){
    const title=$('#eventCalTitle'), grid=$('#eventCalGrid'); if(!title||!grid)return;
    title.textContent=view==='year'?String(yy):`${months[mm]} ${yy}`;
    if(view==='year'){
      grid.className='event-cal-grid year';
      grid.innerHTML=months.map((mo,i)=>`<button type="button" data-mfinal="${i}" class="${i===mm?'active':''}">${mo}<small>${yy}</small></button>`).join('');
      return;
    }
    const first=new Date(yy,mm,1).getDay(), days=new Date(yy,mm+1,0).getDate();
    const marked=[1,5,13,18,20,21,25,29];
    let cells=['SUN','MON','TUE','WED','THU','FRI','SAT']; for(let i=0;i<first;i++)cells.push(''); for(let d=1;d<=days;d++)cells.push(d);
    grid.className='event-cal-grid';
    grid.innerHTML=cells.map((d,i)=>i<7?`<button type="button" class="day-name" disabled>${d}</button>`:(d===''?`<button type="button" class="muted" disabled></button>`:`<button type="button" data-dfinal="${d}" class="${marked.includes(d)?'has-event':''} ${d===selected?'active':''}">${d}</button>`)).join('');
  }
  function applyFilters(){
    if(!$('#eventsTable tbody')) return;
    const active=($('#eventTabs .active')?.textContent||'All').trim().toLowerCase();
    const category=($$('.filters select')[0]?.value||'All Categories').toLowerCase();
    const location=($$('.filters select')[1]?.value||'All Locations');
    const map={all:'all',events:'event',services:'service','special services':'special service',programs:'program',retreats:'retreat',meetings:'meeting'};
    const wanted=map[active]||'all'; let count=0;
    $$('#eventsTable tbody .empty-row').forEach(r=>r.remove());
    $$('#eventsTable tbody tr').forEach(tr=>{
      const cat=(tr.dataset.cat||tr.children[2]?.textContent||'').trim().toLowerCase();
      const loc=(tr.children[3]?.textContent||'').trim();
      const okTab=wanted==='all'||cat===wanted;
      const okCat=category==='all categories'||cat===category;
      const okLoc=location==='All Locations'||loc===location;
      const ok=okTab&&okCat&&okLoc;
      tr.style.display=ok?'':'none'; if(ok)count++;
    });
    if(!count) $('#eventsTable tbody').insertAdjacentHTML('beforeend','<tr class="empty-row"><td colspan="8">No matching events found</td></tr>');
  }
  function bind(){
    replaceTextArrows(); forceWhiteIcons(); compactChecks(); stripPopupButtons();
    if(!document.body.classList.contains('events-page')) return;
    ensurePanel();
    const calBtn=$('#eventCalendarBtn');
    if(calBtn){calBtn.onclick=function(e){e.preventDefault();e.stopPropagation();const p=ensurePanel();p&&p.classList.toggle('show');draw();return false;};}
    $$('#eventTabs button').forEach(btn=>{btn.onclick=function(e){e.preventDefault();$$('#eventTabs button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');applyFilters();};});
    $$('.filters select').forEach(sel=>{sel.onchange=applyFilters;});
    $$('.filters .filter-btn').forEach(btn=>{if(btn.id!=='eventCalendarBtn')btn.onclick=function(e){e.preventDefault();applyFilters();};});
  }
  document.addEventListener('click',function(e){
    const t=e.target.closest('#eventCalPrev,#eventCalNext,#eventCalMonth,#eventCalYear,[data-mfinal],[data-dfinal]');
    if(!t)return; e.preventDefault(); e.stopPropagation();
    if(t.id==='eventCalPrev'){ if(view==='year')yy--; else{mm--; if(mm<0){mm=11;yy--;}} }
    else if(t.id==='eventCalNext'){ if(view==='year')yy++; else{mm++; if(mm>11){mm=0;yy++;}} }
    else if(t.id==='eventCalMonth'){ view='month'; }
    else if(t.id==='eventCalYear'){ view='year'; }
    else if(t.dataset.mfinal!==undefined){ mm=Number(t.dataset.mfinal); view='month'; }
    else if(t.dataset.dfinal!==undefined){ selected=Number(t.dataset.dfinal); }
    draw(); return false;
  },true);
  document.addEventListener('click',function(e){setTimeout(()=>{stripPopupButtons();compactChecks();forceWhiteIcons();},0);},true);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
  setTimeout(bind,350); setTimeout(bind,900);
})();

/* Sacrament Reports page */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const records=[
    ['MAY|18|2025','Baptism','Aaron Joseph','Son of Joseph & Maria','Male','Child (0-12)','Joseph Mathew<br>Maria Joseph','Main Church','Rev. Michael','Baptized during<br>Sunday service'],
    ['MAY|11|2025','Holy Communion','Anna Grace','Daughter of Grace & Samuel','Female','Child (7-12)','Samuel Thomas<br>Grace Samuel','St. Peter’s Chapel','Rev. Michael','First Holy Communion'],
    ['MAY|04|2025','Confirmation','Daniel Thomas','Son of Thomas & Lily','Male','Youth (13-18)','Thomas Daniel<br>Lily Thomas','Main Church','Bishop John Samuel','Confirmed during<br>Easter service'],
    ['APR|27|2025','Marriage','Alex Varghese & Rose Alex','Reg. No. MRG-2025-025','—','Adult (19+)','—','St. Mary’s Mission','Rev. Michael','Church wedding'],
    ['APR|20|2025','Holy Communion','Emily Rose','Daughter of Alex & Rose','Female','Child (7-12)','Alex Varghese<br>Rose Alex','Hill View Branch','Rev. Michael','Palm Sunday'],
    ['APR|15|2025','Funeral','Mathew Abraham','(73 Years)','Male','Senior (60+)','—','Main Church','Rev. Jacob','Passed away on<br>12 Apr 2025'],
    ['APR|15|2025','Baptism','Joshua Peter','Son of Peter & Anitha','Male','Child (0-12)','Peter Samuel<br>Anitha Peter','St. Peter’s Chapel','Rev. Michael','—'],
    ['APR|06|2025','Confirmation','Sophia Mary','Daughter of Biju & Mary','Female','Youth (13-18)','Biju Varghese<br>Mary Biju','Main Church','Bishop John Samuel','Faith class 2024'],
    ['MAR|30|2025','Holy Communion','Mia Teresa','Daughter of Martin & Teresa','Female','Child (7-12)','Martin Joseph<br>Teresa Martin','St. Mary’s Mission','Rev. Michael','First Holy Communion'],
    ['MAR|23|2025','Marriage','John Mathew & Lincy Anil','Reg. No. MRG-2025-012','—','Adult (19+)','—','Main Church','Rev. Michael','—']
  ];
  function badge(t){const k=t==='Holy Communion'?'communion':t.toLowerCase();return `<span class="sac-badge sac-${k}">${t}</span>`}
  function renderTable(){
    const table=$('#sacramentTable'); if(!table)return;
    const monMap={JAN:'01',FEB:'02',MAR:'03',APR:'04',MAY:'05',JUN:'06',JUL:'07',AUG:'08',SEP:'09',OCT:'10',NOV:'11',DEC:'12'};
    table.innerHTML='<thead><tr><th>Date</th><th>Sacrament Type</th><th>Name</th><th>Gender</th><th>Age Group</th><th>Parents / Spouse</th><th>Location</th><th>Officiated By</th><th>Remarks</th><th>Actions</th></tr></thead><tbody>'+records.map((r,idx)=>{const dp=r[0].split('|'); const iso=`${dp[2]}-${monMap[dp[0]]}-${String(dp[1]).padStart(2,'0')}`; return `<tr data-index="${idx}" data-date="${iso}" data-type="${r[1]}" data-location="${r[7]}" data-by="${r[8]}"><td><div class="datebox"><span>${dp[0]}</span>${dp[1]}<small>${dp[2]}</small></div></td><td>${badge(r[1])}</td><td class="sac-name"><b>${r[2]}</b><span>${r[3]}</span></td><td>${r[4]==='—'?'—':`<span class="gender-badge gender-${r[4].toLowerCase()}">${r[4]}</span>`}</td><td><span class="age-badge">${r[5]}</span></td><td>${r[6]}</td><td>${r[7]}</td><td>${r[8]}</td><td>${r[9]}</td><td><div class="row-actions"><button data-action="view" title="View"><i class="fa-regular fa-eye"></i></button><button class="more" data-action="more" title="More"><i class="fa-solid fa-ellipsis-vertical"></i></button></div></td></tr>`}).join('')+'</tbody>';
    applyFilter();
  }
  function renderMetrics(){
    const data=[['fa-chalice','Total Sacraments','171','This Year','↑ 14% vs Last Year'],['fa-droplet','Baptisms','48','This Year','(28.1%)'],['fa-hands-praying','Holy Communions','62','This Year','(36.3%)'],['fa-cross','Confirmations','34','This Year','(19.9%)'],['fa-ring','Marriages','18','This Year','(19.9%)'],['fa-cross','Funerals','27','This Year','(15.8%)']];
    const box=$('#sacramentMetrics'); if(box) box.innerHTML=data.map(d=>`<div class="sacrament-metric"><div class="stat-icon"><i class="fa-solid ${d[0]}"></i></div><div><h4>${d[1]}</h4><div class="num">${d[2]}</div><p>${d[3]}</p><small>${d[4]}</small></div></div>`).join('');
    const leg=$('#locationLegend'); if(leg) leg.innerHTML=[['#0077b6','Main Church','78 (45.6%)'],['#ff8a1d','St. Peter’s Chapel','34 (19.9%)'],['#7545e8','St. Mary’s Mission','31 (18.1%)'],['#8bd4b8','Hill View Branch','28 (16.4%)']].map(x=>`<div class="legend-item"><i style="background:${x[0]}"></i><span>${x[1]}</span><b>${x[2]}</b></div>`).join('');
    drawDonut();
  }
  function drawDonut(){const c=$('#sacramentChart'); if(!c)return; const ctx=c.getContext('2d'), vals=[78,34,31,28], cols=['#0077b6','#ff8a1d','#7545e8','#8bd4b8']; let total=vals.reduce((a,b)=>a+b,0), start=-Math.PI/2; ctx.clearRect(0,0,c.width,c.height); vals.forEach((v,i)=>{let end=start+Math.PI*2*v/total;ctx.beginPath();ctx.moveTo(80,80);ctx.arc(80,80,60,start,end);ctx.closePath();ctx.fillStyle=cols[i];ctx.fill();start=end});ctx.globalCompositeOperation='destination-out';ctx.beginPath();ctx.arc(80,80,34,0,Math.PI*2);ctx.fill();ctx.globalCompositeOperation='source-over';ctx.fillStyle='#07183d';ctx.font='800 24px Open Sans';ctx.textAlign='center';ctx.fillText('171',80,78);ctx.font='600 10px Open Sans';ctx.fillText('Total',80,96)}
  function applyFilter(){
    const type=($('#sacramentType')?.value||'All').replace(/s$/,''); const loc=$('#sacramentLocation')?.value||'All Locations'; const by=$('#sacramentBy')?.value||'All';
    const start=$('#sacramentStart')?.value||'1900-01-01', end=$('#sacramentEnd')?.value||'2999-12-31';
    const tab=($('#sacramentTabs .active')?.textContent||'All Sacraments').replace(/s$/,'').replace('All Sacrament','All'); let count=0;
    $$('#sacramentTable tbody .empty-row').forEach(r=>r.remove());
    $$('#sacramentTable tbody tr').forEach(tr=>{const okDate=tr.dataset.date>=start&&tr.dataset.date<=end; const okType=(type==='All'||tr.dataset.type===type); const okLoc=(loc==='All Locations'||tr.dataset.location===loc); const okBy=(by==='All'||tr.dataset.by===by); const okTab=(tab==='All'||tr.dataset.type===tab|| (tab==='Holy Communion'&&tr.dataset.type==='Holy Communion')); const ok=okDate&&okType&&okLoc&&okBy&&okTab; tr.style.display=ok?'':'none'; if(ok)count++;});
    $('#recordCount') && ($('#recordCount').textContent=`(${count||0})`); $('#sacramentShowing') && ($('#sacramentShowing').textContent=`Showing ${count?1:0} to ${Math.min(count,10)} of ${count} records`);
    if(!count&&$('#sacramentTable tbody')) $('#sacramentTable tbody').insertAdjacentHTML('beforeend','<tr class="empty-row"><td colspan="10">No matching sacrament records found</td></tr>');
  }
  function bind(){
    if(!document.body.classList.contains('sacrament-page'))return;
    renderMetrics(); renderTable();
    $$('#sacramentTabs button').forEach(b=>b.onclick=()=>{$$('#sacramentTabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');applyFilter();});
    ['#sacramentFilter','#sacramentLocation','#sacramentType','#sacramentBy','#sacramentStart','#sacramentEnd'].forEach(s=>$(s)?.addEventListener('change',applyFilter)); $('#sacramentFilter')?.addEventListener('click',applyFilter);
    $('#sacramentReset')?.addEventListener('click',()=>{['#sacramentLocation','#sacramentType','#sacramentBy'].forEach(s=>$(s).selectedIndex=0); if($('#sacramentStart'))$('#sacramentStart').value='2025-01-01'; if($('#sacramentEnd'))$('#sacramentEnd').value='2025-12-31'; $$('#sacramentTabs button').forEach((b,i)=>b.classList.toggle('active',i===0)); applyFilter();});
    document.addEventListener('click',e=>{const a=e.target.closest('#sacramentTable [data-action]'); if(!a)return; e.preventDefault(); e.stopPropagation(); const tr=a.closest('tr'); if(!tr)return; const r=records[Number(tr.dataset.index)]; if(a.dataset.action==='view'){showModal(`<h2>Sacrament Record Details</h2><div class="detail-grid"><div><b>Name</b><span>${r[2]}</span></div><div><b>Sacrament Type</b><span>${r[1]}</span></div><div><b>Date</b><span>${r[0].replaceAll('|',' ')}</span></div><div><b>Gender</b><span>${r[4]}</span></div><div><b>Age Group</b><span>${r[5]}</span></div><div><b>Location</b><span>${r[7]}</span></div><div><b>Officiated By</b><span>${r[8]}</span></div><div><b>Parents / Spouse</b><span>${r[6]}</span></div><div class="wide"><b>Remarks</b><span>${r[9]}</span></div></div><div class="modal-actions"><button class="btn primary" onclick="modal.classList.remove('show')">Close</button></div>`);return;} $('.sacrament-action-menu')?.remove(); const m=document.createElement('div'); m.className='action-menu sacrament-action-menu'; m.innerHTML='<button data-sac-menu="edit"><i class="fa-regular fa-pen-to-square"></i> Edit</button><button data-sac-menu="delete"><i class="fa-regular fa-trash-can"></i> Delete</button>'; document.body.appendChild(m); const br=a.getBoundingClientRect(); m.style.top=(br.bottom+6+scrollY)+'px'; m.style.left=Math.max(12,br.left-105+scrollX)+'px'; m.querySelectorAll('button').forEach(b=>b.onclick=()=>{showModal(`<h2>${b.dataset.sacMenu==='edit'?'Edit Sacrament Record':'Delete Sacrament Record'}</h2><p style="font-size:13px;color:#66728a">${r[2]} - ${r[1]}</p><div class="modal-actions"><button class="btn primary" onclick="modal.classList.remove('show')">OK</button></div>`);m.remove();});},true);
    document.addEventListener('click',e=>{if(!e.target.closest('.sacrament-action-menu,#sacramentTable [data-action="more"]'))$('.sacrament-action-menu')?.remove();});
    $('#sacramentExport')?.addEventListener('click',()=>alert('Sacrament report exported.')); $('#generateReport')?.addEventListener('click',()=>alert('All Sacraments report generated.'));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();

/* === FINAL FIX: keep clicked subnav parent open + working Sacrament date range === */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  function currentPage(){return (location.pathname.split('/').pop()||'index.html').toLowerCase();}
  function normalize(t){return (t||'').replace(/^\s*-\s*/,'').trim().toLowerCase();}
  function fixOpenSubnav(){
    const page=currentPage();
    const nav=$('#navMenu'); if(!nav) return;
    $$('.nav-group',nav).forEach(g=>{g.classList.remove('open'); g.querySelector('.nav-main')?.classList.remove('active');});
    $$('.subnav a',nav).forEach(a=>a.classList.remove('active'));
    let target=null;
    if(page==='sacramentreports.html') target=$$('.subnav a',nav).find(a=>normalize(a.textContent)==='sacrament reports' && /SacramentReports\.html/i.test(a.getAttribute('href')||''));
    if(page==='upcomingeventsservices.html') target=$$('.subnav a',nav).find(a=>normalize(a.textContent)==='upcoming events & services');
    if(page==='birthdaysanniversaries.html') target=$$('.subnav a',nav).find(a=>normalize(a.textContent)==='birthdays & anniversaries' && /BirthdaysAnniversaries\.html/i.test(a.getAttribute('href')||''));
    if(page==='parishadministration.html') target=$$('.nav-title',nav).find(s=>normalize(s.textContent)==='parish administration')?.closest('.nav-main');
    if(target){
      if(target.classList.contains('nav-main')){target.classList.add('active');target.closest('.nav-group')?.classList.add('open');}
      else{target.classList.add('active');const group=target.closest('.nav-group');group?.classList.add('open');group?.querySelector('.nav-main')?.classList.add('active');}
    }
    $$('.subnav a',nav).forEach(a=>{
      a.onclick=function(){
        const group=a.closest('.nav-group');
        if(group){group.classList.add('open'); group.querySelector('.nav-main')?.classList.add('active');}
      };
    });
  }
  function parseDate(v){return v ? new Date(v+'T00:00:00').getTime() : null;}
  function filterSacramentRows(){
    if(!document.body.classList.contains('sacrament-page')) return;
    const start=parseDate($('#sacramentStart')?.value)||-Infinity;
    const end=parseDate($('#sacramentEnd')?.value)||Infinity;
    const type=($('#sacramentType')?.value||'All').replace(/s$/,'');
    const loc=$('#sacramentLocation')?.value||'All Locations';
    const by=$('#sacramentBy')?.value||'All';
    const activeTab=($('#sacramentTabs .active')?.textContent||'All Sacraments').replace(/s$/,'').replace('All Sacrament','All');
    const tbody=$('#sacramentTable tbody'); if(!tbody) return;
    $$('#sacramentTable tbody .empty-row').forEach(r=>r.remove());
    let count=0;
    $$('#sacramentTable tbody tr').forEach(tr=>{
      const d=parseDate(tr.dataset.date)||0;
      const rowType=tr.dataset.type||'';
      const okDate=d>=start && d<=end;
      const okType=type==='All'||rowType===type;
      const okLoc=loc==='All Locations'||tr.dataset.location===loc;
      const okBy=by==='All'||tr.dataset.by===by;
      const okTab=activeTab==='All'||rowType===activeTab;
      const ok=okDate&&okType&&okLoc&&okBy&&okTab;
      tr.style.display=ok?'':'none'; if(ok)count++;
    });
    if(!count) tbody.insertAdjacentHTML('beforeend','<tr class="empty-row"><td colspan="10">No matching sacrament records found</td></tr>');
    if($('#recordCount')) $('#recordCount').textContent=`(${count})`;
    if($('#sacramentShowing')) $('#sacramentShowing').textContent=`Showing ${count?1:0} to ${Math.min(count,10)} of ${count} records`;
  }
  function bindSacramentDateRange(){
    if(!document.body.classList.contains('sacrament-page')) return;
    const start=$('#sacramentStart'), end=$('#sacramentEnd');
    [start,end,$('#sacramentLocation'),$('#sacramentType'),$('#sacramentBy')].forEach(el=>{ if(el){el.oninput=filterSacramentRows;el.onchange=filterSacramentRows;} });
    const btn=$('#sacramentFilter'); if(btn) btn.onclick=(e)=>{e.preventDefault();filterSacramentRows();};
    const reset=$('#sacramentReset'); if(reset) reset.onclick=(e)=>{e.preventDefault(); if(start)start.value='2025-01-01'; if(end)end.value='2025-12-31'; ['#sacramentLocation','#sacramentType','#sacramentBy'].forEach(s=>{const x=$(s);if(x)x.selectedIndex=0;}); $$('#sacramentTabs button').forEach((b,i)=>b.classList.toggle('active',i===0)); filterSacramentRows();};
    $('.date-range-fields i')?.addEventListener('click',()=>{try{start?.showPicker?.()}catch(e){start?.focus();}});
    setTimeout(filterSacramentRows,200);
  }
  function run(){fixOpenSubnav();bindSacramentDateRange();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run); else run();
  setTimeout(run,300);setTimeout(run,900);
})();

/* === Sacrament Reports final date/filter/grid/list fix === */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  function parseISO(v){ return /^\d{4}-\d{2}-\d{2}$/.test(v||'') ? v : ''; }
  function visibleRows(){ return $$('#sacramentTable tbody tr').filter(tr=>!tr.classList.contains('empty-row') && tr.style.display!=='none'); }
  function createGrid(){
    const card=$('.sacrament-table-card'); const table=$('#sacramentTable'); if(!card||!table)return;
    let wrap=$('#sacramentGridWrap'); if(!wrap){wrap=document.createElement('div');wrap.id='sacramentGridWrap';wrap.className='sacrament-grid-wrap';$('.table-wrap')?.after(wrap);}
    const rows=visibleRows();
    wrap.innerHTML=rows.map(tr=>{
      const tds=Array.from(tr.children); const idx=tr.dataset.index||'';
      return `<article class="sacrament-record-card" data-index="${idx}"><div class="card-top"><div><h4>${tds[2]?.querySelector('b')?.textContent||tds[2]?.textContent||''}</h4><p>${tds[2]?.querySelector('span')?.textContent||''}</p></div>${tds[1]?.innerHTML||''}</div><div class="card-meta"><span>Date<b>${tds[0]?.innerText.replace(/\n/g,' ')||''}</b></span><span>Gender<b>${tds[3]?.innerText||''}</b></span><span>Age Group<b>${tds[4]?.innerText||''}</b></span><span>Location<b>${tds[6]?.innerText||''}</b></span><span>Officiated By<b>${tds[7]?.innerText||''}</b></span><span>Remarks<b>${tds[8]?.innerText||''}</b></span></div><div class="row-actions"><button data-grid-action="view" title="View"><i class="fa-regular fa-eye"></i></button><button data-grid-action="more" class="more" title="More"><i class="fa-solid fa-ellipsis-vertical"></i></button></div></article>`;
    }).join('') || '<div class="empty-row">No matching sacrament records found</div>';
  }
  function syncFilter(){
    const start=parseISO($('#sacramentStart')?.value)||'1900-01-01';
    const end=parseISO($('#sacramentEnd')?.value)||'2999-12-31';
    const type=$('#sacramentType')?.value||'All';
    const loc=$('#sacramentLocation')?.value||'All Locations';
    const by=$('#sacramentBy')?.value||'All';
    let tab=($('#sacramentTabs .active')?.textContent||'All Sacraments').trim();
    const singular={Baptisms:'Baptism',Confirmations:'Confirmation',Marriages:'Marriage',Funerals:'Funeral','Holy Communions':'Holy Communion','All Sacraments':'All'};
    tab=singular[tab]||tab;
    let count=0; $$('#sacramentTable tbody .empty-row').forEach(x=>x.remove());
    $$('#sacramentTable tbody tr').forEach(tr=>{
      const okDate=(tr.dataset.date||'')>=start && (tr.dataset.date||'')<=end;
      const okType=type==='All'||tr.dataset.type===type;
      const okLoc=loc==='All Locations'||tr.dataset.location===loc;
      const okBy=by==='All'||tr.dataset.by===by;
      const okTab=tab==='All'||tr.dataset.type===tab;
      const ok=okDate&&okType&&okLoc&&okBy&&okTab;
      tr.style.display=ok?'':'none'; if(ok)count++;
    });
    const rc=$('#recordCount'); if(rc)rc.textContent=`(${count})`;
    const sh=$('#sacramentShowing'); if(sh)sh.textContent=`Showing ${count?1:0} to ${Math.min(10,count)} of ${count} records`;
    if(!count && $('#sacramentTable tbody')) $('#sacramentTable tbody').insertAdjacentHTML('beforeend','<tr class="empty-row"><td colspan="10">No matching sacrament records found</td></tr>');
    createGrid();
  }
  function bindFinal(){
    if(!document.body.classList.contains('sacrament-page'))return;
    const list=$('#sacramentListView'), grid=$('#sacramentGridView'), card=$('.sacrament-table-card');
    list?.addEventListener('click',e=>{e.preventDefault();card?.classList.remove('grid-mode');list.classList.add('active');grid?.classList.remove('active');});
    grid?.addEventListener('click',e=>{e.preventDefault();createGrid();card?.classList.add('grid-mode');grid.classList.add('active');list?.classList.remove('active');});
    ['#sacramentStart','#sacramentEnd','#sacramentLocation','#sacramentType','#sacramentBy'].forEach(sel=>$(sel)?.addEventListener('input',syncFilter));
    $('#sacramentFilter')?.addEventListener('click',e=>{e.preventDefault();syncFilter();});
    $('#sacramentReset')?.addEventListener('click',e=>{e.preventDefault(); if($('#sacramentStart'))$('#sacramentStart').value='2025-01-01'; if($('#sacramentEnd'))$('#sacramentEnd').value='2025-12-31'; ['#sacramentLocation','#sacramentType','#sacramentBy'].forEach(s=>{const el=$(s); if(el)el.selectedIndex=0}); $$('#sacramentTabs button').forEach((b,i)=>b.classList.toggle('active',i===0)); syncFilter();});
    $$('#sacramentTabs button').forEach(b=>b.addEventListener('click',()=>setTimeout(syncFilter,0)));
    $('.date-range-fields')?.addEventListener('click',e=>{ if(e.target.matches('input'))return; const st=$('#sacramentStart'); try{st?.showPicker?.()}catch(_){st?.focus();} });
    document.addEventListener('click',e=>{const btn=e.target.closest('[data-grid-action]'); if(!btn)return; const idx=Number(btn.closest('.sacrament-record-card')?.dataset.index||0); const row=$(`#sacramentTable tbody tr[data-index="${idx}"]`); row?.querySelector(`[data-action="${btn.dataset.gridAction==='more'?'more':'view'}"]`)?.click();});
    setTimeout(syncFilter,200);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindFinal);else bindFinal();
})();

/* === Final Sacrament Reports date range, filter, grid/list repair === */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  function isSac(){return document.body.classList.contains('sacrament-page');}
  function getRows(){return $$('#sacramentTable tbody tr').filter(tr=>!tr.classList.contains('empty-row'));}
  function normalizedTab(){
    const map={'All Sacraments':'All','Baptisms':'Baptism','Holy Communions':'Holy Communion','Confirmations':'Confirmation','Marriages':'Marriage','Funerals':'Funeral'};
    return map[($('#sacramentTabs .active')?.textContent||'All Sacraments').trim()]||'All';
  }
  function applySacramentFilter(){
    if(!isSac() || !$('#sacramentTable tbody')) return;
    const start=$('#sacramentStart')?.value || '1900-01-01';
    const end=$('#sacramentEnd')?.value || '2999-12-31';
    const location=$('#sacramentLocation')?.value || 'All Locations';
    const type=$('#sacramentType')?.value || 'All';
    const by=$('#sacramentBy')?.value || 'All';
    const tab=normalizedTab();
    $$('#sacramentTable tbody .empty-row').forEach(x=>x.remove());
    let count=0;
    getRows().forEach(tr=>{
      const d=tr.dataset.date || '';
      const okDate=d>=start && d<=end;
      const okLocation=location==='All Locations' || tr.dataset.location===location;
      const okType=type==='All' || tr.dataset.type===type;
      const okBy=by==='All' || tr.dataset.by===by;
      const okTab=tab==='All' || tr.dataset.type===tab;
      const ok=okDate && okLocation && okType && okBy && okTab;
      tr.hidden=!ok;
      tr.style.display=ok?'':'none';
      if(ok) count++;
    });
    if(!count) $('#sacramentTable tbody').insertAdjacentHTML('beforeend','<tr class="empty-row"><td colspan="10">No matching sacrament records found</td></tr>');
    if($('#recordCount')) $('#recordCount').textContent=`(${count})`;
    if($('#sacramentShowing')) $('#sacramentShowing').textContent=`Showing ${count ? 1 : 0} to ${Math.min(count,10)} of ${count} records`;
    buildSacramentGrid();
  }
  function buildSacramentGrid(){
    if(!isSac()) return;
    const table=$('#sacramentTable'), tableWrap=$('.sacrament-table-card .table-wrap');
    if(!table || !tableWrap) return;
    let grid=$('#sacramentGridWrap');
    if(!grid){grid=document.createElement('div');grid.id='sacramentGridWrap';grid.className='sacrament-grid-wrap';tableWrap.after(grid);}
    const rows=getRows().filter(tr=>tr.style.display!=='none' && !tr.hidden);
    grid.innerHTML=rows.map(tr=>{
      const t=Array.from(tr.children);
      const index=tr.dataset.index || '';
      return `<article class="sacrament-record-card" data-index="${index}">
        <div class="card-top"><div><h4>${t[2]?.querySelector('b')?.textContent || t[2]?.textContent || ''}</h4><p>${t[2]?.querySelector('span')?.textContent || ''}</p></div>${t[1]?.innerHTML || ''}</div>
        <div class="card-meta"><span>Date<b>${(t[0]?.innerText || '').replace(/\n/g,' ')}</b></span><span>Gender<b>${t[3]?.innerText || ''}</b></span><span>Age Group<b>${t[4]?.innerText || ''}</b></span><span>Location<b>${t[6]?.innerText || ''}</b></span><span>Officiated By<b>${t[7]?.innerText || ''}</b></span><span>Remarks<b>${t[8]?.innerText || ''}</b></span></div>
        <div class="row-actions"><button type="button" data-grid-action="view" title="View"><i class="fa-regular fa-eye"></i></button><button type="button" class="more" data-grid-action="more" title="More"><i class="fa-solid fa-ellipsis-vertical"></i></button></div>
      </article>`;
    }).join('') || '<div class="empty-row">No matching sacrament records found</div>';
  }
  function bindSacramentFinal(){
    if(!isSac()) return;
    const list=$('#sacramentListView'), grid=$('#sacramentGridView'), card=$('.sacrament-table-card');
    if(list){list.onclick=function(e){e.preventDefault();card?.classList.remove('grid-mode');list.classList.add('active');grid?.classList.remove('active');};}
    if(grid){grid.onclick=function(e){e.preventDefault();buildSacramentGrid();card?.classList.add('grid-mode');grid.classList.add('active');list?.classList.remove('active');};}
    ['#sacramentStart','#sacramentEnd','#sacramentLocation','#sacramentType','#sacramentBy'].forEach(sel=>{
      const el=$(sel); if(!el) return;
      el.oninput=applySacramentFilter;
      el.onchange=applySacramentFilter;
    });
    const filter=$('#sacramentFilter'); if(filter) filter.onclick=e=>{e.preventDefault();applySacramentFilter();};
    const reset=$('#sacramentReset'); if(reset) reset.onclick=e=>{e.preventDefault(); if($('#sacramentStart')) $('#sacramentStart').value='2025-01-01'; if($('#sacramentEnd')) $('#sacramentEnd').value='2025-12-31'; ['#sacramentLocation','#sacramentType','#sacramentBy'].forEach(s=>{const el=$(s); if(el) el.selectedIndex=0;}); $$('#sacramentTabs button').forEach((b,i)=>b.classList.toggle('active',i===0)); applySacramentFilter();};
    $$('#sacramentTabs button').forEach(btn=>{btn.onclick=function(){ $$('#sacramentTabs button').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); applySacramentFilter(); };});
    $$('.date-input-wrap').forEach(wrap=>{wrap.onclick=e=>{const input=wrap.querySelector('input'); if(e.target!==input){ try{input.showPicker();}catch(_){input.focus();} } };});
    document.addEventListener('click',function(e){
      const b=e.target.closest('[data-grid-action]'); if(!b || !isSac()) return;
      e.preventDefault();
      const idx=b.closest('.sacrament-record-card')?.dataset.index;
      const row=$(`#sacramentTable tbody tr[data-index="${idx}"]`);
      const action=b.dataset.gridAction==='more'?'more':'view';
      row?.querySelector(`[data-action="${action}"]`)?.click();
    },true);
    applySacramentFilter();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(bindSacramentFinal,100)); else setTimeout(bindSacramentFinal,100);
  setTimeout(bindSacramentFinal,600);
  setTimeout(bindSacramentFinal,1300);
})();

/* Birthdays & Anniversaries page */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const bdays=[
    {date:'2025-05-15',box:['MAY','15','THU'],name:'Daniel Thomas',sub:'Son of Thomas & Lily',age:'65',ageGroup:'Senior',gender:'Male',location:'Main Church',contact:'98765 43210',remarks:'—',avatar:'images/avatar.svg'},
    {date:'2025-05-16',box:['MAY','16','FRI'],name:'Aaron Joseph',sub:'Son of Joseph & Maria',age:'13',ageGroup:'Youth',gender:'Male',location:'Main Church',contact:'91234 56789',remarks:'—',avatar:'images/avatar.svg'},
    {date:'2025-05-18',box:['MAY','18','SUN'],name:'Anna Grace',sub:'Daughter of Grace & Samuel',age:'10',ageGroup:'Children',gender:'Female',location:'St. Peter’s Chapel',contact:'99887 66554',remarks:'—',avatar:'images/avatar.svg'},
    {date:'2025-05-20',box:['MAY','20','TUE'],name:'George Samuel',sub:'Son of Samuel & Priya',age:'69',ageGroup:'Senior',gender:'Male',location:'St. Peter’s Chapel',contact:'93456 77890',remarks:'—',avatar:'images/avatar.svg'},
    {date:'2025-05-22',box:['MAY','22','THU'],name:'Sophia Mary',sub:'Daughter of Biju & Mary',age:'67',ageGroup:'Senior',gender:'Female',location:'Main Church',contact:'95678 90123',remarks:'—',avatar:'images/avatar.svg'}
  ];
  const anns=[
    {date:'2025-05-17',box:['MAY','17','SAT'],couple:'Alex Varghese & Rose Alex',sub:'Reg. No. MRG-2025-025',years:'12',location:'St. Mary’s Mission',contact:'98765 43210',remarks:'—',avatar:'images/avatar.svg'},
    {date:'2025-05-20',box:['MAY','20','TUE'],couple:'John Mathew & Anu Maria',sub:'Reg. No. MRG-2025-018',years:'25',location:'Main Church',contact:'91234 56789',remarks:'—',avatar:'images/avatar.svg'},
    {date:'2025-05-25',box:['MAY','25','SUN'],couple:'Martin Joseph & Teresa Martin',sub:'Reg. No. MRG-2025-010',years:'8',location:'St. Mary’s Mission',contact:'99887 66554',remarks:'—',avatar:'images/avatar.svg'}
  ];
  function patchNav(){
    $$('#navMenu .subnav a').forEach(a=>{const t=a.textContent.replace(/^\s*-\s*/,'').trim(); if(t==='Birthdays & Anniversaries') a.href='BirthdaysAnniversaries.html';});
    if(document.body.classList.contains('birthday-page')){
      $$('#navMenu .nav-group').forEach(g=>{g.classList.remove('open');g.querySelector('.nav-main')?.classList.remove('active');});
      $$('#navMenu .subnav a').forEach(a=>a.classList.remove('active'));
      const a=$$('#navMenu .subnav a').find(x=>x.textContent.includes('Birthdays & Anniversaries'));
      if(a){a.classList.add('active');const g=a.closest('.nav-group');g?.classList.add('open');g?.querySelector('.nav-main')?.classList.add('active');}
    }
  }
  function datebox(b){return `<div class="datebox"><span>${b[0]}</span>${b[1]}<small>${b[2]}</small></div>`;}
  function actionBtns(kind,i){return `<div class="row-actions"><button class="view-btn" data-bview="${kind}" data-index="${i}" title="View"><i class="fa-regular fa-eye"></i></button><button class="more-btn" data-bmore="${kind}" data-index="${i}" title="More"><i class="fa-solid fa-ellipsis-vertical"></i></button></div>`;}
  function render(){
    const bt=$('#birthdayTable'), at=$('#anniversaryTable'); if(!bt||!at)return;
    bt.innerHTML='<thead><tr><th>Date</th><th>Name</th><th>Age</th><th>Gender</th><th>Location / Branch</th><th>Contact</th><th>Remarks</th><th>Actions</th></tr></thead><tbody>'+bdays.map((r,i)=>`<tr data-date="${r.date}" data-location="${r.location}" data-age="${r.ageGroup}"><td>${datebox(r.box)}</td><td><div class="member-cell"><img src="${r.avatar}" alt=""><div><h4>${r.name}</h4><p>${r.sub}</p></div></div></td><td>${r.age}</td><td><span class="badge-chip ${r.gender.toLowerCase()}">${r.gender}</span></td><td>${r.location}</td><td><a class="phone-link"><i class="fa-solid fa-phone"></i>${r.contact}</a></td><td>${r.remarks}</td><td>${actionBtns('birthday',i)}</td></tr>`).join('')+'</tbody>';
    at.innerHTML='<thead><tr><th>Date</th><th>Couple Name</th><th>Anniversary</th><th>Years</th><th>Location / Branch</th><th>Contact</th><th>Remarks</th><th>Actions</th></tr></thead><tbody>'+anns.map((r,i)=>`<tr data-date="${r.date}" data-location="${r.location}" data-age="Adult"><td>${datebox(r.box)}</td><td><div class="member-cell"><img src="${r.avatar}" alt=""><div><h4>${r.couple}</h4><p>${r.sub}</p></div></div></td><td><span class="badge-chip anniv">Wedding Anniversary</span></td><td>${r.years}</td><td>${r.location}</td><td><a class="phone-link"><i class="fa-solid fa-phone"></i>${r.contact}</a></td><td>${r.remarks}</td><td>${actionBtns('anniversary',i)}</td></tr>`).join('')+'</tbody>';
  }
  function applyFilters(){
    const start=$('#birthdayStart')?.value||'1900-01-01', end=$('#birthdayEnd')?.value||'2999-12-31';
    const loc=$('#birthdayLocation')?.value||'All Locations', age=$('#birthdayAge')?.value||'All'; let bc=0, ac=0;
    $$('#birthdayTable tbody tr,#anniversaryTable tbody tr').forEach(tr=>{const okDate=tr.dataset.date>=start&&tr.dataset.date<=end; const okLoc=loc==='All Locations'||tr.dataset.location===loc; const okAge=age==='All'||tr.dataset.age===age; const ok=okDate&&okLoc&&okAge; tr.classList.toggle('hidden-by-filter',!ok); if(ok&&tr.closest('#birthdayTable'))bc++; if(ok&&tr.closest('#anniversaryTable'))ac++;});
    const show=($('#birthdayTabs .active')?.dataset.type||'birthdays'); $('#upcomingBirthdays')?.classList.toggle('hidden-by-filter',show==='anniversaries'); $('#upcomingAnniversaries')?.classList.toggle('hidden-by-filter',show==='birthdays');
    if(show==='birthdays') $('#birthdayShowing') && ($('#birthdayShowing').textContent=`Showing ${bc?1:0} to ${bc} of ${bc} birthdays`); else $('#birthdayShowing') && ($('#birthdayShowing').textContent=`Showing ${ac?1:0} to ${ac} of ${ac} anniversaries`);
  }
  function openDetails(kind,i){
    const r=kind==='birthday'?bdays[i]:anns[i];
    const title=kind==='birthday'?r.name:r.couple;
    const rows=kind==='birthday' ? [['Name',r.name],['Birthday',r.date],['Age',r.age],['Gender',r.gender],['Location',r.location],['Contact',r.contact],['Family',r.sub],['Remarks',r.remarks]] : [['Couple',r.couple],['Anniversary Date',r.date],['Years',r.years],['Location',r.location],['Contact',r.contact],['Registration',r.sub],['Remarks',r.remarks]];
    if(window.showModal) showModal(`<h2>${title}</h2><div class="detail-grid">${rows.map(x=>`<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div><div class="modal-actions"><button class="btn primary" onclick="modal.classList.remove('show')">Close</button></div>`);
  }
  function bind(){
    if(!document.body.classList.contains('birthday-page')){patchNav();return;}
    render(); patchNav(); applyFilters();
    $$('#birthdayTabs button').forEach(b=>b.onclick=()=>{$$('#birthdayTabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');applyFilters();});
    ['#birthdayStart','#birthdayEnd','#birthdayLocation','#birthdayAge','#birthdayView'].forEach(s=>$(s)?.addEventListener('change',applyFilters));
    $('#birthdayFilterToggle')?.addEventListener('click',()=>$('#birthdayFilters')?.classList.toggle('show'));
    $('#birthdayReset')?.addEventListener('click',e=>{e.preventDefault();$('#birthdayStart').value='2025-01-01';$('#birthdayEnd').value='2025-12-31';$('#birthdayLocation').selectedIndex=0;$('#birthdayAge').selectedIndex=0;applyFilters();});
    $('#birthdayExport')?.addEventListener('click',()=>alert('Birthdays & anniversaries exported.'));
    document.addEventListener('click',e=>{const v=e.target.closest('[data-bview]'); if(v){openDetails(v.dataset.bview,Number(v.dataset.index)); return;} const m=e.target.closest('[data-bmore]'); if(m){e.preventDefault();e.stopPropagation();$('.birthday-action-menu')?.remove();const menu=document.createElement('div');menu.className='birthday-action-menu';menu.innerHTML='<button><i class="fa-regular fa-pen-to-square"></i> Edit</button><button><i class="fa-solid fa-cake-candles"></i> Send Greeting</button><button><i class="fa-regular fa-trash-can"></i> Delete</button>';document.body.appendChild(menu);const r=m.getBoundingClientRect();menu.style.top=(r.bottom+6+scrollY)+'px';menu.style.left=Math.max(12,r.left-120+scrollX)+'px';menu.querySelectorAll('button').forEach(b=>b.onclick=()=>{alert(b.textContent.trim());menu.remove();});}},true);
    document.addEventListener('click',e=>{if(!e.target.closest('.birthday-action-menu,[data-bmore]')) $('.birthday-action-menu')?.remove();});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind(); setTimeout(patchNav,250);
})();


/* === Guaranteed active sidebar state for every generated page === */
(function(){
  function normalizeNavText(t){return (t||'').replace(/^\s*-\s*/,'').replace(/\s+/g,' ').trim().toLowerCase();}
  function fileName(){return (location.pathname.split('/').pop()||'index.html').toLowerCase();}
  function applySidebarActiveState(){
    const nav=document.getElementById('navMenu');
    if(!nav) return;
    const page=fileName();
    const pageMap={
      'upcomingeventsservices.html':'upcoming events & services',
      'sacramentreports.html':'sacrament reports',
      'birthdaysanniversaries.html':'birthdays & anniversaries',
      'prayerrequestsummary.html':'prayer request summary',
      'notificationsannouncements.html':'notifications & announcements'
    };
    // keep hrefs correct
    nav.querySelectorAll('.subnav a').forEach(a=>{
      const txt=normalizeNavText(a.textContent);
      if(txt==='upcoming events & services') a.setAttribute('href','UpcomingEventsServices.html');
      if(txt==='sacrament reports') a.setAttribute('href','SacramentReports.html');
      if(txt==='birthdays & anniversaries') a.setAttribute('href','BirthdaysAnniversaries.html');
      if(txt==='prayer request summary') a.setAttribute('href','PrayerRequestSummary.html');
      if(txt==='notifications & announcements') a.setAttribute('href','NotificationsAnnouncements.html');
    });
    nav.querySelectorAll('.nav-group').forEach(g=>{
      g.classList.remove('open');
      g.querySelector('.nav-main')?.classList.remove('active');
    });
    nav.querySelectorAll('.subnav a').forEach(a=>a.classList.remove('active'));
    let target=null;
    if(page==='index.html') target=nav.querySelector('.nav-main[href="index.html"]');
    else if(page==='parishadministration.html') target=Array.from(nav.querySelectorAll('.nav-main')).find(a=>normalizeNavText(a.textContent).includes('parish administration'));
    else if(pageMap[page]) target=Array.from(nav.querySelectorAll('.subnav a')).find(a=>normalizeNavText(a.textContent)===pageMap[page]);
    if(target){
      target.classList.add('active');
      const group=target.closest('.nav-group');
      if(group){
        group.classList.add('open');
        group.querySelector('.nav-main')?.classList.add('active');
      }
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',applySidebarActiveState); else applySidebarActiveState();
  window.addEventListener('pageshow',applySidebarActiveState);
})();

/* ===== Prayer Request Summary page ===== */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const requests=[
    ['2025-05-14','14 May 2025<br>09:30 AM','Mary Varghese<br><small>St. Mary’s Mission</small>','John Varghese<br><small>Husband</small>','Health','Prayers for complete recovery from surgery and good health.','Active','Self'],
    ['2025-05-13','13 May 2025<br>07:15 PM','Thomas Samuel<br><small>Main Church</small>','Thomas Samuel<br><small>Self</small>','Family','Prayers for family unity and peace at home.','Active','Self'],
    ['2025-05-12','12 May 2025<br>06:45 PM','Anitha Peter<br><small>St. Peter’s Chapel</small>','Riya Peter<br><small>Daughter</small>','Education','Prayers for good studies and success in exams.','Answered','Family'],
    ['2025-05-10','10 May 2025<br>11:20 AM','George Mathew<br><small>Hill View Branch</small>','George Mathew<br><small>Self</small>','Financial','Prayers for financial stability and wisdom in decisions.','Active','Self'],
    ['2025-05-08','08 May 2025<br>08:05 PM','Lily Abraham<br><small>Main Church</small>','Job Opportunity<br><small>Self</small>','Employment','Prayers for a suitable job and good workplace.','Closed','Self'],
    ['2025-05-06','06 May 2025<br>05:30 PM','David Philip<br><small>St. Mary’s Mission</small>','Mother<br><small>Mother</small>','Health','Prayers for better health and relief from pain.','Answered','Family'],
    ['2025-05-04','04 May 2025<br>09:00 AM','Sara Daniel<br><small>Main Church</small>','Thanksgiving<br><small>Self</small>','Thanksgiving','Thanksgiving for all the blessings received.','Closed','Self'],
    ['2025-05-02','02 May 2025<br>07:40 PM','Mathew John<br><small>Hill View Branch</small>','Brother<br><small>Brother</small>','Health','Prayers for recovery from illness.','Active','Family']
  ];
  function drawDonut(){const c=$('#prayerStatusChart'); if(!c)return; const ctx=c.getContext('2d'),cx=85,cy=85,r=70; ctx.clearRect(0,0,c.width,c.height); let vals=[40.6,50,9.4],cols=['#0077b6','#2f80ed','#8b5cf6'],start=-Math.PI/2; vals.forEach((v,i)=>{const end=start+v/100*Math.PI*2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,start,end);ctx.fillStyle=cols[i];ctx.fill();start=end});ctx.globalCompositeOperation='destination-out';ctx.beginPath();ctx.arc(cx,cy,38,0,Math.PI*2);ctx.fill();ctx.globalCompositeOperation='source-over';ctx.textAlign='center';ctx.fillStyle='#001166';ctx.font='800 24px Open Sans';ctx.fillText('128',cx,cy-2);ctx.font='12px Open Sans';ctx.fillText('Total',cx,cy+17)}
  function drawLine(){const c=$('#prayerLineChart'); if(!c)return; const ctx=c.getContext('2d'),w=c.width,h=c.height,p=34; ctx.clearRect(0,0,w,h); const vals=[6,16,11,6,16,16,25,33,19,11,11,13],max=40; ctx.strokeStyle='#dfe8f1';ctx.lineWidth=1;ctx.font='11px Open Sans';ctx.fillStyle='#001166'; for(let i=0;i<=4;i++){const y=p+i*(h-2*p)/4;ctx.beginPath();ctx.moveTo(p,y);ctx.lineTo(w-p,y);ctx.stroke();ctx.fillText(String(max-i*10),8,y+3)} const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; const x=i=>p+i*(w-2*p)/11, y=v=>h-p-v/max*(h-2*p); ctx.strokeStyle='#0077b6';ctx.lineWidth=3;ctx.beginPath();vals.forEach((v,i)=>{i?ctx.lineTo(x(i),y(v)):ctx.moveTo(x(i),y(v))});ctx.stroke();vals.forEach((v,i)=>{ctx.beginPath();ctx.arc(x(i),y(v),4,0,Math.PI*2);ctx.fillStyle='#0077b6';ctx.fill();ctx.fillStyle='#001166';ctx.fillText(months[i],x(i)-9,h-8)})}
  function bars(){const data=[['Health',45,'45 (35.2%)'],['Family',28,'28 (21.9%)'],['Financial',18,'18 (14.1%)'],['Employment',14,'14 (10.9%)'],['Education',9,'9 (7.0%)']]; const el=$('#prayerCategoryBars'); if(el)el.innerHTML=data.map(x=>`<div class="category-bar"><span>${x[0]}</span><div class="track"><span class="fill" style="width:${x[1]/45*100}%"></span></div><b>${x[2]}</b></div>`).join('')}
  function cleanHtml(v){const d=document.createElement('div');d.innerHTML=v;return d.textContent.replace(/\s+/g,' ').trim()}
  function render(rows=requests){
    const table=$('#prayerTable'); if(!table)return;
    table.innerHTML='<thead><tr><th>Date Requested</th><th>Requested By</th><th>Request For</th><th>Category</th><th>Request Details</th><th>Status</th><th>Requested For</th><th>Actions</th></tr></thead><tbody>'+rows.map((r,i)=>`<tr data-date="${r[0]}" data-status="${r[6]}" data-category="${r[4]}"><td class="prayer-date-text">${r[1]}</td><td class="prayer-person">${r[2]}</td><td class="prayer-person">${r[3]}</td><td><span class="badge-cat ${r[4].toLowerCase()}">${r[4]}</span></td><td class="request-detail-cell">${r[5]}</td><td><span class="status ${r[6].toLowerCase()}">${r[6]}</span></td><td>${r[7]}</td><td class="row-actions"><button class="mini-btn prayer-view" data-i="${i}" aria-label="View"><i class="fa-regular fa-eye"></i></button><button class="action-dot prayer-menu" data-i="${i}" aria-label="Actions"><i class="fa-solid fa-ellipsis-vertical"></i></button></td></tr>`).join('')+'</tbody>';
    const grid=$('#prayerGrid');
    if(grid)grid.innerHTML=rows.map((r,i)=>`<div class="prayer-card-item"><h4>${cleanHtml(r[3]).split(' ')[0]} ${cleanHtml(r[3]).split(' ')[1]||''}</h4><p>${r[5]}</p><p><span class="badge-cat ${r[4].toLowerCase()}">${r[4]}</span> <span class="status ${r[6].toLowerCase()}">${r[6]}</span></p><button class="outline-action prayer-view" data-i="${i}"><i class="fa-regular fa-eye"></i> View</button></div>`).join('');
    if($('#prayerShowing')) $('#prayerShowing').textContent=rows.length?`Showing 1 to ${rows.length} of ${rows.length} requests`:'No prayer requests found';
    bindActions(rows);
  }
  function filter(){
    const st=$('#prayerStatus')?.value||'All';
    const cat=$('#prayerCategory')?.value||'All';
    const by=$('#prayerBy')?.value||'All';
    const start=$('#prayerStart')?.value||'1900-01-01';
    const end=$('#prayerEnd')?.value||'2100-12-31';
    const out=requests.filter(r=>{
      const branch=cleanHtml(r[2]);
      return (st==='All'||r[6]===st) && (cat==='All'||r[4]===cat) && (by==='All'||branch.toLowerCase().includes(by.toLowerCase())) && r[0]>=start && r[0]<=end;
    });
    render(out);
  }
  function bindActions(rows){
    $$('.prayer-view').forEach(b=>b.onclick=()=>{
      const r=rows[+b.dataset.i];
      showModal(`<h2>Prayer Request Details</h2><div class="detail-grid prayer-detail-grid"><div><b>Date</b><span>${r[1]}</span></div><div><b>Requested By</b><span>${r[2]}</span></div><div><b>Request For</b><span>${r[3]}</span></div><div><b>Category</b><span>${r[4]}</span></div><div><b>Status</b><span>${r[6]}</span></div><div><b>Requested For</b><span>${r[7]}</span></div><div class="wide"><b>Request Details</b><span>${r[5]}</span></div></div><div class="modal-actions"><button class="btn primary" onclick="document.getElementById('modal').classList.remove('show');document.getElementById('overlay').classList.remove('show')">Close</button></div>`)
    });
    $$('.prayer-menu').forEach(b=>b.onclick=e=>{
      e.preventDefault();e.stopPropagation(); $$('.row-menu').forEach(m=>m.remove());
      const menu=document.createElement('div'); menu.className='row-menu prayer-row-menu';
      menu.innerHTML='<button type="button"><i class="fa-regular fa-pen-to-square"></i> Edit</button><button type="button"><i class="fa-regular fa-trash-can"></i> Delete</button>';
      b.closest('.row-actions').appendChild(menu);
      menu.querySelectorAll('button').forEach(x=>x.onclick=()=>{alert(x.textContent.trim());menu.remove();});
    });
  }
  function modalForm(){
    showModal(`<h2>Add Prayer Request</h2><div class="modal-form prayer-request-form"><div class="field"><label>Requested By <span>*</span></label><input placeholder="Enter member name"></div><div class="field"><label>Branch / Location</label><select><option>Main Church</option><option>St. Mary’s Mission</option><option>St. Peter’s Chapel</option><option>Hill View Branch</option></select></div><div class="field"><label>Request For <span>*</span></label><input placeholder="Person / family name"></div><div class="field"><label>Relationship</label><select><option>Self</option><option>Family</option><option>Friend</option><option>Church Member</option></select></div><div class="field"><label>Category <span>*</span></label><select><option>Health</option><option>Family</option><option>Education</option><option>Financial</option><option>Employment</option><option>Thanksgiving</option></select></div><div class="field"><label>Status</label><select><option>Active</option><option>Answered</option><option>Closed</option></select></div><div class="field full"><label>Prayer Request Details <span>*</span></label><textarea rows="4" placeholder="Enter prayer request details"></textarea></div><div class="field full inline-checks"><label><input type="checkbox" checked> Keep request confidential</label><label><input type="checkbox"> Add to prayer chain</label><label><input type="checkbox"> Send follow-up reminder</label></div></div><div class="modal-actions"><button class="btn ghost" onclick="document.getElementById('modal').classList.remove('show');document.getElementById('overlay').classList.remove('show')">Cancel</button><button class="btn primary" onclick="document.getElementById('modal').classList.remove('show');document.getElementById('overlay').classList.remove('show')">Save Request</button></div>`)
  }
  function init(){if(!document.body.classList.contains('prayer-page'))return; drawDonut(); drawLine(); bars(); render(); $('#prayerFilter')?.addEventListener('click',filter); ['prayerStatus','prayerCategory','prayerBy','prayerStart','prayerEnd'].forEach(id=>$('#'+id)?.addEventListener('change',filter)); $('#prayerReset')?.addEventListener('click',()=>{['prayerStatus','prayerCategory','prayerBy'].forEach(id=>{$('#'+id).value='All'}); $('#prayerStart').value='2025-01-01'; $('#prayerEnd').value='2025-12-31'; render()}); document.addEventListener('click',e=>{if(!e.target.closest('.prayer-menu,.row-menu')) $$('.row-menu').forEach(m=>m.remove());}); $('#prayerListView')?.addEventListener('click',()=>{$('#prayerGrid')?.classList.remove('show'); $('.prayer-table-card .table-wrap').style.display='block'; $('#prayerListView').classList.add('active'); $('#prayerGridView').classList.remove('active')}); $('#prayerGridView')?.addEventListener('click',()=>{$('#prayerGrid')?.classList.add('show'); $('.prayer-table-card .table-wrap').style.display='none'; $('#prayerGridView').classList.add('active'); $('#prayerListView').classList.remove('active')}); $('#addPrayerBtn')?.addEventListener('click',modalForm); $('#prayerExport')?.addEventListener('click',()=>alert('Prayer request summary exported.'))}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

/* Prayer page sidebar link + active state patch */
(function(){
  function clean(t){return (t||'').replace(/^\s*-\s*/,'').replace(/\s+/g,' ').trim().toLowerCase()}
  function applyPrayerNav(){const nav=document.getElementById('navMenu'); if(!nav)return; nav.querySelectorAll('.subnav a').forEach(a=>{if(clean(a.textContent)==='prayer request summary')a.href='PrayerRequestSummary.html'}); const page=(location.pathname.split('/').pop()||'').toLowerCase(); if(page==='prayerrequestsummary.html'){nav.querySelectorAll('.nav-group').forEach(g=>{g.classList.remove('open');g.querySelector('.nav-main')?.classList.remove('active')});nav.querySelectorAll('.subnav a').forEach(a=>a.classList.remove('active')); const a=[...nav.querySelectorAll('.subnav a')].find(x=>clean(x.textContent)==='prayer request summary'); if(a){a.classList.add('active'); const g=a.closest('.nav-group'); g?.classList.add('open'); g?.querySelector('.nav-main')?.classList.add('active')}}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(applyPrayerNav,120)); else setTimeout(applyPrayerNav,120);
})();

/* === FINAL FIX: exact sidebar active state for Prayer Request Summary subnav === */
(function(){
  function normalizedText(el){
    return (el && el.textContent ? el.textContent : '')
      .replace(/^\s*[-–—•]+\s*/,'')
      .replace(/\s+/g,' ')
      .trim()
      .toLowerCase();
  }
  function setPrayerRequestActive(){
    var page=(location.pathname.split('/').pop() || '').toLowerCase();
    var nav=document.getElementById('navMenu');
    if(!nav || page !== 'prayerrequestsummary.html') return;

    nav.querySelectorAll('.subnav a').forEach(function(a){
      if(normalizedText(a)==='prayer request summary'){
        a.setAttribute('href','PrayerRequestSummary.html');
      }
    });

    nav.querySelectorAll('.nav-group').forEach(function(group){
      group.classList.remove('open','active-parent');
      var main=group.querySelector(':scope > .nav-main');
      if(main) main.classList.remove('active');
    });
    nav.querySelectorAll('.subnav a').forEach(function(a){
      a.classList.remove('active','current-subnav');
      a.removeAttribute('aria-current');
    });

    var target=Array.prototype.find.call(nav.querySelectorAll('.subnav a'),function(a){
      return normalizedText(a)==='prayer request summary' || (a.getAttribute('href')||'').toLowerCase()==='prayerrequestsummary.html';
    });

    if(target){
      target.classList.add('active','current-subnav');
      target.setAttribute('aria-current','page');
      var parent=target.closest('.nav-group');
      if(parent){
        parent.classList.add('open','active-parent');
        var parentMain=parent.querySelector(':scope > .nav-main');
        if(parentMain) parentMain.classList.add('active');
      }
    }
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){
      setPrayerRequestActive();
      setTimeout(setPrayerRequestActive,80);
      setTimeout(setPrayerRequestActive,300);
    });
  }else{
    setPrayerRequestActive();
    setTimeout(setPrayerRequestActive,80);
    setTimeout(setPrayerRequestActive,300);
  }
  window.addEventListener('pageshow',setPrayerRequestActive);
})();


/* === DEFINITIVE SIDEBAR ACTIVE STATE FIX - all Parish sub pages === */
(function(){
  var pageMap={
    'upcomingeventsservices.html':'upcoming events & services',
    'sacramentreports.html':'sacrament reports',
    'birthdaysanniversaries.html':'birthdays & anniversaries',
    'prayerrequestsummary.html':'prayer request summary'
  };
  var hrefMap={
    'upcoming events & services':'UpcomingEventsServices.html',
    'sacrament reports':'SacramentReports.html',
    'birthdays & anniversaries':'BirthdaysAnniversaries.html',
    'prayer request summary':'PrayerRequestSummary.html'
  };
  function cleanText(v){return String(v||'').replace(/^[\s\-–—•]+/,'').replace(/\s+/g,' ').trim().toLowerCase();}
  function current(){return (window.location.pathname.split('/').pop()||'index.html').toLowerCase();}
  function applyActiveSubnav(){
    var nav=document.getElementById('navMenu');
    if(!nav) return;
    // Always correct the Parish Administration subnav links after any nav re-render.
    Array.prototype.forEach.call(nav.querySelectorAll('.subnav a'),function(a){
      var key=cleanText(a.textContent);
      if(hrefMap[key]) a.setAttribute('href',hrefMap[key]);
    });
    var wanted=pageMap[current()];
    if(!wanted) return;
    Array.prototype.forEach.call(nav.querySelectorAll('.nav-group'),function(g){
      g.classList.remove('open','active-parent');
      var m=g.querySelector(':scope > .nav-main');
      if(m) m.classList.remove('active');
    });
    Array.prototype.forEach.call(nav.querySelectorAll('.subnav a'),function(a){
      a.classList.remove('active','current-subnav');
      a.removeAttribute('aria-current');
    });
    var target=Array.prototype.find.call(nav.querySelectorAll('.subnav a'),function(a){
      return cleanText(a.textContent)===wanted;
    });
    if(!target) return;
    target.classList.add('active','current-subnav');
    target.setAttribute('aria-current','page');
    var group=target.closest('.nav-group');
    if(group){
      group.classList.add('open','active-parent');
      var main=group.querySelector(':scope > .nav-main');
      if(main) main.classList.add('active');
    }
  }
  function install(){
    applyActiveSubnav();
    setTimeout(applyActiveSubnav,50);
    setTimeout(applyActiveSubnav,200);
    setTimeout(applyActiveSubnav,700);
    var nav=document.getElementById('navMenu');
    if(nav && !nav.dataset.activeObserver){
      nav.dataset.activeObserver='true';
      // disabled sidebar MutationObserver to prevent flicker
      nav.addEventListener('click',function(e){
        var a=e.target.closest('.subnav a');
        if(!a) return;
        var key=cleanText(a.textContent);
        if(hrefMap[key]) a.href=hrefMap[key];
        setTimeout(applyActiveSubnav,0);
      },true);
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install); else install();
  window.addEventListener('load',install);
  window.addEventListener('pageshow',install);
})();


/* === ABSOLUTE FINAL SIDEBAR ACTIVE FIX ===
   Keeps Parish Administration open and highlights "- Prayer Request Summary" when
   PrayerRequestSummary.html is loaded. Also works for other Parish sub pages. */
(function(){
  const PAGE_TO_LABEL = {
    'parishadministration.html': 'parish administration',
    'upcomingeventsservices.html': 'upcoming events & services',
    'sacramentreports.html': 'sacrament reports',
    'birthdaysanniversaries.html': 'birthdays & anniversaries',
    'prayerrequestsummary.html': 'prayer request summary',
    'notificationsannouncements.html': 'notifications & announcements',
    'committeeactivityoverview.html': 'committee activity overview'
  };
  const LABEL_TO_HREF = {
    'upcoming events & services': 'UpcomingEventsServices.html',
    'sacrament reports': 'SacramentReports.html',
    'birthdays & anniversaries': 'BirthdaysAnniversaries.html',
    'prayer request summary': 'PrayerRequestSummary.html',
    'notifications & announcements': 'NotificationsAnnouncements.html',
    'committee activity overview': 'CommitteeActivityOverview.html'
  };
  function cleanText(el){
    return (el && el.textContent ? el.textContent : '')
      .replace(/^[\s\-–—]+/, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }
  function currentPage(){
    return (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  }
  function forceActiveSidebar(){
    const nav = document.getElementById('navMenu');
    if(!nav) return;
    const page = currentPage();
    const wanted = PAGE_TO_LABEL[page];

    // Ensure generated Parish Administration links are always correct.
    nav.querySelectorAll('.subnav a').forEach(a => {
      const label = cleanText(a);
      if(LABEL_TO_HREF[label]) a.setAttribute('href', LABEL_TO_HREF[label]);
    });

    nav.querySelectorAll('.nav-group').forEach(group => {
      group.classList.remove('open', 'active-parent');
      const main = group.querySelector(':scope > .nav-main');
      if(main) main.classList.remove('active');
    });
    nav.querySelectorAll('.subnav a').forEach(a => {
      a.classList.remove('active', 'current-subnav');
      a.removeAttribute('aria-current');
    });

    if(!wanted) return;

    // Parent page: highlight Parish Administration main item.
    if(wanted === 'parish administration'){
      const group = Array.from(nav.querySelectorAll('.nav-group')).find(g => cleanText(g.querySelector(':scope > .nav-main .nav-title')) === 'parish administration');
      if(group){
        group.classList.add('open', 'active-parent');
        group.querySelector(':scope > .nav-main')?.classList.add('active');
      }
      return;
    }

    // Sub page: highlight exact subnav and keep Parish Administration open.
    const target = Array.from(nav.querySelectorAll('.subnav a')).find(a => cleanText(a) === wanted);
    if(target){
      target.classList.add('active', 'current-subnav');
      target.setAttribute('aria-current', 'page');
      const group = target.closest('.nav-group');
      if(group){
        group.classList.add('open', 'active-parent');
        group.querySelector(':scope > .nav-main')?.classList.add('active');
      }
    }
  }
  function runActiveFix(){
    forceActiveSidebar();
    [30,100,250,600,1200].forEach(t => setTimeout(forceActiveSidebar, t));
    const nav=document.getElementById('navMenu');
    if(nav && !nav.dataset.finalActiveFix){
      nav.dataset.finalActiveFix='true';
      nav.addEventListener('click', function(e){
        const sub=e.target.closest('.subnav a');
        if(sub){
          const label=cleanText(sub);
          if(LABEL_TO_HREF[label]) sub.href=LABEL_TO_HREF[label];
        }
      }, true);
      // disabled sidebar MutationObserver to prevent flicker
    }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', runActiveFix); else runActiveFix();
  window.addEventListener('load', runActiveFix);
  window.addEventListener('pageshow', runActiveFix);
})();

/* ===== Notifications & Announcements page implementation ===== */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const data=[
    ['Sunday Worship Service Time Change','Starting from 1 June 2025, the Sunday worship service time will be updated.','Announcement','All Members','Published','10 May 2025','09:30 AM','Rev. Michael','Parish Priest','fa-bullhorn'],
    ['Youth Fellowship Meeting','All youth members are invited to the youth fellowship meeting and worship.','Event','Youth Ministry','Scheduled','20 May 2025','06:00 PM','John Thomas','Youth Pastor','fa-calendar-days'],
    ['Bible Study – Book of Acts','Join us for an in-depth Bible study on the Book of Acts.','Ministry Update','All Members','Published','08 May 2025','07:00 PM','Sarah Daniel','Bible Study Lead','fa-circle-info'],
    ['Church Office Holiday','The church office will be closed on 15 May 2025 for administrative work.','Notice','All Members','Scheduled','15 May 2025','All Day','Admin','Parish Office','fa-triangle-exclamation'],
    ['Online Giving Update','We are pleased to announce that online giving is now available for all members.','Announcement','All Members','Published','05 May 2025','11:00 AM','Admin','Parish Office','fa-hand-holding-heart'],
    ['Choir Practice – New Schedule','From 1 June 2025, choir practice will be held every Saturday evening.','Ministry Update','Choir Members','Scheduled','01 Jun 2025','04:00 PM','Alex Varghese','Choir Director','fa-calendar-week'],
    ['Fasting & Prayer Day','The church will have a day of fasting and prayer on the first Friday.','Event','All Members','Published','03 May 2025','All Day','Rev. Michael','Parish Priest','fa-circle-info'],
    ['Annual General Meeting','The Annual General Meeting will be held on 25 May 2025 at the main auditorium.','Notice','All Members','Scheduled','25 May 2025','10:00 AM','Admin','Parish Office','fa-clipboard-list']
  ];
  let currentStatus='All';
  function typeClass(t){return t==='Event'?'type-event':t==='Notice'?'type-notice':t==='Ministry Update'?'type-ministry':''}
  function renderAnnouncements(){
    const table=$('#announcementTable'); if(!table)return;
    const q=($('#annSearch')?.value||'').toLowerCase().trim();
    const type=$('#annType')?.value||'All Types', aud=$('#annAudience')?.value||'All Audiences', stat=$('#annStatus')?.value||'All Statuses';
    let rows=data.filter(r=>(currentStatus==='All'||r[4]===currentStatus) && (stat==='All Statuses'||r[4]===stat) && (type==='All Types'||r[2]===type) && (aud==='All Audiences'||r[3]===aud) && (!q||r.join(' ').toLowerCase().includes(q)));
    table.innerHTML='<thead><tr><th>Title</th><th>Type</th><th>Audience</th><th>Status</th><th>Published / Scheduled</th><th>Created By</th><th>Actions</th></tr></thead><tbody>'+rows.map((r,i)=>`<tr data-index="${data.indexOf(r)}"><td><div class="announcement-title-cell"><span class="announcement-row-icon"><i class="fa-solid ${r[9]}"></i></span><div><h4>${r[0]}</h4><p>${r[1]}</p></div></div></td><td><span class="type-badge ${typeClass(r[2])}">${r[2]}</span></td><td>${r[3]}</td><td><span class="ann-status ${r[4].toLowerCase()}">${r[4]}</span></td><td><b>${r[5]}</b><br><span>${r[6]}</span></td><td><b>${r[7]}</b><br><span>${r[8]}</span></td><td><div class="ann-actions"><button class="ann-view" data-ann-view title="View"><i class="fa-regular fa-eye"></i></button><button class="ann-more" data-ann-more title="More"><i class="fa-solid fa-ellipsis-vertical"></i></button></div></td></tr>`).join('')+'</tbody>';
    $('#announcementShowing') && ($('#announcementShowing').textContent=`Showing 1 to ${rows.length} of ${data.length} announcements`);
  }
  function announcementModal(mode='create'){
    const isSchedule = mode === 'schedule';
    return `<div class="ann-modal-head">${isSchedule?'Schedule Announcement':'Create Announcement'}</div>
      <div class="ann-modal-body">
        <div class="ann-form-grid">
          <h3>Announcement Details</h3>
          <label class="ann-field">Title *<input placeholder="Enter announcement title"><small style="float:right;color:#66728a">0/150</small></label>
          <label class="ann-field">Publish Date & Time *<div class="ann-inline-two"><input value="${isSchedule?'01 Jun 2025':'23 May 2025'}"><input value="${isSchedule?'09:00 AM':'10:00 AM'}"></div></label>
          <label class="ann-field">Category *<select><option>Select category</option><option>General</option><option>Service</option><option>Youth Ministry</option><option>Prayer Ministry</option></select></label>
          <label class="ann-field">Expiry Date & Time <div class="ann-inline-two"><input placeholder="Select date"><input placeholder="Select time"></div></label>
          <div class="ann-field full">Type *<div class="ann-radio-row"><label><input type="radio" name="annType" checked> Announcement</label><label><input type="radio" name="annType"> Event</label><label><input type="radio" name="annType"> Notice</label><label><input type="radio" name="annType"> Ministry Update</label></div></div>
          <label class="ann-field full">Audience *<select><option>Select audience</option><option>All Members</option><option>Youth Ministry</option><option>Choir Members</option><option>Prayer Team</option></select></label>
          <label class="ann-field full">Message *<div class="rich-editor"><div class="rich-toolbar"><b>Paragraph</b><i class="fa-solid fa-bold"></i><i class="fa-solid fa-italic"></i><i class="fa-solid fa-underline"></i><i class="fa-solid fa-list-ul"></i><i class="fa-solid fa-list-ol"></i><i class="fa-solid fa-align-left"></i><i class="fa-solid fa-link"></i><i class="fa-regular fa-image"></i></div><textarea placeholder="Write your announcement..."></textarea></div><small style="float:right;color:#66728a">0/2000</small></label>
          <div class="ann-field full"><div class="upload-grid"><label>Attachments <span style="font-weight:400">(Optional)</span><div class="ann-upload"><div><i class="fa-solid fa-cloud-arrow-up"></i><p><b>Drag and drop files here</b> or click to browse</p><small>PDF, DOC, DOCX, JPG, PNG</small></div></div></label><label>Display Image <span style="font-weight:400">(Optional)</span><div class="ann-upload"><div><i class="fa-regular fa-image"></i><p><b>Drag and drop image here</b> or click to browse</p><small>JPG, PNG, recommended 1200x630px</small></div></div></label></div></div>
          <label class="ann-field full ann-check"><input type="checkbox"> Send email notification to selected audience <i class="fa-regular fa-circle-info"></i></label>
        </div>
      </div>
      <div class="ann-modal-footer"><button class="outline-action" onclick="modal.classList.remove('show');document.body.classList.remove('announcement-modal')">Cancel</button><button class="add-action" onclick="modal.classList.remove('show');document.body.classList.remove('announcement-modal')">${isSchedule?'Schedule Announcement':'Create Announcement'}</button></div>`;
  }
  function showAnnDetails(r){
    document.body.classList.remove('announcement-modal');
    document.body.classList.add('announcement-view-open');
    showModal(`<div class="announcement-detail-modal"><div class="simple-modal-head"><h2>Announcement Details</h2><button onclick="modal.classList.remove('show');document.body.classList.remove('announcement-view-open')"><i class="fa-solid fa-xmark"></i></button></div><div class="announcement-detail-body"><div class="announcement-detail-title"><span class="announcement-row-icon"><i class="fa-solid ${r[9]}"></i></span><div><h3>${r[0]}</h3><p>${r[1]}</p></div></div><div class="detail-grid announcement-detail-grid"><div><b>Type</b><span>${r[2]}</span></div><div><b>Audience</b><span>${r[3]}</span></div><div><b>Status</b><span>${r[4]}</span></div><div><b>Published / Scheduled</b><span>${r[5]} ${r[6]}</span></div><div><b>Created By</b><span>${r[7]}</span></div><div><b>Role</b><span>${r[8]}</span></div><div class="wide"><b>Full Message</b><span>${r[1]} Please follow the parish office instructions and contact the ministry coordinator for more details.</span></div></div></div><div class="modal-actions sticky-actions"><button class="btn primary" onclick="modal.classList.remove('show');document.body.classList.remove('announcement-view-open')">Close</button></div></div>`);
  }
  function initAnnouncements(){
    if(!document.body.classList.contains('notifications-page'))return;
    renderAnnouncements();
    $('#createAnnouncementBtn')?.addEventListener('click',()=>{document.body.classList.add('announcement-modal');showModal(announcementModal('create'));});
    $('#quickCreate')?.addEventListener('click',()=>$('#createAnnouncementBtn')?.click());
    $('#quickSchedule')?.addEventListener('click',()=>{document.body.classList.add('announcement-modal');showModal(announcementModal('schedule'));});
    $('#quickManage')?.addEventListener('click',()=>{document.body.classList.remove('announcement-modal');document.body.classList.add('category-modal-open');showModal(`<div class="category-manager-modal"><div class="simple-modal-head"><h2>Manage Categories</h2><button onclick="modal.classList.remove('show');document.body.classList.remove('category-modal-open')"><i class="fa-solid fa-xmark"></i></button></div><div class="category-manager-body"><p>Review and organize announcement categories used across the parish communication module.</p><div class="category-grid"><div class="category-card"><span><i class="fa-solid fa-bullhorn"></i></span><div><b>Announcement</b><small>34 items</small></div><button>Edit</button></div><div class="category-card"><span><i class="fa-regular fa-calendar"></i></span><div><b>Event</b><small>8 items</small></div><button>Edit</button></div><div class="category-card"><span><i class="fa-regular fa-clipboard"></i></span><div><b>Notice</b><small>7 items</small></div><button>Edit</button></div><div class="category-card"><span><i class="fa-solid fa-people-group"></i></span><div><b>Ministry Update</b><small>7 items</small></div><button>Edit</button></div></div><div class="category-add-row"><input placeholder="New category name"><button class="add-action"><i class="fa-solid fa-plus"></i> Add Category</button></div></div><div class="modal-actions sticky-actions"><button class="btn primary" onclick="modal.classList.remove('show');document.body.classList.remove('category-modal-open')">Close</button></div></div>`)});
    $('#quickArchived')?.addEventListener('click',()=>{currentStatus='Archived'; $$('#announcementTabs button').forEach(b=>b.classList.toggle('active',b.dataset.status==='Archived')); renderAnnouncements(); document.getElementById('announcementTableCard')?.scrollIntoView({behavior:'smooth'});});
    $('#archiveBtn')?.addEventListener('click',()=>{currentStatus='Archived'; $$('#announcementTabs button').forEach(b=>b.classList.toggle('active',b.dataset.status==='Archived')); renderAnnouncements();});
    $$('#announcementTabs button').forEach(b=>b.addEventListener('click',()=>{currentStatus=b.dataset.status;$$('#announcementTabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderAnnouncements();}));
    ['annSearch','annType','annAudience','annStatus','annStart','annEnd'].forEach(id=>$('#'+id)?.addEventListener(id==='annSearch'?'input':'change',renderAnnouncements));
    $('#annApply')?.addEventListener('click',renderAnnouncements);
    $('#annReset')?.addEventListener('click',()=>{['annSearch'].forEach(id=>$('#'+id).value=''); ['annType','annAudience','annStatus'].forEach(id=>$('#'+id).selectedIndex=0); $('#annStart').value='2025-01-01'; $('#annEnd').value='2025-12-31'; currentStatus='All'; $$('#announcementTabs button').forEach((b,i)=>b.classList.toggle('active',i===0)); renderAnnouncements();});
    document.addEventListener('click',e=>{
      const view=e.target.closest('[data-ann-view]'); if(view){const r=data[Number(view.closest('tr').dataset.index)]; showAnnDetails(r); return;}
      const more=e.target.closest('[data-ann-more]'); if(more){e.stopPropagation(); $('.ann-action-menu')?.remove(); const tr=more.closest('tr'), r=data[Number(tr.dataset.index)]; const m=document.createElement('div'); m.className='ann-action-menu'; m.innerHTML='<button data-ann-action="edit"><i class="fa-regular fa-pen-to-square"></i> Edit</button><button data-ann-action="archive"><i class="fa-solid fa-box-archive"></i> Archive</button><button class="danger" data-ann-action="delete"><i class="fa-regular fa-trash-can"></i> Delete</button>'; document.body.appendChild(m); const br=more.getBoundingClientRect(); m.style.top=(br.bottom+6+scrollY)+'px'; m.style.left=(br.left-120+scrollX)+'px'; m.querySelectorAll('button').forEach(btn=>btn.onclick=()=>{showModal(`<h2>${btn.textContent.trim()}</h2><p style="font-size:13px;color:#66728a">${r[0]}</p><div class="modal-actions"><button class="btn primary" onclick="modal.classList.remove('show')">OK</button></div>`);m.remove();}); return;}
      if(!e.target.closest('.ann-action-menu')) $('.ann-action-menu')?.remove();
    },true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initAnnouncements);else initAnnouncements();
})();

/* Final active link support for Notifications & Announcements */
(function(){
  function clean(v){return String(v||'').replace(/^[\s\-–—•]+/,'').replace(/\s+/g,' ').trim().toLowerCase()}
  function fixNotificationsActive(){
    const nav=document.getElementById('navMenu'); if(!nav)return;
    nav.querySelectorAll('.subnav a').forEach(a=>{if(clean(a.textContent)==='notifications & announcements')a.href='NotificationsAnnouncements.html'});
    const page=(location.pathname.split('/').pop()||'').toLowerCase();
    if(page!=='notificationsannouncements.html')return;
    nav.querySelectorAll('.nav-group').forEach(g=>{g.classList.remove('open','active-parent');g.querySelector('.nav-main')?.classList.remove('active')});
    nav.querySelectorAll('.subnav a').forEach(a=>{a.classList.remove('active','current-subnav');a.removeAttribute('aria-current')});
    const a=[...nav.querySelectorAll('.subnav a')].find(x=>clean(x.textContent)==='notifications & announcements');
    if(a){a.classList.add('active','current-subnav');a.setAttribute('aria-current','page');const g=a.closest('.nav-group');g?.classList.add('open','active-parent');g?.querySelector('.nav-main')?.classList.add('active')}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fixNotificationsActive);else fixNotificationsActive();
  window.addEventListener('load',()=>{fixNotificationsActive();setTimeout(fixNotificationsActive,100);setTimeout(fixNotificationsActive,500)});
})();


/* === DEFINITIVE GLOBAL SIDEBAR ACTIVE FIX - Parish subpages === */
(function(){
  const parishLinks = {
    'UpcomingEventsServices.html': 'upcoming events & services',
    'SacramentReports.html': 'sacrament reports',
    'BirthdaysAnniversaries.html': 'birthdays & anniversaries',
    'PrayerRequestSummary.html': 'prayer request summary',
    'NotificationsAnnouncements.html': 'notifications & announcements',
    'CommitteeActivityOverview.html': 'committee activity overview',
    'ParishAdministration.html': 'parish administration'
  };
  const hrefByLabel = {
    'upcoming events & services': 'UpcomingEventsServices.html',
    'sacrament reports': 'SacramentReports.html',
    'birthdays & anniversaries': 'BirthdaysAnniversaries.html',
    'prayer request summary': 'PrayerRequestSummary.html',
    'notifications & announcements': 'NotificationsAnnouncements.html',
    'committee activity overview': 'CommitteeActivityOverview.html'
  };
  function cleanNavText(value){
    return String(value || '')
      .replace(/^[\s\-–—•]+/, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }
  function currentFile(){
    return (window.location.pathname.split('/').pop() || 'index.html');
  }
  function applyFinalSidebarState(){
    const nav = document.getElementById('navMenu');
    if(!nav) return;
    const file = currentFile();
    const wanted = parishLinks[file];

    nav.querySelectorAll('.subnav a').forEach(function(a){
      const label = cleanNavText(a.textContent);
      if(hrefByLabel[label]) a.setAttribute('href', hrefByLabel[label]);
    });

    nav.querySelectorAll('.nav-group').forEach(function(group){
      group.classList.remove('open','active-parent');
      const main = group.querySelector(':scope > .nav-main');
      if(main) main.classList.remove('active');
    });
    nav.querySelectorAll('.subnav a').forEach(function(a){
      a.classList.remove('active','current-subnav');
      a.removeAttribute('aria-current');
    });

    if(!wanted){
      const dash = nav.querySelector('.nav-main[href="index.html"]');
      if((file || '').toLowerCase() === 'index.html' && dash) dash.classList.add('active');
      return;
    }

    if(wanted === 'parish administration'){
      const group = Array.from(nav.querySelectorAll('.nav-group')).find(function(g){
        return cleanNavText(g.querySelector(':scope > .nav-main .nav-title')?.textContent) === 'parish administration';
      });
      if(group){
        group.classList.add('open','active-parent');
        group.querySelector(':scope > .nav-main')?.classList.add('active');
      }
      return;
    }

    const target = Array.from(nav.querySelectorAll('.subnav a')).find(function(a){
      return cleanNavText(a.textContent) === wanted;
    });
    if(target){
      target.classList.add('active','current-subnav');
      target.setAttribute('aria-current','page');
      const group = target.closest('.nav-group');
      if(group){
        group.classList.add('open','active-parent');
        group.querySelector(':scope > .nav-main')?.classList.add('active');
      }
    }
  }
  function scheduleFinalSidebarState(){
    applyFinalSidebarState();
    [0,50,150,350,800,1500].forEach(function(t){ setTimeout(applyFinalSidebarState, t); });
    const nav = document.getElementById('navMenu');
    if(nav && !nav.dataset.definitiveParishState){
      nav.dataset.definitiveParishState = 'true';
      nav.addEventListener('click', function(e){
        const a = e.target.closest('.subnav a');
        if(!a) return;
        const label = cleanNavText(a.textContent);
        if(hrefByLabel[label]) a.href = hrefByLabel[label];
      }, true);
      // disabled sidebar MutationObserver to prevent flicker
    }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleFinalSidebarState);
  else scheduleFinalSidebarState();
  window.addEventListener('load', scheduleFinalSidebarState);
  window.addEventListener('pageshow', scheduleFinalSidebarState);
})();

/* ===== FINAL JS FIX - force Notifications popups visible and functional ===== */
(function(){
  function ready(fn){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fn); else fn(); }
  ready(function(){
    if(!document.body.classList.contains('notifications-page')) return;
    const modal=document.getElementById('modal');
    const content=document.getElementById('modalContent');
    if(!modal || !content) return;
    function closeModal(){
      modal.classList.remove('show','force-show');
      modal.style.display='';
      document.body.classList.remove('announcement-modal','category-modal-open','announcement-view-open');
      content.innerHTML='';
    }
    window.closeNotificationModal=closeModal;
    function openPanel(html, mode){
      document.body.classList.remove('announcement-modal','category-modal-open','announcement-view-open');
      if(mode) document.body.classList.add(mode);
      content.innerHTML=html;
      modal.classList.add('show','force-show');
      modal.style.display='flex';
      modal.style.visibility='visible';
      modal.style.opacity='1';
      const box=modal.querySelector('.modal-box');
      if(box){
        box.style.display='flex';
        box.style.visibility='visible';
        box.style.opacity='1';
        box.style.height='min(760px, calc(100vh - 28px))';
        box.style.maxHeight='calc(100vh - 28px)';
        box.style.overflow='hidden';
      }
      content.style.height='100%';
      content.style.maxHeight='100%';
      content.style.overflow='hidden';
      setTimeout(function(){
        const body=content.querySelector('.modal-panel-body');
        if(body){
          body.style.overflowY='scroll';
          body.style.maxHeight='none';
          body.style.minHeight='0';
        }
      },0);
    }
    function announcementForm(title){
      return `<div class="modal-panel-head"><h2>${title}</h2><button type="button" class="modal-panel-close" data-close-notification-modal><i class="fa-solid fa-xmark"></i></button></div>
      <div class="modal-panel-body">
        <div class="modal-form-grid">
          <label class="modal-field full">Title *<input type="text" placeholder="Enter announcement title"></label>
          <label class="modal-field">Audience *<select><option>All Members</option><option>Choir Members</option><option>Youth Ministry</option><option>Sunday School</option></select></label>
          <label class="modal-field">Priority *<select><option>Normal</option><option>High</option><option>Urgent</option></select></label>
          <div class="modal-field full">Type *<div class="modal-radio-row"><label><input type="radio" name="annTypeFinal" checked> Announcement</label><label><input type="radio" name="annTypeFinal"> Event</label><label><input type="radio" name="annTypeFinal"> Notice</label><label><input type="radio" name="annTypeFinal"> Ministry Update</label></div></div>
          <label class="modal-field">Publish Date<input type="date" value="2025-05-18"></label>
          <label class="modal-field">Publish Time<input type="time" value="09:30"></label>
          <label class="modal-field full">Message *<textarea placeholder="Write your announcement message"></textarea></label>
          <label class="modal-field">Attachment<input type="file"></label>
          <label class="modal-field">Status<select><option>Published</option><option>Scheduled</option><option>Draft</option></select></label>
        </div>
      </div>
      <div class="modal-panel-footer"><button type="button" class="outline-action" data-close-notification-modal>Cancel</button><button type="button" class="add-action" data-close-notification-modal>${title.indexOf('Schedule')>-1?'Schedule Announcement':'Create Announcement'}</button></div>`;
    }
    function categoryPanel(){
      const cats=[['fa-bullhorn','Announcement','34 items'],['fa-calendar-days','Event','8 items'],['fa-clipboard-list','Notice','7 items'],['fa-people-group','Ministry Update','7 items']];
      return `<div class="modal-panel-head"><h2>Manage Categories</h2><button type="button" class="modal-panel-close" data-close-notification-modal><i class="fa-solid fa-xmark"></i></button></div>
      <div class="modal-panel-body"><p style="margin:0 0 16px;color:#53647d;font-size:13px;line-height:1.6">Review and organize announcement categories used across the parish communication module.</p>
      <div class="category-grid-fixed">${cats.map(c=>`<div class="category-card-fixed"><span><i class="fa-solid ${c[0]}"></i></span><div><b>${c[1]}</b><small>${c[2]}</small></div><button type="button" class="outline-action">Edit</button></div>`).join('')}</div>
      <div class="category-add-row" style="display:grid;grid-template-columns:1fr auto;gap:12px;margin-top:16px;padding-top:16px;border-top:1px solid #edf2f7"><input style="height:40px;border:1px solid #d8e5f0;padding:0 12px" placeholder="New category name"><button type="button" class="add-action"><i class="fa-solid fa-plus"></i> Add Category</button></div></div>
      <div class="modal-panel-footer"><button type="button" class="add-action" data-close-notification-modal>Close</button></div>`;
    }
    function viewPanel(row){
      const cells=row ? Array.from(row.children).map(td=>td.innerText.trim()) : [];
      const title=(cells[0]||'Sunday Worship Service Time Change').split('\n')[0];
      const type=cells[1]||'Announcement'; const audience=cells[2]||'All Members'; const status=cells[3]||'Published'; const date=cells[4]||'10 May 2025 09:30 AM'; const by=cells[5]||'Rev. Michael Parish Priest';
      return `<div class="modal-panel-head"><h2>Announcement Details</h2><button type="button" class="modal-panel-close" data-close-notification-modal><i class="fa-solid fa-xmark"></i></button></div>
      <div class="modal-panel-body"><div style="display:grid;grid-template-columns:52px 1fr;gap:14px;align-items:start;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #edf2f7"><span class="announcement-row-icon"><i class="fa-solid fa-bullhorn"></i></span><div><h3 style="margin:0 0 6px;color:#071873;font-size:16px">${title}</h3><p style="margin:0;color:#53647d;line-height:1.55;font-size:13px">Full announcement details for the selected row.</p></div></div>
      <div class="detail-fixed-grid"><div><b>Type</b><span>${type}</span></div><div><b>Audience</b><span>${audience}</span></div><div><b>Status</b><span>${status}</span></div><div><b>Published / Scheduled</b><span>${date}</span></div><div><b>Created By</b><span>${by}</span></div><div class="full"><b>Message</b><span>${title}. Please follow the parish office instructions and contact the ministry coordinator for more details.</span></div></div></div>
      <div class="modal-panel-footer"><button type="button" class="add-action" data-close-notification-modal>Close</button></div>`;
    }
    document.addEventListener('click',function(e){
      const close=e.target.closest('[data-close-notification-modal]');
      if(close){ e.preventDefault(); e.stopImmediatePropagation(); closeModal(); return; }
      const create=e.target.closest('#createAnnouncementBtn,#quickCreate');
      if(create){ e.preventDefault(); e.stopImmediatePropagation(); openPanel(announcementForm('Create Announcement'),'announcement-modal'); return; }
      const schedule=e.target.closest('#quickSchedule');
      if(schedule){ e.preventDefault(); e.stopImmediatePropagation(); openPanel(announcementForm('Schedule Announcement'),'announcement-modal'); return; }
      const manage=e.target.closest('#quickManage');
      if(manage){ e.preventDefault(); e.stopImmediatePropagation(); openPanel(categoryPanel(),'category-modal-open'); return; }
      const view=e.target.closest('[data-ann-view], .ann-view');
      if(view){ e.preventDefault(); e.stopImmediatePropagation(); openPanel(viewPanel(view.closest('tr')),'announcement-view-open'); return; }
      if(e.target===modal){ closeModal(); }
    }, true);
  });
})();

/* ===== FINAL GLOBAL MODAL CLOSE FIX ===== */
(function(){
  function closeEveryModal(){
    document.querySelectorAll('.modal').forEach(function(m){
      m.classList.remove('show','force-show','active','open');
      m.style.display='';
      m.style.visibility='';
      m.style.opacity='';
    });
    document.querySelectorAll('#modalContent').forEach(function(c){ c.innerHTML=''; });
    document.body.classList.remove('announcement-modal','category-modal-open','announcement-view-open','modal-open');
    document.documentElement.classList.remove('modal-open');
  }
  window.closeAllModals = closeEveryModal;
  window.closeNotificationModal = closeEveryModal;

  function isCloseTarget(el){
    if(!el) return false;
    if(el.closest('#modalClose')) return true;
    if(el.closest('.modal-close')) return true;
    if(el.closest('.modal-panel-close')) return true;
    if(el.closest('[data-close-notification-modal]')) return true;
    if(el.closest('[data-modal-close]')) return true;
    const btn = el.closest('button');
    if(btn && btn.closest('.modal') && /^(close|cancel|ok)$/i.test((btn.textContent||'').trim())) return true;
    return false;
  }

  document.addEventListener('click', function(e){
    if(isCloseTarget(e.target)){
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      closeEveryModal();
      return false;
    }
    const modal = e.target.closest('.modal');
    if(modal && e.target === modal){
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      closeEveryModal();
      return false;
    }
  }, true);

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeEveryModal();
  });
})();

/* === 2026-06 definitive sidebar + committee actions fix === */
(function(){
  function cleanLabel(text){return String(text||'').replace(/^[\s\-–—•]+/,'').replace(/\s+/g,' ').trim().toLowerCase();}
  var pageToSub={
    'upcomingeventsservices.html':'upcoming events & services',
    'sacramentreports.html':'sacrament reports',
    'birthdaysanniversaries.html':'birthdays & anniversaries',
    'prayerrequestsummary.html':'prayer request summary',
    'notificationsannouncements.html':'notifications & announcements',
    'committeeactivityoverview.html':'committee activity overview',
    'branchchurchoverview.html':'branch church overview'
  };
  function forceParishSubnav(){
    var nav=document.getElementById('navMenu');
    if(!nav) return;
    var file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    var wanted=pageToSub[file];
    if(!wanted) return;
    var target=null;
    nav.querySelectorAll('.subnav a').forEach(function(a){
      var label=cleanLabel(a.textContent);
      if(label===wanted) target=a;
      a.classList.remove('active','current-subnav');
      a.removeAttribute('aria-current');
    });
    nav.querySelectorAll('.nav-group').forEach(function(group){
      var title=cleanLabel(group.querySelector(':scope > .nav-main .nav-title')?.textContent);
      var main=group.querySelector(':scope > .nav-main');
      group.classList.remove('open','active-parent');
      if(main) main.classList.remove('active');
      if(title==='parish administration'){
        group.classList.add('open','active-parent');
        if(main) main.classList.add('active');
      }
    });
    if(target){
      target.classList.add('active','current-subnav');
      target.setAttribute('aria-current','page');
      var parent=target.closest('.nav-group');
      if(parent){
        parent.classList.add('open','active-parent');
        var pmain=parent.querySelector(':scope > .nav-main');
        if(pmain) pmain.classList.add('active');
      }
    }
  }
  function committeeMenuFix(e){
    if(!document.body.classList.contains('committee-page')) return;
    var more=e.target.closest('[data-more-committee]');
    if(more){
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      var wrap=more.closest('.action-wrap');
      var menu=wrap ? wrap.querySelector('.row-action-menu') : null;
      document.querySelectorAll('.committee-page .row-action-menu.show').forEach(function(m){ if(m!==menu)m.classList.remove('show'); });
      if(menu) menu.classList.toggle('show');
      return;
    }
    if(!e.target.closest('.row-action-menu') && !e.target.closest('[data-more-committee]')){
      document.querySelectorAll('.committee-page .row-action-menu.show').forEach(function(m){m.classList.remove('show');});
    }
  }
  function init(){
    forceParishSubnav();
    [50,150,400,900,1600].forEach(function(t){setTimeout(forceParishSubnav,t);});
    document.addEventListener('click',function(e){
      var sub=e.target.closest('#navMenu .subnav a');
      if(sub && cleanLabel(sub.textContent)==='committee activity overview'){
        var parent=sub.closest('.nav-group');
        if(parent){
          parent.classList.add('open','active-parent');
          parent.querySelector(':scope > .nav-main')?.classList.add('active');
        }
      }
    },true);
    document.addEventListener('click',committeeMenuFix,true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.addEventListener('load',forceParishSubnav);
  window.addEventListener('pageshow',forceParishSubnav);
})();

/* === ROBUST PARISH SUBNAV ACTIVE STATE PATCH === */
(function(){
  const parishPageMap={
    'upcomingeventsservices.html':'upcoming events & services',
    'sacramentreports.html':'sacrament reports',
    'birthdaysanniversaries.html':'birthdays & anniversaries',
    'prayerrequestsummary.html':'prayer request summary',
    'notificationsannouncements.html':'notifications & announcements',
    'committeeactivityoverview.html':'committee activity overview',
    'branchchurchoverview.html':'branch church overview',
    'parishadministration.html':'parish administration'
  };
  function clean(t){return String(t||'').replace(/^[\s\-–—•]+/,'').replace(/\s+/g,' ').trim().toLowerCase();}
  function activateParishNav(){
    const nav=document.getElementById('navMenu'); if(!nav) return;
    const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    const targetLabel=parishPageMap[page]; if(!targetLabel) return;
    nav.querySelectorAll('.subnav a').forEach(a=>a.classList.remove('active','current-subnav'));
    nav.querySelectorAll('.nav-group').forEach(g=>{
      const main=g.querySelector(':scope > .nav-main');
      if(clean(main?.textContent)!=='parish administration'){
        g.classList.remove('open','active-parent');
        main?.classList.remove('active');
      }
    });
    const parishGroup=[...nav.querySelectorAll('.nav-group')].find(g=>clean(g.querySelector(':scope > .nav-main')?.textContent)==='parish administration');
    if(!parishGroup) return;
    parishGroup.classList.add('open','active-parent');
    parishGroup.querySelector(':scope > .nav-main')?.classList.add('active');
    if(targetLabel!=='parish administration'){
      const sub=[...parishGroup.querySelectorAll('.subnav a')].find(a=>clean(a.textContent)===targetLabel);
      if(sub){sub.classList.add('active','current-subnav');sub.setAttribute('aria-current','page');}
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',activateParishNav);else activateParishNav();
  window.addEventListener('load',activateParishNav);
  window.addEventListener('pageshow',activateParishNav);
  [0,50,150,350,750,1200,1800,2600].forEach(t=>setTimeout(activateParishNav,t));
  document.addEventListener('click',function(e){
    const sub=e.target.closest('#navMenu .subnav a');
    if(sub){
      const group=sub.closest('.nav-group');
      if(clean(group?.querySelector(':scope > .nav-main')?.textContent)==='parish administration'){
        setTimeout(activateParishNav,0);
        setTimeout(activateParishNav,80);
      }
    }
  },true);
  // disabled sidebar MutationObserver to prevent flicker
})();


/* === FINAL STABLE PARISH SIDEBAR STATE - no flicker === */
(function(){
  const pageToLabel={
    'parishadministration.html':'parish administration',
    'upcomingeventsservices.html':'upcoming events & services',
    'sacramentreports.html':'sacrament reports',
    'birthdaysanniversaries.html':'birthdays & anniversaries',
    'prayerrequestsummary.html':'prayer request summary',
    'notificationsannouncements.html':'notifications & announcements',
    'committeeactivityoverview.html':'committee activity overview',
    'branchchurchoverview.html':'branch church overview'
  };
  const labelToHref={
    'upcoming events & services':'UpcomingEventsServices.html',
    'sacrament reports':'SacramentReports.html',
    'birthdays & anniversaries':'BirthdaysAnniversaries.html',
    'prayer request summary':'PrayerRequestSummary.html',
    'notifications & announcements':'NotificationsAnnouncements.html',
    'committee activity overview':'CommitteeActivityOverview.html',
    'branch church overview':'BranchChurchOverview.html'
  };
  function clean(v){return String(v||'').replace(/^[\s\-–—•]+/,'').replace(/\s+/g,' ').trim().toLowerCase();}
  function apply(){
    const nav=document.getElementById('navMenu');
    if(!nav) return;
    const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    const label=pageToLabel[page];
    nav.querySelectorAll('.subnav a').forEach(a=>{
      const key=clean(a.textContent);
      if(labelToHref[key]) a.href=labelToHref[key];
      a.classList.remove('active','current-subnav');
      a.removeAttribute('aria-current');
    });
    nav.querySelectorAll('.nav-group').forEach(g=>{
      const main=g.querySelector(':scope > .nav-main');
      main?.classList.remove('active');
      g.classList.remove('open','active-parent');
    });
    if(!label) {
      const dash=nav.querySelector('.nav-group > .nav-main[href="index.html"]');
      if((page==='index.html'||page==='') && dash) dash.classList.add('active');
      return;
    }
    const parish=[...nav.querySelectorAll('.nav-group')].find(g=>clean(g.querySelector(':scope > .nav-main .nav-title')?.textContent||g.querySelector(':scope > .nav-main')?.textContent)==='parish administration');
    if(!parish) return;
    parish.classList.add('open','active-parent');
    parish.querySelector(':scope > .nav-main')?.classList.add('active');
    if(label==='parish administration') return;
    const sub=[...parish.querySelectorAll('.subnav a')].find(a=>clean(a.textContent)===label);
    if(sub){
      sub.classList.add('active','current-subnav');
      sub.setAttribute('aria-current','page');
    }
  }
  function install(){
    apply();
    [0,60,180,500,1000].forEach(t=>setTimeout(apply,t));
    const nav=document.getElementById('navMenu');
    if(nav && !nav.dataset.stableNavClick){
      nav.dataset.stableNavClick='true';
      nav.addEventListener('click',function(e){
        const sub=e.target.closest('.subnav a');
        if(sub){
          const key=clean(sub.textContent);
          if(labelToHref[key]) sub.href=labelToHref[key];
        }
      },true);
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install); else install();
  window.addEventListener('load',apply);
  window.addEventListener('pageshow',apply);
})();
