<template>
  <v-footer dark padless>
    <v-card flat tile class="red darken-1 white--text text-center">
      <v-card-text
        class="white--text pt-5"
      >
        All products and people associated with H+ Sport are also fictitious. Any resemblance to real 
        brands, products, or people is purely coincidental. Information provided about the product is 
        also fictitious and should not be construed to be representative of actual products on the market 
        in a similar product category.
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} —
        <strong>Made by 
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <a
                class="footer-link"
                href="https://github.com/best-lucky1030"
                target="_blank"
                v-bind="attrs"
                v-on="on"
              >
                @best-lucky1030
              </a>
            </template>
            <span>Move to GitHub Account and Follow Me 😄</span>
          </v-tooltip>
        </strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
.footer-link {
  text-decoration: none;
  color: #a1a1a1;
  font-size: 16px;
}

.footer-link:hover {
  color: greenyellow;
}
</style>
