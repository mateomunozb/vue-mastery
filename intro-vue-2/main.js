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
        <button 
          @click="addtoCart()"
          :class="{ disabledButton: !inStock }"
        >
          Add to cart
        </button>
      </div>
    </div>
  `,
  props: {
    premium: {
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
      if (this.premium) {
        return 'Free';
      } else {
        return 2.99
      }
    },
  },
  methods: {
    addtoCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
  },
});

Vue.component('reviews', {
  template: `
  <div>
    <h1 class="review-title">Reviews</h1>
    <div class="review-list">
      <ul v-if="reviews.length > 0">
        <li v-for="review in reviews">
          <p>{{review.name}}</p>
          <p>{{review.review}}</p>
          <p>Rating: {{review.rating}}</p>
          <p>Recomend: {{review.recomend}}</p>
        </li>
      </ul>
      <p v-else> There are no reviews yet</p>
    </div>
    <form class="review-form" @submit.prevent="onSubmit">
        <div v-if="errors.length > 0">
          <b> Please correct the following error(s): </b>
          <ul>
          <li v-for="error in errors"> {{ error }} </li>
          </ul>  
        </div>
        <label for="name">Name:</label>
        <input v-model="name" type="text">
        <label for="review">Review:</label>
        <textarea v-model="review"></textarea>
        <p>
          <label for="rating" >Rating:</label>
          <select v-model="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>
        <div>
          <p>Would you recommend this product?</p>
          <label for="uno">Yes</label>
          <input type="radio" value="Yes" v-model="recomend">
          <label for="Dos">No</label>
          <input type="radio" value="No" v-model="recomend">     
        </div>
        <input type="submit" value="Submit">
    </form>
  </div>
  `,
  data() {
    return {
      reviews: [],
      name: null,
      review: null,
      rating: null,
      recomend: null,
      errors:[]
    }
  },
  methods: {
    onSubmit() {
      this.errors = [];
      if (this.name && this.review && this.rating) {
        const review = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recomend: this.recomend,
        };
        this.reviews.push(review);
        this.name = null;
        this.review = null;
        this.rating = null;
      } else {
        if (!this.name) this.errors.push('Name required.')
        if (!this.review) this.errors.push('Review required.')
        if (!this.rating) this.errors.push('Rating required.')
        if (!this.recomend) this.errors.push('Recomend required.')
      }
    },
  },
});


const app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    }
  },
});