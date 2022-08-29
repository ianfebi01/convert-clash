import { useState } from "react";

import "./style.css";

export default function Home() {
  const [result, setResult] = useState("");
  const [input, setInput] = useState(
    "trojan://7dc1ab20-26f0-11ed-b70d-1239d0255272@id5-trojan.bonds.id:443/"
  );
  // const result2 = input.split(":");
  // console.log(result2);
  const convert = (e) => {
    e.preventDefault();

    const result2 = input.split(/(:\/\/)/);
    const pw = result2[2].split("@");
    const host = pw[1].split(":");
    const port = host[1].split("/");
    console.log("protocol : ", result2[0]);
    console.log("pw : ", pw[0]);
    console.log("host : ", host[0]);
    console.log("port : ", port[0]);
    setResult(`- name: ${host[0]}
  type: ${result2[0]}
  server: ${host[0]}
  port: ${port}
  password: ${pw[0]}
  udp: true
  sni: bug.com
  skip-cert-verify: true`);
  };

  const exportData = () => {
    const jsonString = `data:text/yaml;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(result)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.yaml";

    link.click();
  };

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([result], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `config.yaml`;
    document.body.appendChild(element);
    element.click();
  };
  return (
    <section className='container'>
      <div className='box-2'>
        <div className='left box '>
          <div className='content'>
            <h1>Paste Your Account</h1>
            <form onSubmit={convert}>
              <div className='textarea'>
                <textarea
                  placeholder='Paste here'
                  value={input}
                  name='account'
                  onChange={(e) => setInput(e.target.value)}
                ></textarea>
              </div>
              <button type='submit' className='convert-btn'>
                Convert
              </button>
            </form>
          </div>
        </div>
        <div className='right box'>
          <div className='content'>
            <h1>Result</h1>
            <div className='textarea'>
              <textarea
                placeholder='Result'
                value={result}
                name='gg'
                onChange={(e) => setResult(e.target.value)}
              ></textarea>
            </div>
            <button
              type='submit'
              value={result}
              className='download-btn'
              onClick={downloadTxtFile}
            >
              Download
            </button>
          </div>
        </div>
      </div>
      <div className='bottom'>testis</div>
    </section>
  );
}
