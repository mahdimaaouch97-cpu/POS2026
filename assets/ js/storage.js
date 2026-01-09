function getSubs() {
  return JSON.parse(localStorage.getItem("subs")) || [];
}

function saveSubs(data) {
  localStorage.setItem("subs", JSON.stringify(data));
}
