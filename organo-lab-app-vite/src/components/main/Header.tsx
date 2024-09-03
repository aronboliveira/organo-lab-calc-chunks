import SearchHeader from "../client/inputs/header/SearchHeader";
import FSSearchIcon from "../icons/FSSearchIcon";
import HeaderMenu from "../client/anchors/HeaderMenu";
import HeaderWatcher from "../client/watchers/HeaderWatcher";
import { keyPhrase } from "../../App";
export const titles = {
  shop: "Clique aqui para visitar a nossa Loja!",
  articles: "Clique aqui para visitar nossos Artigos!",
  downloads: "Clique aqui para visitar nossa seção de Downloads!",
  categories: "Clique aqui para visitar as nossas Categorias!",
};
export default function Header(): JSX.Element {
  return (
    <header
      id="header"
      className="header header-full-width has-sticky sticky-jump"
    >
      <div className="header-wrapper stuck">
        <div id="masthead" className="header-main">
          <div
            className="header-inner flex-row container logo-left"
            role="navigation"
          >
            <div id="logo" className="flex-col logo">
              <a
                href="https://blog.organolab.com.br/"
                title={`${keyPhrase} – Blog – Cultive conhecimento.`}
                rel="home"
              >
                <img
                  width={300}
                  height={100}
                  src="https://blog.organolab.com.br/wp-content/uploads/2022/05/LOGO-BLOG.png"
                  className="header_logo header-logo"
                  alt={`${keyPhrase} – Blog`}
                />
                <img
                  width={1020}
                  height={1020}
                  src="https://blog.organolab.com.br/wp-content/uploads/2022/05/ORGLAB_Logo-1024x1024.png"
                  className="header-logo-dark"
                  alt={`${keyPhrase} – Blog`}
                />
              </a>
            </div>
            <div className="flex-col show-for-medium flex-left">
              <ul className="mobile-nav nav nav-left "></ul>
            </div>
            <div
              className="flex-col hide-for-medium flex-left
            flex-grow"
            >
              <ul className="header-nav header-nav-main nav nav-left  nav-uppercase nav-prompts-overlay"></ul>
            </div>
            <div className="flex-col hide-for-medium flex-right">
              <ul className="header-nav header-nav-main nav nav-right  nav-uppercase nav-prompts-overlay">
                <li className="header-search header-search-lightbox has-icon">
                  <a
                    href="#search-lightbox"
                    aria-label="Search"
                    data-open="#search-lightbox"
                    data-focus="input.search-field"
                    className="is-small"
                  >
                    <FSSearchIcon />
                  </a>
                  <div
                    id="search-lightbox"
                    className="mfp-hide dark text-center"
                  >
                    <div className="searchform-wrapper ux-search-box relative form-flat is-large">
                      <form
                        method="get"
                        className="searchform"
                        action="https://blog.organolab.com.br/"
                        role="search"
                        encType="x-www-formurl-encoded"
                        id="header-search-form"
                      >
                        <div className="flex-row relative">
                          <div className="flex-col flex-grow">
                            <SearchHeader />
                          </div>
                          <div className="flex-col">
                            <button
                              type="submit"
                              className="ux-search-submit submit-button secondary button icon mb-0"
                              aria-label="Enviar"
                            >
                              <i className="icon-search"></i>
                            </button>
                          </div>
                        </div>
                        <div className="live-search-results text-left z-top">
                          <div
                            className="autocomplete-suggestions"
                            style={{
                              position: "absolute",
                              display: "none",
                              maxHeight: 300,
                              zIndex: 9999,
                            }}
                          ></div>
                        </div>
                      </form>
                    </div>{" "}
                  </div>
                </li>
                <li className="header-divider"></li>
                <li className="html custom html_topbar_right">
                  <a
                    href="https://www.organolab.com.br/"
                    title={titles.shop}
                    className="anchor-shop menu-external"
                  >
                    <img
                      alt={`${keyPhrase} — Loja`}
                      className="shop"
                      src="https://blog.organolab.com.br/wp-content/uploads/2022/12/Sem-titulo-1.png"
                      width={150}
                      height={50}
                    />
                  </a>
                </li>
                <li className="html custom html_top_right_text">
                  <a
                    href="https://blog.organolab.com.br/blog"
                    title={titles.articles}
                    className="articles-shop menu-external"
                  >
                    <img
                      alt={`${keyPhrase} — Artigos`}
                      className="articles"
                      src="https://blog.organolab.com.br/wp-content/uploads/2022/05/artigos.png"
                      width={150}
                      height={50}
                    />
                  </a>
                </li>
                <li className="html custom html_nav_position_text">
                  <a
                    href="https://blog.organolab.com.br/"
                    title={titles.downloads}
                    className="anchor-shop menu-external"
                  >
                    <img
                      alt={`${keyPhrase} — Downloads`}
                      className="downloads"
                      src="https://blog.organolab.com.br/wp-content/uploads/2022/05/downloads.png"
                      width={150}
                      height={50}
                    />
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex-col show-for-medium flex-right">
              <ul className="mobile-nav nav nav-right ">
                <li className="nav-icon has-icon">
                  <HeaderMenu />
                </li>
              </ul>
            </div>
          </div>
          <div className="container">
            <div className="top-divider full-width"></div>
          </div>
        </div>
        <div className="header-bg-container fill">
          <div className="header-bg-image fill"></div>
          <div className="header-bg-color fill"></div>
        </div>
      </div>
      <HeaderWatcher />
    </header>
  );
}
