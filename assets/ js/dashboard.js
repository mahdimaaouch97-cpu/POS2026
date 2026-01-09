function refreshDashboard() {
  const s = getSubs();
  document.getElementById("totalSubscribers").textContent = s.length;
  document.getElementById("paidCount").textContent = s.filter(x=>x.paid).length;
  document.getElementById("unpaidCount").textContent = s.filter(x=>!x.paid).length;
  document.getElementById("totalAmount").textContent =
    "$" + s.filter(x=>x.paid).reduce((a,b)=>a+Number(b.fee),0);
}

document.addEventListener("DOMContentLoaded", refreshDashboard);
