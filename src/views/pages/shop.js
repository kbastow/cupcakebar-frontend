import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class ShopView {
  init(){
    document.title = 'Shop'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <cb-app-header user="${JSON.stringify(Auth.currentUser)}"></cb-app-header>
      <div class="shop">
      <div class="page-content">        
        <h1>Shop</h1>
        <sl-button class="product-btn"@click=${() => gotoRoute('/product')}> PRODUCT </sl-button>
        <br>
        <br>
        <br>
        <br>
        <p>Larger collection of tasty treats in the works...
        <br><b>Stay tuned!</b></p>
        
      </div> 
      </div>     
    `
    render(template, App.rootEl)
  }
}


export default new ShopView()