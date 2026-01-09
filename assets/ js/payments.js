const t=document.getElementById("payTable");

function render(){
  t.innerHTML="";
  getSubs().forEach((s,i)=>{
    t.innerHTML+=`
    <tr data-status="${s.paid}">
    <td>${s.name}</td>
    <td>${s.phone}</td>
    <td>$${s.fee}</td>
    <td>${s.paid?"مدفوع":"غير مدفوع"}</td>
    <td>${s.receipt||""}</td>
    <td>
    <button onclick="pay(${i})">دفع</button>
    <button onclick="printR(${i})">طباعة</button>
    <button onclick="wa(${i})">WhatsApp</button>
    </td>
    </tr>`;
  });
}

function pay(i){
  const s=getSubs();
  if(!s[i].paid){
    s[i].paid=true;
    s[i].receipt=Date.now();
    saveSubs(s); render();
  }
}

function printR(i){
  const s=getSubs()[i];
  if(!s.paid)return alert("غير مدفوع");
  const w=window.open("");
  w.document.write(`
  <h3>FAST NET</h3>
  <p>الهاتف: 71346411 / 71338640</p>
  <hr>
  الاسم: ${s.name}<br>
  المبلغ: $${s.fee}<br>
  الإيصال: ${s.receipt}
  `);
  w.print();
}

function wa(i){
  const s=getSubs()[i];
  if(!s.paid)return;
  const msg=`FAST NET\nتم استلام دفعة $${s.fee}\nالإيصال: ${s.receipt}`;
  window.open(`https://wa.me/961${s.phone}?text=${encodeURIComponent(msg)}`);
}

render();
