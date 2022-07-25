import App from '../../App'
import { html, render } from 'lit-html'
import { gotoRoute, anchorRoute } from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class FavouriteProductsView {
  init() {
    document.title = 'Favourite Cupcakes'
    this.render()
    Utils.pageIntroAnim()
    this.getFavProducts()
    const timeline = gsap.timeline({ defaults: { duration: 1 } })
    timeline.from('h1', { opacity: 0 }, .2)
      .from('p',{ opacity: 0, y: '-50%', ease: 'bounce', stagger: .5 }, 1)
  }

   async getFavProducts() {
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id);
      this.favProducts = currentUser.favouriteProducts;
      console.log(this.favProducts);
      this.render();
    } catch (err) {
      Toast.show(err, "error");
    }
  }

  render() {
    const template = html`
      <cb-app-header
        user="${JSON.stringify(Auth.currentUser)}"
      ></cb-app-header>
      <div class="page-content">
       <div class="products-grid">
          ${
            this.favProducts == null
              ? html` <sl-spinner></sl-spinner> `
              : html`
                  ${this.favProducts.map(
                    (favourite) => html`
                      <cb-shop
                        class="product-card"
                        id="${favourite._id}"
                        productName="${favourite.productName}"
                        price="${favourite.price}"
                        image="${favourite.image}"
                      >
                      </cb-shop>
                    `
                  )}
                `}

        </div>
      </div>
    `;
    render(template, App.rootEl);
  }
}

  /*render() {
    const template = html`
      <cb-app-header user="${JSON.stringify(Auth.currentUser)}"></cb-app-header>
      <div class="favourites">
      <div class="page-content">        
        <h1>Your favourite cupcakes!</h1>
        <br>
        <br>
        <br>
        <br>
        <p>Save your favourite tasty cupcakes for later!
        <br><b>New feature coming soon... </b></p>
        
      </div>     
      </div> 
      <cb-app-footer></cb-app-footer>
    `
    render(template, App.rootEl)
  }
}*/


export default new FavouriteProductsView()