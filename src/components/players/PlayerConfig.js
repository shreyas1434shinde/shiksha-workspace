export const playerConfig = {
  context: {
    mode: "play",
    partner: [],
    pdata: {
      id: "dev.sunbird.portal",
      ver: "5.2.0",
      pid: "sunbird-portal",
    },
    contentId: "do_21374910251798528014586",
    sid: "6d1898db-d783-4f83-8b92-4a36636e0d2f",
    uid: "fb6b2e58-0f14-4d4f-90e4-bae092e7a235",
    timeDiff: -0.089,
    channel: "01269878797503692810",
    tags: ["01269878797503692810"],
    did: "3ca74a4c5fbce6b7b7f5cd12cebb1682",
    contextRollup: { l1: "01269878797503692810" },
    objectRollup: {},
    userData: { firstName: "Guest", lastName: "" },

    //telemetry
    host: "https://telemetry.prathamdigital.org",
    endpoint: "/v1/telemetry",
  },
  config: {
    showEndPage: false,
    endPage: [{ template: "assessment", contentType: ["SelfAssess"] }],
    showStartPage: true,
    host: "",
    overlay: { showUser: false },
    splash: {
      text: "",
      icon: "",
      bgImage: "assets/icons/splacebackground_1.png",
      webLink: "",
    },
    apislug: "",
    repos: ["/sunbird-plugins/renderer"],
    plugins: [
      { id: "org.sunbird.iframeEvent", ver: 1, type: "plugin" },
      { id: "org.sunbird.player.endpage", ver: 1.1, type: "plugin" },
    ],
    sideMenu: {
      showShare: false,
      showDownload: true,
      showExit: true,
      showPrint: false,
      showReplay: true,
    },
  },
  metadata: {},
  data: {},
};

export const V1PlayerConfig = {
  config: {
    whiteListUrl: [],
    showEndPage: false,
    endPage: [
      {
        template: "assessment",
        contentType: ["SelfAssess"],
      },
    ],
    showStartPage: true,
    host: "",
    overlay: {
      enableUserSwitcher: true,
      showOverlay: true,
      showNext: true,
      showPrevious: true,
      showSubmit: false,
      showReload: false,
      showUser: false,
      menu: {
        showTeachersInstruction: false,
      },
    },
    splash: {
      text: "",
      icon: "",
      bgImage: "assets/icons/splacebackground_1.png",
      webLink: "",
    },
    apislug: "/action",
    repos: ["/sunbird-plugins/renderer"],
    plugins: [
      {
        id: "org.sunbird.iframeEvent",
        ver: 1,
        type: "plugin",
      },
      {
        id: "org.sunbird.player.endpage",
        ver: 1.1,
        type: "plugin",
      },
    ],
    sideMenu: {
      showShare: true,
      showDownload: true,
      showExit: false,
    },
    enableTelemetryValidation: false,
  },
  context: {
    mode: "play",
    partner: [],
    pdata: {
      id: "pratham.admin.portal",
      ver: "1.0.0",
      pid: "admin-portal",
    },
    contentId: "do_12345",
    sid: "",
    uid: "",
    timeDiff: -1.129,
    contextRollup: {
    },
    channel: "test-k12-channel",
    did: "",
    dims: [],
    tags: ["test-k12-channel"],
    app: ["test-k12-channel"],
    cdata: [],
    userData: {
      firstName: "Guest",
      lastName: "User",
    },
  },
  data: {},
  metadata: {}
};
