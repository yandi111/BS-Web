<template>
  <div class="no-data-box">
    <div class="img-box">
      <img :src="imageSrc" alt="No Data" class="no-data__image" />
    </div>

    <p class="no-data__text">{{ text }}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'NoData',
  props: {
    imageSrc: {
      type: String,
      default: require('../assets/images/nodata.png')
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.no-data-box {
  text-align: center;
  padding: 20px;
}

.img-box {
  display: flex;
  justify-content: center;
}

.no-data__image {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  width: 48px;
  height: 48px;
}

.no-data__text {
  margin-top: 10px;
  font-size: 16px;
  color: #737373;
}
</style>