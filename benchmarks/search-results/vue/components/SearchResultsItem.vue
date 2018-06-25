<template>
    <div class="search-results-item"
         :style="{ backgroundColor: purchased ? '#f1c40f' : ''}">
        <h2>{{ item.title }}</h2>

        <div class="lvpic pic img left">
        <div class="lvpicinner full-width picW">
            <a :href="'/buy/' + item.id" class="img imgWr2">
               <img :src="item.image" alt="item.title">
            </a>
        </div>
        </div>

        <span class="price">{{ item.price }}</span>

        <div v-if="purchased" class="purchased">Purchased!</div>
        <button v-else class="buy-now" type="button" @click="handleBuyButtonClick">
            Buy now!
        </button>

    </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return { purchased: false }
  },
  methods: {
    handleBuyButtonClick: function(instance) {
      this.purchased = true
    }
  }
}
</script>
