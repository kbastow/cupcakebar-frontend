import { LitElement, html, css } from "@polymer/lit-element";
import { anchorRoute, gotoRoute } from "./../Router";
import Auth from "./../Auth";
import App from "../App";

customElements.define(
  "cb-app-header",
  class AppHeader extends LitElement {
    constructor() {
      super();
    }

    static get properties() {
      return {
        title: {
          type: String,
        },
        user: {
          type: Object,
        },
      };
    }

    firstUpdated() {
      super.firstUpdated();
      this.navActiveLinks();
    }

    navActiveLinks() {
      const currentPath = window.location.pathname;
      const navLinks = this.shadowRoot.querySelectorAll(
        ".app-top-nav a, .app-side-menu-items a"
      );
      navLinks.forEach((navLink) => {
        if (navLink.href.slice(-1) == "#") return;
        if (navLink.pathname === currentPath) {
          navLink.classList.add("active");
        }
      });
    }

    /*hamburgerClick() {
      const appMenu = this.shadowRoot.querySelector(".app-side-menu");
      appMenu.show();
    }

    menuClick(e) {
      e.preventDefault();
      const pathname = e.target.closest("a").pathname;
      const appSideMenu = this.shadowRoot.querySelector(".app-side-menu");
      // hide appMenu
      appSideMenu.hide();
      appSideMenu.addEventListener("sl-after-hide", () => {
        // goto route after menu is hidden
        gotoRoute(pathname);
      });
    }*/

    render() {
      return html`
        <style>
          * {
            box-sizing: border-box;
          }
          .app-header {
            background: var(--sl-color-primary-50);
            position: fixed;
            top: 0;
            width:100%;
            height: var(--app-header-height);
            color: var(--app-header-txt-color);
            display: flex;
            z-index: 8;
            align-items: center;
          }

          /* .app-header-main {
            display: flex;
            width: 100%;
            align-items: center;
          } */

          /*.app-header-main::slotted(h1) {
            color: #fff;
          }*/

          /*.app-logo a {
            color: #fff;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.2em;
            padding: 0.6em;
            display: inline-block;
          }*/

          img {
            width: 18vw;
            padding: 0 1.5vw;
            margin: 0 2vw;
          }

          /*.hamburger-btn::part(base) {
            color: #fff;
          }*/

          .app-top-nav {
            display: flex;
            margin: 0 auto;
            height: 100%;
            align-items: center;
          }

          .app-top-nav a {
            display: flex;
            padding: 1vw;
            margin: 0 1.5vw;
            text-decoration: none;
            color: var(--brand-color);
            align-items: center;
          }

          /*.app-side-menu-items {
            margin-top: 3em;
          }

          .app-side-menu-items a {
            display: block;
            padding: 0.5em;
            text-decoration: none;
            font-size: 1.3em;
            color: #333;
          }

          .app-side-menu-logo {
            width: 180px;
            margin-bottom: 1em;
            position: absolute;
            top: 2em;
            left: 1.5em;
          }*/

          /*.page-title {
            color: var(--app-header-txt-color);
            margin-right: 0.5em;
            font-size: var(--app-header-title-font-size);
          }*/

          /* active nav links */
          .app-top-nav a.active,
          .app-side-menu-items a.active {
            font-weight: bold;
          }

          /* RESPONSIVE - MOBILE ------------------- */
          @media all and (max-width: 768px) {
            .app-top-nav {
              display: none;
            }
          }
        </style>

        <header class="app-header">
          <!--<sl-icon-button
            class="hamburger-btn"
            name="list"
            @click="${this.hamburgerClick}"
            style="font-size: 1.5em;"
          ></sl-icon-button>-->

          <div class="app-header-main"></div>
          <nav class="app-top-nav">
            <a href="/" @click="${anchorRoute}">HOME</a>
            <a href="/products" @click="${anchorRoute}">SHOP</a>
            <a href="/favouriteProducts" @click="${anchorRoute}">FAVOURITES</a>
            <img class="app-logo" src="/images/brandmark.png" />
            <a href="/aboutUs" @click="${anchorRoute}">CONTACT</a>
            <sl-dropdown>
              <a slot="trigger" href="#" @click="${(e) => e.preventDefault()}">ACCOUNT</a>
              <sl-menu>
                <sl-menu-item @click="${() => gotoRoute("/profile")}"
                  >Profile</sl-menu-item
                >
                <sl-menu-item @click="${() => gotoRoute("/editProfile")}"
                  >Edit Profile</sl-menu-item
                >
                <sl-menu-item @click="${() => Auth.signOut()}"
                  >Sign Out</sl-menu-item
                >
              </sl-menu>
             </sl-dropdown>
             ${this.user.accessLevel == 2
              ? html` <a href="/newJob" @click="${anchorRoute}">ADD PRODUCT</a> `
              : ""}
            <!--<a href="#" @click="${() => Auth.cart()}">CART</a>-->
            <a href="/cart" @click="${anchorRoute}">CART</a>

            <!--<sl-dropdown>
              <a slot="trigger" href="#" @click="${(e) => e.preventDefault()}">
                <sl-avatar
                  style="--size: 24px;"
                  image=${this.user && this.user.avatar
                    ? `${App.apiBase}/images/${this.user.avatar}`
                    : ""}
                ></sl-avatar>
                ${this.user && this.user.firstName}
              </a>
              <sl-menu>
                <sl-menu-item @click="${() => gotoRoute("/profile")}"
                  >Profile</sl-menu-item
                >
                <sl-menu-item @click="${() => gotoRoute("/editProfile")}"
                  >Edit Profile</sl-menu-item
                >
                <sl-menu-item @click="${() => Auth.signOut()}"
                  >Sign Out</sl-menu-item
                >
              </sl-menu>
            </sl-dropdown>-->
          </nav>
        </header>

        <!--<sl-drawer class="app-side-menu" placement="left">
          <img class="app-side-menu-logo" src="/images/ss3.svg" />
          <nav class="app-side-menu-items">
            <a href="/" @click="${this.menuClick}">Home</a>
            <a href="/cupcakes" @click="${this.menuClick}"
                    >Cupcakes</a
                  >
            <a href="/favouriteCupcakes" @click="${this.menuClick}"
                    >Favourite Cupcakes</a
                  >
            ${this.user.accessLevel == 2
              ? html`
                  <a href="/newProduct" @click="${this.menuClick}">Post Job</a>
                `
              : ""}
            <a href="/jobs" @click="${this.menuClick}">Jobs</a>
            <a href="#" @click="${() => Auth.signOut()}">Sign Out</a>
          </nav>
        </sl-drawer>-->
      `;
    }
  }
);
