/**
 * 开发编译时的环境变量配置
 * compileStartEnv
 * @author WY <yangg.wang06@hand-china.com>
 * @date 2019-06-17
 * @copyright 2019-06-17 © HAND
 */

module.exports = {
  BASE_PATH: `${process.env.BASE_PATH || '/'}`,
  PLATFORM_VERSION: `${process.env.PLATFORM_VERSION || 'SAAS'}`,
  CLIENT_ID: `${process.env.CLIENT_ID || 'localhost'}`,
  BPM_HOST: `${process.env.API_HOST || 'http://hzeronb.saas.hand-china.com'}`,
  WFP_EDITOR: `${process.env.API_HOST || 'http://hzeronb.saas.hand-china.com'}`,
  // API_HOST: `${process.env.API_HOST || 'http://hzeronb.saas.hand-china.com'}`,
  API_HOST: `${process.env.API_HOST || 'http://dev.hzero.org:8080'}`,
  WEBSOCKET_HOST: `${process.env.WEBSOCKET_HOST || 'ws://192.168.16.172:8120'}`,
  // 服务合并的环境变量
  routeMap: JSON.stringify({
    "/hpfm": "/hpfm",
    "/iam": "/iam",
    "/hdtt": "/hdtt",
    "/hmsg": "/hmsg",
    "/hptl": "/hptl",
    "/hwfl": "/hwfl",
    "/hdtw": "/hdtw",
    "/hsdr": "/hsdr",
    "/hsgp": "/hsgp",
    "/hitf": "/hitf",
    "/hfle": "/hfle",
    "/oauth": "/oauth",
    "/hagd": "/hagd",
    "/himp": "/himp",
    "/hrpt": "/hrpt",
    "/hcnf": "/hcnf",
    "/hwfp": "/hwfp",
    "/hnlp": "/hnlp"
  }),
};
