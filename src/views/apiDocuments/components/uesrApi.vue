<template>
  <div class="user-api">
    <div class="title1">请求签名</div>
    <div class="title2">请求方式</div>
    <p class="mt30 mb30">
      所有接口均使用HTTP协议中的POST方法，请求参数使用JSON格式，响应参数使用JSON格式。
    </p>
    <div class="title2 mb15">请求头参数内容</div>
    <div class="table1">
      <el-table :data="headerList" border style="width: 800px">
        <el-table-column prop="label" label="名称" width="170">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="100">
        </el-table-column>
        <el-table-column prop="need" label="是否必须" width="80">
        </el-table-column>
        <el-table-column prop="note" label="备注"> </el-table-column>
      </el-table>
    </div>
    <div class="example">
      <div class="title">示例</div>
      <p class="top mt10 mb10">输入参数：</p>
      <p>
        1. 请求 body JSON 字符串（reqBody）：{"username":"user123",
        "email":"user123@example.com", "age":30}
      </p>
      <p>2. apiToken："apiToken"</p>
      <p>3. 时间戳（timestamp），毫秒为单位："1625573062000"</p>
      <p class="top mt30 mb10">根据输入参数，按照代码逻辑生成签名字符串：</p>
      <p>
        1. 将 JSON 格式的请求 body 转换为有序的字符串形式。结果为：
        "age=30&email=user123@example.com&username=user123"
        如果value部分是对象或数组，value部分直接转为json字符串后拼接，转json时，key和value直接只能是“:”分隔，不能有空格。
        示例数据：{"name":{"realname":"张三","nickname":"示例数据"}}
        拼接结果：name={"realname":"张三","nickname":"示例数据"}
      </p>
      <p>
        2. 将 `apiToken(如果有)` 和`时间戳`依次拼接到结果字符串后面：
        "age=30&email=user123@example.com&username=user123&token=your_api_token&time=1625573062000"
        注意这里拼接apiToken的时候，key为token
      </p>
      <p>
        3. 对拼接的字符串进行 MD5
        加密并将结果转换为大写。假设加密后的字符串为：`"A7D41F8E5929E5B9C6D54E4A2F3B7A20"`
      </p>
      <div class="title2 mt30">示例请求</div>
      <div class="mt15">请求头</div>
      <div class="text1 pl15" style="white-space: pre-wrap">{{ text1 }}</div>

      <div class="mt15">请求体</div>
      <div class="text1 pl15" style="white-space: pre-wrap">{{ text2 }}</div>

      <div class="title2 mt30 mb20">响应封装格式</div>
      <div class="table">
        <el-table :data="headerList" border style="width: 800px">
          <el-table-column prop="label" label="字段" width="170">
          </el-table-column>
          <el-table-column prop="type" label="类型" width="100">
          </el-table-column>

          <el-table-column prop="note" label="备注" width=""> </el-table-column>
        </el-table>
      </div>
      <div class="title1 mt30 mb10">接口文档</div>
      <div class="title2 mb10">创建api口令</div>
      <p>请求地址:</p>
      <p>/api/ex/user/api/token/create</p>

      <div class="mt15 mb15">请求体</div>
      <div class="table">
        <el-table :data="apiRequest" border style="width: 800px">
          <el-table-column prop="label" label="字段" width="170">
          </el-table-column>
          <el-table-column prop="need" label="是否必须" width="80">
          </el-table-column>
          <el-table-column prop="note" label="备注" width=""> </el-table-column>
        </el-table>
      </div>
      <div class="mt30 mb15">响应体data内容 (Object)</div>
      <div class="table">
        <el-table :data="apiResponse" border style="width: 800px">
          <el-table-column prop="label" label="字段" width="170">
          </el-table-column>
          <el-table-column prop="need" label="是否必须" width="80">
          </el-table-column>
          <el-table-column prop="note" label="备注" width=""> </el-table-column>
        </el-table>
      </div>
     
    </div>
  </div>
</template>

<script>
export default {
  name: "user-api",
  data() {
    return {
      headerList: [
        {
          label: "apiToken",
          type: "string",
          need: "否",
          note: "api令牌,调用创建api令牌接口时不传送，其他接口需要传递。",
        },
        {
          label: "sign",
          type: "string",
          need: "是",
          note: "签名：将所有请求参数按照参数名升序排列，拼接成字符串，最后按顺序拼接上token和time，使用MD5加密后转大写，得到sign",
        },
        {
          label: "time",
          type: "string",
          need: "是",
          note: "时间戳：当前时间戳，精确到毫秒，时间戳与服务器时间相差超过3分钟的请求会被拒绝。",
        },
        {
          label: "reqId",
          type: "string",
          need: "是",
          note: `请求ID：生成一个32位的UUID，删除里面的" - "`,
        },
      ],
      text1: `{
    "apiToken":"your_api_token",
    "sign":"A7D41F8E5929E5B9C6D54E4A2F3B7A20",
    "time":"1625573062000",
    "reqId":"unique_request_id"
}`,
      text2: `{
    "username":"user123",
    "email":"user123@example.com",
    "age":30
}`,
      responseList: [
        {
          label: "success",
          type: "string",
          note: "api令牌,调用创建api令牌接口时不传送，其他接口需要传递。",
        },
      ],
      apiRequest: [
        {
          label: "apiKey",
          need: "是",
          note: "apikey",
        },
        {
          label: "apiSecret",
          need: "是",
          note: "api密钥",
        },
      ],
      apiResponse: [
        {
          label: "token",
          need: "否",
          note: "apiToken，有效期14天",
        },
      ],
      codeText: `{
            "apiToken":"your_api_token",
            "sign":"A7D41F8E5929E5B9C6D54E4A2F3B7A20",
            "time":"1625573062000",
            "reqId":"unique_request_id"
         }`,
    };
  },
};
</script>

<style lang="scss" scoped>
.user-api {
  color: #000;
  padding: 80px 300px 10px 20px;

  .title1 {
    font-size: 30px;
    font-weight: bold;
  }
  .title2 {
    font-size: 24px;
    font-weight: bold;
  }
  p {
    font-size: 16px;
    color: #000;
    line-height: 24px;
  }
  .example {
    margin-top: 30px;
    p {
      margin-bottom: 5px;
    }
    .title {
      font-size: 18px;
    }
    .text1 {
      padding-left: 10px;
    }
  }
}
</style>
