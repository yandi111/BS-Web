import request from "@/request/request";

// 查看他人主页作者详情
export const $viewAuthorDetail = function (data = {}) {
  return request.post("/ex/user/community/author-detail", data);
};
// 发布文章
export const $publishArticles = function (data = {}) {
  return request.post("/ex/user/community/content/publish", data);
};
// 编辑文章
export const $editArticles = function (data = {}) {
  return request.post("/ex/user/community/content/edit", data);
};
// 转发文章
export const $forwardArticles = function (data = {}) {
  return request.post("/ex/user/community/content/repost", data);
};

// 查看内容详情
export const $checkContentDetail = function (data = {}) {
  return request.post("/ex/user/community/content/detail", data);
};
// 文章列表
export const $getArticleList = function (data = {}) {
  return request.post("/ex/user/community/content/page", data);
};
// 查看我的个人主页
export const $viewPersonalHomepage = function (data = {}) {
  return request.post("/ex/user/community/my-author-index-detail", data);
};
// 我的个人信息--编辑页
export const $getPersonalInformation = function (data = {}) {
  return request.post("/ex/user/community/my-author-detail", data);
};
// 修改我的个人信息
export const $modifyPersonalInformation = function (data = {}) {
  return request.post("/ex/user/community/my-author-update", data);
};
// 关注列表
export const $getWatchlist = function (data = {}) {
  return request.post("/ex/user/community/author-follow-list", data);
};
// 粉丝列表
export const $getFanList = function (data = {}) {
  return request.post("/ex/user/community/author-fans-list", data);
};
// 关注/取消关注
export const $onFollowOperations = function (data = {}) {
  return request.post("/ex/user/community/author-follow", data);
};
// 评论列表
export const $getListOfComments = function (data = {}) {
  return request.post("/ex/user/community/comment/page", data);
};
// 发表评论
export const $onComment = function (data = {}) {
  return request.post("/ex/user/community/comment/publish", data);
};
// 拉黑/解除拉黑
export const $onBlacklistOperation = function (data = {}) {
  return request.post("/ex/user/community/author-black", data);
};

// 黑名单列表
export const $getBlacklistList = function (data = {}) {
  return request.post("/ex/user/community/author-black-list", data);
};
// 更新用户设置（回复权限）
export const $setReplyPermission = function (data = {}) {
  return request.post("/ex/user/community/user-setting-update", data);
};
// 我的内容列表--创作列表
export const $getMyContentList = function (data = {}) {
  return request.post("/ex/user/community/content/page/my", data);
};
// 创作者中心内容统计数据
export const $getStatisticalData = function (data = {}) {
  return request.post("/ex/user/community/content/statistics", data);
};

// 获取分享链接格式模板
export const $shareLinkFormat = function (data = {}) {
  return request.post("/ex/user/community/share-link-format", data);
};
// 删除文章
export const $deleteContent = function (data = {}) {
  return request.post("/ex/user/community/content/delete", data);
};
// 删除评论
export const $delComment = function (data = {}) {
  return request.post("/ex/user/community/comment/delete", data);
};

// 点赞、取消点赞
export const $chengeLike = function (data = {}) {
  return request.post("/ex/user/community/author-like", data);
};
// 点赞通知列表
export const $likePage = function (data = {}) {
  return request.post("/ex/user/community/message/like/page", data);
};
// 评论与转发列表
export const $commentpage = function (data = {}) {
  return request.post("/ex/user/community/message/comment/page", data);
};
// 新增粉丝通知列表
export const $fansPage = function (data = {}) {
  return request.post("/ex/user/community/message/fans/page", data);
};

//点赞、新增粉丝、评论未读消息数量
export const $getNums = function (data = {}) {
  return request.post("/ex/user/community/message/group", data);
};

// 获取权限设置
export const $getReplyPermission = function (data = {}) {
  return request.post("/ex/user/community/user-setting-detail", data);
};
// 查询作者
export const $authorList = function (data = {}) {
  return request.post("/ex/user/community/author-list", data);
};

//取消粉丝对自己的关注
export const $unsubscribe = function (data = {}) {
  return request.post("/ex/user/community/author-cancel-fans-follow", data);
};
// 文章上下架
export const $putOnOrOffArticle = function (data = {}) {
  return request.post("/ex/user/community/content/edit/status", data);
};

//举报文章
export const $onReport = function (data = {}) {
  return request.post("/ex/user/community/article-report", data);
};
//文章分享--站外--添加浏览次数
export const $onShare = function (data = {}) {
  return request.post("/ex/user/community/content/share", data);
};
