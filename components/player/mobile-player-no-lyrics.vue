<template>
  <div>
    <div class="spacer" />
    <PaddedPaper class="root">
      <div class="player">
        <!-- album image -->
        <div class="album-img-container">
          <img :src="albumImageSrc" alt="album art" />
        </div>
        <!-- song info -->
        <div class="player-text-container">
          <Typography variant="body1">
            <TextTicker :text="songItem.name" />
          </Typography>
          <Typography variant="body1">
            <TextTicker :text="songItem.artists[0].name" />
          </Typography>
          <Typography variant="body1">
            <TextTicker :text="songItem.album.name" />
          </Typography>
        </div>
        <!-- progress bar -->
        <div class="progress-container">
          <VProgressLinear
            :value="progress_percent"
            class="progress"
            color="#3F51B5"
            rounded
          />
        </div>
        <!-- playback controls -->
        <div class="playback-buttons-container">
          <VIcon
            :color="shuffle_state ? indigo : 'inherit'"
            @click="() => emitSendSpotifyPlaybackRequest('shuffle')"
          >
            mdi-shuffle
          </VIcon>

          <VIcon @click="() => emitSendSpotifyPlaybackRequest('previous')">
            mdi-skip-previous
          </VIcon>

          <VIcon
            v-if="is_playing"
            @click="() => emitSendSpotifyPlaybackRequest('pause')"
          >
            mdi-pause
          </VIcon>

          <VIcon v-else @click="() => emitSendSpotifyPlaybackRequest('play')">
            mdi-play
          </VIcon>

          <VIcon @click="() => emitSendSpotifyPlaybackRequest('next')">
            mdi-skip-next
          </VIcon>

          <VIcon
            v-if="['context', 'off'].includes(repeat_state)"
            @click="() => emitSendSpotifyPlaybackRequest('repeat')"
            :color="repeat_state === 'context' ? indigo : 'inherit'"
          >
            mdi-repeat
          </VIcon>
          <VIcon
            v-else
            :color="indigo"
            @click="() => emitSendSpotifyPlaybackRequest('repeat')"
          >
            mdi-repeat-once
          </VIcon>
        </div>
        <!-- show lyrics -->
        <div class="toggle-lyrics-container">
          <OutlinedButton
            class="toggle-lyrics"
            :small="true"
            @click.native="emitToggleShowLyrics"
            :text="showLyrics ? 'Hide Lyrics' : 'Show Lyrics'"
          />
        </div>
      </div>
    </PaddedPaper>
  </div>
</template>

<script lang="ts">
// imports
import PaddedPaper from '../padded-paper.vue';
import FlexContainer from '../flex-container.vue';
import TextTicker from '../text-ticker.vue';
import OutlinedButton from '../buttons/outlined-button.vue';
import { VIcon, VProgressLinear } from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
// component
export default {
  name: 'PlayerNoLyrics',
  props: {
    songItem: Object,
    songItemId: String,
    is_playing: Boolean,
    lyrics: String,
    progress_percent: Number,
    shuffle_state: Boolean,
    repeat_state: String,
    showLyrics: Boolean,
    albumImageSrc: String,
  },
  data() {
    return {
      indigo: colors.indigo.base,
    };
  },
  methods: {
    emitSendSpotifyPlaybackRequest: function (action) {
      this.$emit('sendSpotifyPlaybackRequest', action);
    },
    emitToggleShowLyrics: function () {
      this.$emit('toggleShowLyrics');
    },
  },
  components: {
    PaddedPaper,
    FlexContainer,
    VIcon,
    TextTicker,
    VProgressLinear,
  },
};
</script>

<style scoped>
.root {
  @apply w-screen flex flex-col content-center items-center;
  height: calc(100vh - 3.75rem);
  min-height: 600px;
}
.player {
  @apply p-4 m-auto;
  height: 500px;
  width: 320px;
  @media (min-height: 600px) {
    height: 525px;
  }
  @media (min-height: 700px) {
    height: 600px;
  }
}

.player > * {
  @apply my-2 mx-auto;
  @media (min-height: 600px) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  @media (min-height: 700px) {
    margin-top: 1.75rem;
    margin-bottom: 1.75rem;
  }
}

.album-img-container {
  height: 250px;
  width: 250px;
}
.player-text-container {
  @apply text-center; /* text-align: center; */
  width: 200px;
}
.grow {
  @apply flex-grow; /* flex-grow: 1; */
}
.progress-container {
  @apply w-3/5;
}
.progress {
  transition-duration: 2s;
}
.playback-buttons-container {
  @apply flex flex-row w-full justify-evenly items-center;
}
.toggle-lyrics-container {
  @apply flex flex-row w-full justify-evenly items-center;
}
.toggle-lyrics {
  /* nothing yet */
}
.spacer {
  height: 3.75rem;
}
</style>
