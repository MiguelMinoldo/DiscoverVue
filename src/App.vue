<template>
  <v-app>
    <Navbar @searchProducts = "searchProducts" :cart="cart" :subtotalCart="subtotalCart" />
    <v-contene>
      <router-view :products="filteredProducts" @addCart = "addCart"></router-view>
    </v-contene>
    <Footer v-if="pageLoaded" />
  </v-app>
</template>

<script>
import axios from "axios";
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  data: () => {
    return {
      pageLoaded: false,
      products: null,
      searchQuery: "",
      cart: []
    };
  },
  components: {
    Navbar,
    Footer
  },
  computed: {
    subtotalCart: function() {
      let sum = 0
      this.cart.map(p => {
        sum += parseInt(p.price) * p.quantity;
      });

      return sum;
    },
    filteredProducts: function() {
      return this.products
        ? this.products.filter(p =>
            p.name.toLowerCase().match(this.searchQuery.toLowerCase())
          )
        : this.products;
    }
  },
  mounted: function() {
    this.cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    axios.get("https://hplussport.com/api/products/order/price").then(res => {
      this.products = res.data;
    });

    setTimeout(() => {
      this.pageLoaded - true
    }, 2000);
  },
  methods: {
    searchproducts: function(query) {
      this.searchQuery = query;
    },
    addCart: function(products) {
    this.cart = products;
    localStorage.setItem("cart", JSON.stringify(products));
    }
  }
};
</script>

<style scoped>

</style>
