import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import ProductAPI from "../../ProductAPI";
import Toast from "../../Toast";

class ProductView {
  async init(){
    document.title = 'Product'
    this.product = null
    this.render()
    Utils.pageIntroAnim()
    await this.getProduct()
  }

  async getProduct() {
    try {
      const productId = Utils.getParams().productId
      this.product = await ProductAPI.getProduct(productId)
      this.render();
    } catch (err) {
      Toast.show(err, "error");
    }
  }

  render(){
    const template = html`
      <cb-app-header user="${JSON.stringify(Auth.currentUser)}"></cb-app-header>
      <div class="page-content">        
         ${
        this.product == null
            ? html` <sl-spinner></sl-spinner> `
            : html`
              <h1>${this.product.productName}</h1>
              <img slot="image" src="${App.apiBase}/images/${this.product.image}" />
            `}
      </div>
      <cb-app-footer></cb-app-footer>      
    `
    render(template, App.rootEl)
  }
}

export default new ProductView()