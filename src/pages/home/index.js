import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownUpAcrossLine,
  faEnvelope,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import "./style.css";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useField, ErrorMessage } from "formik";
import TextArea from "../../components/input/textarea";
import Gap from "../../helpers/Gap";
import jsyaml from "js-yaml";

export default function Home() {
  const [result, setResult] = useState("");

  const inputInfos = {
    url: "",
  };
  const [input, setInput] = useState(inputInfos);
  const { url } = input;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const urlValidation = Yup.object({
    url: Yup.string()
      .required("Please insert your account url")
      .matches(
        /(?:(^(trojan-go)\:\/\/([a-zA-Z0-9_\-]+)@([a-zA-Z0-9_\-\.]+)\:([0-9]+)\/\?(sni)\=([a-zA-Z0-9_\-\.]+)\&(type)\=(ws)\&(host)\=([a-zA-Z0-9_\-\.]+)\&(path)\=([a-zA-Z0-9\%\-\_]+))|(^(trojan)\:\/\/([a-zA-Z0-9_\-]+)@([a-zA-Z0-9_\-\.]+)\:([0-9]+)))/,
        "Please insert valid url"
      ),
  });

  const convert = () => {
    const protocol = url.split(/(:\/\/)/);
    if (protocol[0] === "trojan") {
      const result2 = url.split(/(:\/\/)/);
      const pw = result2[2].split("@");
      const host = pw[1].split(":");
      const port = host[1].split("/");
      setResult(`- name: ${host[0]}
  type: ${result2[0]}
  server: ${host[0]}
  port: ${port[0]}
  password: ${pw[0]}
  udp: true
  sni: bug.com
  skip-cert-verify: true`);
    }
    if (protocol[0] === "trojan-go") {
      const result2 = url.split(/(:\/\/)/);
      const pw = result2[2].split("@");
      const host = pw[1].split(":");
      const port = host[1].split("/");
      const sni = port[1].slice(port[1].indexOf("=") + 1, port[1].indexOf("&"));
      const network = port[1].split(/(type)\=/)[2].split("&")[0];
      const hostHeader = port[1].split(/(host)\=/)[2].split("&")[0];
      const path = port[1]
        .split(/(path)\=/)[2]
        .replace("%2F", "/")
        .replace("%2F", "/")
        .replace("%2F", "/")
        .replace("%2F", "/")
        .replace("%2F", "/");

      setResult(`- name: ${host[0]}
  type: trojan
  server: ${host[0]}
  port: ${port[0]}
  password: ${pw[0]}
  udp: true
  sni: ${sni}
  skip-cert-verify: true
  network: ${network}
  ws-opts:
    path: "${path}"
    headers:
      host: ${hostHeader}`);
    }
  };

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([
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
    ]);
    element.href = URL.createObjectURL(file);
    element.download = `config.yaml`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <section className='container'>
      <div className='wrap'>
        <div className='box-2'>
          <div className='left box'>
            <div className='content-left'>
              <div className='header-left'>
                <h1>Paste Your Account</h1>
                <h3>
                  This file config only for OpenClash, CFM, CFA. Only work for
                  Trojan and Trojan-Go account.
                </h3>
                <Gap h='20px' />
              </div>
              <Formik
                enableReinitialize
                initialValues={{ url }}
                validationSchema={urlValidation}
                onSubmit={() => {
                  convert();
                }}
              >
                {(formik) => (
                  <Form>
                    <TextArea
                      placeholder='Paste Here'
                      name='url'
                      onChange={handleChange}
                      type='text'
                    />
                    <Gap h='10px' />
                    <button type='submit' className='convert-btn'>
                      Convert
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className='right box'>
            <div className='content-right'>
              <div className='header-right'>
                <h1>Result</h1>
                <h3>
                  You can copy this format account or download this file config
                  bellow.
                </h3>
                <Gap h='20px' />
              </div>

              <div>
                <textarea
                  className='textarea'
                  placeholder='Result'
                  value={result}
                  name='gg'
                  onChange={(e) => setResult(e.target.value)}
                ></textarea>
              </div>
              <Gap h='10px' />
              <button
                value={result}
                className='download-btn'
                onClick={downloadTxtFile}
              >
                Download Config
              </button>
            </div>
          </div>
        </div>
        <div className='bottom'>
          <div className='icon'>
            <a href='https://twitter.com/ianfebi01'>
              <FontAwesomeIcon icon={faTwitter} size='lg' />
            </a>
            <a href='https://www.facebook.com/ianfebi01/'>
              <FontAwesomeIcon icon={faFacebook} size='lg' />
            </a>
            <a href='https://www.instagram.com/ianfebi01/'>
              <FontAwesomeIcon icon={faInstagram} size='lg' />
            </a>
            <a href='https://github.com/ianfebi01'>
              <FontAwesomeIcon icon={faGithub} size='lg' />
            </a>
            <a href='mailto:ianfebi01@gmail.com'>
              <FontAwesomeIcon icon={faEnvelope} size='lg' />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
