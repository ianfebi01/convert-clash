export default function DownloadConfig(result) {
  const element = document.createElement("a");
  const file = new Blob(
    [
      `---
    proxies:
    ${result}
    redir-port: 7892
    tproxy-port: 7895
    port: 7890
    socks-port: 7891
    mixed-port: 7893
    mode: global
    log-level: silent
    allow-lan: true
    external-controller: 0.0.0.0:9090
    secret: '123456'
    bind-address: "*"
    external-ui: "/usr/share/openclash/ui"
    ipv6: false
    geodata-mode: false
    geodata-loader: memconservative
    tcp-concurrent: true
    dns:
      enable: true
      ipv6: false
      nhanced-mode: redir-host
      listen: 0.0.0.0:7874
      nameserver:
      - dhcp://"usb0"
      - 192.168.19.61
      default-nameserver:
      - 192.168.19.61
      use-hosts: true
    sniffer:
      enable: true
      sniffing:
      - tls
      - http
    profile:
      store-selected: true
      store-fake-ip: true
    hosts:
      internetbaik.telkomsel.com: 0.0.0.0
      internettepat.telkomsel.com: 0.0.0.0
      e1.whatsapp.net: 108.138.141.52
      binance.com: 1.1.1.1
      "*.binance.com": 1.1.1.1
      data-seed-prebsc-1-s1.binance.org: 99.83.248.37
      shopee.co.id: 143.92.75.65
      cf.shopee.co.id: 199.91.74.171
      api.shopee.co.id: 143.92.75.65
      mall.shopee.co.id: 143.92.75.65
      games.shopee.co.id: 143.92.81.64
      df.infra.sz.shopee.co.id: 143.92.85.2
      log-collector.shopee.co.id: 103.115.77.222
      data-rep.livetech.shopee.co.id: 143.92.85.2
      shopeemobile.com: 103.115.78.65
      deo.shopeemobile.com: 36.91.231.33
      gslb.sgw.shopeemobile.com: 103.115.76.67
      c-api-bit.shopeemobile.com: 103.115.78.89
    rules:
    - IP-CIDR,198.18.0.1/16,REJECT,no-resolve
    - DST-PORT,7892,REJECT
    - DST-PORT,7895,REJECT
    - MATCH,GLOBAL`,
    ],
    {
      type: "text/plain",
    }
  );
  element.href = URL.createObjectURL(file);
  element.download = `config.yaml`;
  document.body.appendChild(element);
  element.click();
}
