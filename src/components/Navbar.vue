<template>
  <v-app-bar app color="red darken-1" dense dark>
    <v-btn text dark href="/">
      <v-toolbar-title>H+ Sport Shop</v-toolbar-title>
    </v-btn>
    <v-spacer></v-spacer>
    <v-text-field
      hide-details
      prepend-icon="search"
      placeholder="Search Product..."
      single-line
      v-model="searchQuery"
      class="d-none d-sm-flex"
      @keyup.enter="updateResults"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-menu offset-y :close-on-content-click="false" min-width="370px" max-height="500px">
      <template v-slot:activator="{ on: menu }">
        <v-tooltip disabled>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn text dark v-on="{ ...tooltip, ...menu }">
              <v-icon>mdi-cart</v-icon>
              <v-badge :content="cart.length.toString()" color="red darken-4" inline></v-badge>
            </v-btn>
          </template>
          <span>Cart</span>
        </v-tooltip>
      </template>
      <v-card>
        <v-list v-if="cart.length>0">
          <v-list-item v-for="(product, index) in cart" :key="index">
            <v-list-item-avatar>
              <img :src="product.image_url" :alt="product.image_title" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-col cols="8">
                <v-list-item-title>{{ product.name }}</v-list-item-title>
                <v-list-item-subtitle>€ {{parseInt(product.price).toFixed(2)}}</v-list-item-subtitle>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  type="Number"
                  filled
                  solo
                  dense
                  flat
                  hide-details
                  v-model="product.quantity"
                  min="1"
                  max="100"
                  background-color="blue-grey lighten-5"
                  @click="changeCartQuantity(index)"
                  @change="changeCartQuantity(index)"
                ></v-text-field>
              </v-col>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                elevation="0"
                color="red light-4"
                dark
                fab
                width="15px"
                height="15px"
                @click="removeCart(index)"
              >
                <v-icon size="10" style="margin-top: -4px;">close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
          <v-container style="padding-bottom:0px;">
            <v-row>
              <v-col cols="9" class="text-right">Subtotal:</v-col>
              <v-col cols="3" class="text-right">
                <strong style="color:#388E3C;">€ {{parseInt(subtotalCart).toFixed(2)}}</strong>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn
                  block
                  color="red darken-1"
                  elevation="0"
                  dark
                  :loading="loadingCheckoutBtn"
                  @click="loadingCheckoutBtn = true"
                >CHECKOUT</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-list>
        <v-list v-if="cart.length<1">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>No Products</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  props: ["cart", "subtotalCart"],
  data: () => {
    return {
      searchQuery: "",
      loadingCheckoutBtn: false
    };
  },
  watch: {
    loadingCheckoutBtn: function() {
      setTimeout(() => {
        this.loadingCheckoutBtn = false;
        this.cart = [];
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }, 3000);
    }
  },
  methods: {
    updateResults: function() {
      this.$emit("searchProducts", this.searchQuery);
    },
    removeCart: function(index) {
      this.cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    changeCartQuantity: function(index) {
      let prodQuantity = parseInt(this.cart[index].quantity);
      if (prodQuantity < 1) {
        this.cart.splice(index, 1);
      } else if (prodQuantity > 100) {
        this.cart[index].quantity = 100;
      } else {
        this.$set(this.cart, index, this.cart[index]);
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
    }
  }
};
</script>

<style scoped>
</style>
