// state
export const state = () => ({
  uid: null,
  userToken: null,
  userData: null,
  userInitialized: false,
});

// mutations
export const mutations = {
  setUid: function (state, newUid) {
    state.uid = newUid;
  },
  setUserToken: function (state, newUserToken) {
    state.userToken = newUserToken;
  },
  setUserData: function (state, newUserData) {
    state.userData = newUserData;
  },
  setUserInitialized: function (state, newUserInitialized) {
    state.userInitialized = newUserInitialized;
  },
};

export const actions = {
  setUid: function ({ commit }, newUid) {
    commit('setUid', newUid);
  },
  setUserToken: function ({ commit }, newUserToken) {
    commit('setUserToken', newUserToken);
  },
  setUserData: function ({ commit }, newUserData) {
    commit('setUserData', newUserData);
  },
  setUserInitialized: function ({ commit }, newUserInitialized) {
    commit('setUserInitialized', newUserInitialized);
  },
};
