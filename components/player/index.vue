<template>
  <div>
    <template v-if="isMobile">
      <MobilePlayerWithLyrics
        v-bind="$props"
        v-on="$listeners"
        v-if="showLyrics"
      />
      <MobilePlayerNoLyrics v-bind="$props" v-on="$listeners" v-else />
    </template>
    <template v-else>
      <PlayerWithLyrics v-bind="$props" v-on="$listeners" v-if="showLyrics" />
      <PlayerNoLyrics v-bind="$props" v-on="$listeners" v-else />
    </template>
  </div>
</template>

<script lang="ts">
import PaddedPaper from '../padded-paper.vue';
import FlexContainer from '../flex-container.vue';
// player
import PlayerWithLyrics from './player-with-lyrics.vue';
import PlayerNoLyrics from './player-no-lyrics.vue';
import MobilePlayerWithLyrics from './mobile-player-with-lyrics.vue';
import MobilePlayerNoLyrics from './mobile-player-no-lyrics.vue';
// util
import debounce from 'debounce';
// component
export default {
  name: 'NothingPlaying',
  components: {
    PaddedPaper,
    FlexContainer,
    MobilePlayerWithLyrics,
    MobilePlayerNoLyrics,
    PlayerWithLyrics,
    PlayerNoLyrics,
  },
  props: {
    songItem: Object,
    songItemId: String,
    is_playing: Boolean,
    lyrics: String,
    progress_percent: Number,
    sendSpotifyPlaybackRequest: Function,
    shuffle_state: Boolean,
    repeat_state: String,
    showLyrics: Boolean,
    toggleShowLyrics: Function,
    albumImageSrc: String,
  },
  data() {
    return {
      isMobile: false,
    };
  },
  methods: {
    onResize() {
      const isMobile: boolean = window.innerWidth < 640;
      this.isMobile = isMobile;
    },
  },
  mounted() {
    this.onResize(); // get initial width
    window.onresize = debounce(this.onResize, 50); // listen for changes in width
  },
  beforeDestroy() {
    window.onresize = null;
  },
};
</script>
