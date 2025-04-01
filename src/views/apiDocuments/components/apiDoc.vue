<template>
  <div class="docText">
    <main>
      <div class="textTable">
        <header>
          <div class="title">{{ data?.title }}</div>
          <div class="apiInterface" style="white-space: pre-wrap">
            {{ data?.apiInterface }}
          </div>
          <div class="apiEffect">{{ data?.apiEffect }}</div>
        </header>
        <div class="requstText mb15">{{ data?.requstText }}</div>
        <div class="dataBody">
          <div class="requetData" v-if="data?.requstParams.length">
            <el-table :data="data?.requstParams" border style="width: 800px">
              <el-table-column prop="label" :label="$t('lang_2285')" width="170">
              </el-table-column>
              <el-table-column prop="type" :label="$t('lang_2364')" width="100">
              </el-table-column>
              <el-table-column prop="need" :label="$t('spot_26')" width="80">
              </el-table-column>
              <el-table-column prop="note" :label="$t('lang_41')"> </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="reponseText mb15 mt30">{{ data?.reponseText }}</div>
        <div class="dataBody">
          <div class="reponseParams" v-if="data?.reponseParams.length">
            <el-table :data="data?.reponseParams" border style="width: 800px">
              <el-table-column prop="label" :label="$t('lang_2285')" width="170">
              </el-table-column>
              <el-table-column prop="type" :label="$t('lang_2364')" width="100">
              </el-table-column>
              <el-table-column prop="need" :label="$t('spot_26')" width="80">
              </el-table-column>
              <el-table-column prop="note" :label="$t('lang_41')"> </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="codeBox">
        <div class="card">
          <div class="requstExampleText">{{ data?.requstExampleText }}</div>
          <div class="code">
            <pre v-highlight>
              <code class="lang-javascript" v-html="requstExample"></code>
            </pre>
            <span class="type">js</span>
          </div>
        </div>
        <div class="card">
          <div class="reponseExampleText">{{ data?.reponseExampleText }}</div>
          <div class="code">
            <pre v-highlight>
              <code class="lang-javascript" v-html="responseExample"></code>
            </pre>
            <span class="type">js</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    requstExample() {
      let code = this.data.requstExample;
      return this.$hljs.highlightAuto(code).value;
    },
    responseExample() {
      let code = this.data.responseExample;
      return this.$hljs.highlightAuto(code).value;
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.docText {
  padding: 0 0px 10px 0px;
  color: #000;
  height: 100%;
  padding-top: 70px;
  overflow-x: hidden;

  main {
    display: flex;
    justify-content: space-between;
    background-color: #1c1e28;
    background-color: #111111;
    height: 100%;
    .textTable {
      background-color: #fff;
      padding: 10px 10px;
      border-top-right-radius: 10px;
      // min-height: calc(100vh - 80px);
      header {
        .title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .apiInterface,
        .apiEffect {
          font-size: 14px;
          color: #000;
          margin: 20px 0;
        }
      }
      .reponseText,
      .requstText {
        font-size: 14px;
      }
      .dataBody {
        flex: 1;
      }
    }
    .codeBox {
      flex: 1;
      padding-top: 50px;
      padding-left: 15px;
      padding-right: 15px;
      min-height: calc(100vh - 80px);
      overflow-x: auto;
      .card {
        color: #fff;
        font-size: 14px;
        .code {
          position: relative;
          pre {
            code {
              border-radius: 10px;
            }
            .hljs {
              background-color: #333333;
            }
          }
          .type {
            position: absolute;
            top: 30px;
            right: 20px;
            color: #6a6a6a;
          }
        }
      }
    }
  }
}
</style>
