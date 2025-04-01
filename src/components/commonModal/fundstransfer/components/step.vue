<template>
  <div class="step">
    <div class="round-first"></div>
    <div class="border"></div>
    <div class="round-second"></div>
  </div>
</template>


<style lang="scss" scoped>
.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 9px;
  margin: 23px 0 0 23px;
  .round-first {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #90ff00;
  }
  .border {
    width: 1px;
    height: 62px;
    opacity: 0.8;
    border: 1px dashed #8992a6;
    margin: 3px 0;
  }
  .round-second {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #f75f52;
  }
}
</style>