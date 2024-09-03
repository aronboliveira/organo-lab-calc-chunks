import { keyPhrase } from "../../App";
import LiveSoil from "../client/images/LiveSoil";
export default function Footer(): JSX.Element {
  return (
    <footer id="brand-wrapper">
      <LiveSoil />
      <section id="brand-invite-sect">
        <h3 id="brand-invite-header">Conheça Todas as Soluções</h3>
        <div id="brand-invite-body">
          <div id="brand-invite-subtitle-wrapper">
            <img
              id="brand-invite-logo"
              alt={`Logo ${keyPhrase} Pequena`}
              src="/images/org_lab_logo_favicon_32.png"
              width={40}
              height={40}
            />
            <h4 id="brand-invite-subtitle">E aí, bora cultivar?</h4>
          </div>
          <button
            id="brand-invite-shop-btn"
            className="btn btn-primary"
            type="button"
          >
            <a
              id="brand-invite-shop-btn-text"
              href="https://www.organolab.com.br/"
              target="_blank"
              rel="noopener"
              title="Clique aqui para acessar o site principal da loja!"
            >
              Conheça a Loja
            </a>
          </button>
        </div>
      </section>
    </footer>
  );
}
