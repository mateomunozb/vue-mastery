Vue.component('product', {
  template: `
    <div class="product">
      <div class="product-image">
        <img :src="image" />
      </div>
      <div class="product-info">
        <h1> {{ title }} </h1>
        <p> Shipping: {{shipping}} </p>
        <p v-if="inStock">In Stock</p>
        <p v-else="inStock">Out of Stock</p>
        <ul> 
          <li v-for="detail in details">{{ detail }}</li>  
        </ul>
        <div 
          class="color-box"
          v-for="(variant, index) in variants" 
          :key="variant.variantId"
          @mouseover="updateProduct(index)" 
          :style="{ backgroundColor: variant.variantColor}" 
        >
        </div>
        <div class="cart">
          <p> Cart({{ cart }}) </p>
        </div>
        <button 
          @click="addtoCart"
          :class="{ disabledButton: !inStock }"
        >
          Add to cart
        </button>
      </div>
    </div>
  `,
  props: {
    premiun: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      selectedVariant: 0,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
          variantQuantity: 10,
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
          variantQuantity: 0,
        }
      ],
      cart: 0,
    };
  },
  computed: {
    title() {
      return `${this.brand} ${this.product}`
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    shipping() {
      if (this.premiun) {
        return 'Free';
      } else {
        return 2.99
      }
    },
  },
  methods: {
    addtoCart() {
      this.cart += 1
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
  },
});


const app = new Vue({
  el: '#app',
  data: {
    premiun: true,
  },
});