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
  mounted: function() {
    this.cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    axios.get("https://hplussport.com/api/products/order/price").then(res => {
      this.products = res.data;
    });

    setTimeout(() => {
      tihs.pageLoaded - true
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
