function refreshDashboard() {
    const subs = getSubs();

    const total = subs.length;
    const paid = subs.filter(s => s.paid === true).length;
    const unpaid = subs.filter(s => s.paid === false).length;
    const amount = subs
        .filter(s => s.paid === true)
        .reduce((sum, s) => sum + Number(s.fee || 0), 0);

    document.getElementById("totalSubscribers").textContent = total;
    document.getElementById("paidCount").textContent = paid;
    document.getElementById("unpaidCount").textContent = unpaid;
    document.getElementById("totalAmount").textContent = "$" + amount;
}

/* تحديث عند فتح الصفحة */
document.addEventListener("DOMContentLoaded", refreshDashboard);

/* تحديث عند الرجوع للصفحة */
window.addEventListener("focus", refreshDashboard);

/* تحديث عند تغيير localStorage */
window.addEventListener("storage", refreshDashboard);
