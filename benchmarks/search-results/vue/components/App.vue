<template>
  <div class="search-results">
    <div>
        <SearchResultsItem
          v-for="(item, i) in searchResultsData.items"
          :key="i"
          :item="item"
        />
    </div>
    <Footer/>
  </div>
</template>

<script>
import SearchResultsItem from './SearchResultsItem.vue'
import Footer from './Footer.vue'

export default {
  props: ['searchResultsData']
}
</script>
