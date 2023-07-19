<template>
  <v-app>
    <Navbar @searchProducts="searchProducts" :cart="cart" :subtotalCart="subtotalCart" />
    <v-main>
      <router-view name="recommendedProducts" :products="recommendedProducts" @addCart="addCart"></router-view>
      <router-view name="products" :products="products" @addCart="addCart"></router-view>
    </v-main>
    <Footer v-if="pageLoaded" />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { DataProvider, getUserId, trackStatusCartEvent, trackPageViewEvent } from '@sitecore-discover/data';
import { PageController } from '@sitecore-discover/core';

export default {
  name: "App",
  data: () => {
    return {
      pageLoaded: false,
      products: null,
      recommendedProducts: null,
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
      let sum = 0;
      this.cart.map(p => {
        sum += parseInt(p.price) * p.quantity;
      });

      return sum;
    },
  },
  mounted: function() {
    this.cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    PageController.getContext().setPageUri('/');
    trackPageViewEvent(PageController.getContext().toJson());
    this.fetchData();
    this.fetchDataRecProd();

    setTimeout(() => (this.pageLoaded = true), 2000);
  },
  methods: {
    searchProducts: function(query) {
      this.searchQuery = query;
      this.fetchData()
    },
    addCart: function(products) {
      this.cart = products;
      localStorage.setItem("cart", JSON.stringify(products));
      trackStatusCartEvent(products, PageController.getContext().toJson())
    },
    fetchData: function() {
      const uId = getUserId().uuid?.toString() || '';
      console.log('Query with user!', uId);
      DataProvider.get({
        context: {
          page: {
            uri: "/"
          },
          user: {
            uuid: uId
          }
        },
        query: {
          keyphrase: {
            value: [this.searchQuery],
          },
        },
        n_item: 30,
        widget: {
          rfkid: "rfkid_222"
        },
        content: {
          product: {},
        },
      }).then(response => {
        this.products = response.content.product.value;
      });
    },
    fetchDataRecProd: function() {
      const uId = getUserId().uuid?.toString() || '';
      DataProvider.get({
        context: {
          page: {
            uri: "/"
          },
          user: {
            uuid: uId
          }
        },
        n_item: 5,
        widget: {
          rfkid: "rfkid_111"
        },
        content: {
          product: {},
        },
      }).then(response => {
        this.recommendedProducts = response.content.product.value;
      });
    },
  }};
    
</script>

<style scoped>

</style>
