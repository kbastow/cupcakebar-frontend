import App from '../../App'
import { html, render } from 'lit-html'
import { gotoRoute, anchorRoute } from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import UserAPI from '../../UserAPI'

class FavouriteProductsView {
  init() {
    document.title = "Favourite Products";
    this.favProducts = null;
    this.render();
    Utils.pageIntroAnim();
    this.getFavProducts();
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
      <cb-app-header user="${JSON.stringify(Auth.currentUser)}"></cb-app-header>
      <div class="page-content">
        <div class="products-grid">
          ${this.favProducts == null
            ? html` <sl-spinner></sl-spinner> `
            : html`
                ${this.favProducts.map(
                  (product) => html`
                    <cb-shop
                        class="product-card"
                        id="${product._id}"
                        productName="${product.productName}"
                        price="${product.price}"
                        image="${product.image}"
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

export default new FavouriteProductsView();