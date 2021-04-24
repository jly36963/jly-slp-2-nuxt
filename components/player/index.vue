<template>
  <div>
    <template v-if="isMobile">
      <MobilePlayerWithLyrics
        v-if="showLyrics"
        v-bind="$props"
        v-on="$listeners"
      />
      <MobilePlayerNoLyrics v-else v-bind="$props" v-on="$listeners" />
    </template>
    <template v-else>
      <PlayerWithLyrics v-if="showLyrics" v-bind="$props" v-on="$listeners" />
      <PlayerNoLyrics v-else v-bind="$props" v-on="$listeners" />
    </template>
  </div>
</template>

<script lang="ts">
// util
import debounce from 'debounce';
// components
import PaddedPaper from '../padded-paper.vue';
import FlexContainer from '../flex-container.vue';
// player
import PlayerWithLyrics from './player-with-lyrics.vue';
import PlayerNoLyrics from './player-no-lyrics.vue';
import MobilePlayerWithLyrics from './mobile-player-with-lyrics.vue';
import MobilePlayerNoLyrics from './mobile-player-no-lyrics.vue';

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
  mounted() {
    this.onResize(); // get initial width
    window.onresize = debounce(this.onResize, 50); // listen for changes in width
  },
  beforeDestroy() {
    window.onresize = null;
  },
  methods: {
    onResize() {
      const isMobile: boolean = window.innerWidth < 640;
      this.isMobile = isMobile;
    },
  },
};
</script>
