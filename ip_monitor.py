import os
import platform
from flask import Flask, render_template_string

app = Flask(__name__)

# ضع عناوين الـ IP هنا
IPS = [
    "8.8.8.8",
    "1.1.1.1",
    "192.168.1.1",
    "192.168.1.50"
]

HTML = """
<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<title>IP Monitor</title>
<meta http-equiv="refresh" content="10">
<style>
body {
    font-family: Arial, sans-serif;
    background: #f4f4f4;
    direction: rtl;
    text-align: center;
    padding: 20px;
}
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
}
.box {
    width: 200px;
    padding: 15px;
    color: white;
    font-size: 18px;
    font-weight: bold;
    border-radius: 10px;
}
.online { background: #28a745; }
.offline { background: #dc3545; }
</style>
</head>
<body>

<h1>مراقبة IP</h1>

<div class="container">
{% for ip, status in results.items() %}
  <div class="box {{ 'online' if status else 'offline' }}">
    {{ ip }}<br>
    {{ 'شغال' if status else 'غير شغال' }}
  </div>
{% endfor %}
</div>

<p>تحديث تلقائي كل 10 ثواني</p>

</body>
</html>
"""

def ping(ip):
    system = platform.system().lower()
    if system == "windows":
        cmd = f"ping -n 1 -w 1000 {ip} > nul"
    else:
        cmd = f"ping -c 1 -W 1 {ip} > /dev/null 2>&1"
    return os.system(cmd) == 0

@app.route("/")
def index():
    results = {ip: ping(ip) for ip in IPS}
    return render_template_string(HTML, results=results)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
