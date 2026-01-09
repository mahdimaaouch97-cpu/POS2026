const table = document.getElementById("subsTable");

function draw() {
  table.innerHTML="";
  getSubs().forEach((s,i)=>{
    table.innerHTML+=`
    <tr>
    <td>${s.name}</td>
    <td>${s.address}</td>
    <td>${s.phone}</td>
    <td>${s.fee}</td>
    <td>${s.paid?"مدفوع":"غير مدفوع"}</td>
    <td><button onclick="del(${i})">✖</button></td>
    </tr>`;
  });
}

function del(i){
  const s=getSubs(); s.splice(i,1); saveSubs(s); draw();
}

document.getElementById("addBtn").onclick=()=>{
  const s=getSubs();
  s.push({
    name:prompt("الاسم"),
    address:prompt("العنوان"),
    phone:prompt("الهاتف"),
    fee:prompt("الرسم"),
    paid:false,
    receipt:0
  });
  saveSubs(s); draw();
};

document.getElementById("exportBtn").onclick=()=>{
  let csv="\uFEFFالاسم,العنوان,الهاتف,الرسم,الحالة\n";
  getSubs().forEach(s=>{
    csv+=`${s.name},${s.address},${s.phone},${s.fee},${s.paid?"مدفوع":"غير مدفوع"}\n`;
  });
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
  a.download="subscribers.csv";
  a.click();
};

document.getElementById("deleteAllBtn").onclick=()=>{
  if(confirm("حذف الجميع؟")){ saveSubs([]); draw(); }
};

draw();
