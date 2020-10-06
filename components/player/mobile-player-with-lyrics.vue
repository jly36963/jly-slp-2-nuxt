<template>
  <div>
    <div class="spacer" />
    <PaddedPaper class="root">
      <!-- player -->
      <div class="player">
        <div class="song-properties">
          <!-- album image -->
          <div class="album-img-container">
            <img :src="albumImageSrc" alt="album art" />
          </div>
          <!-- song info -->
          <div class="player-text-container">
            <Typography variant="body2">
              <TextTicker :width="150" :text="songItem.name" />
            </Typography>
            <Typography variant="body2">
              <TextTicker :width="150" :text="songItem.artists[0].name" />
            </Typography>
            <Typography variant="body2">
              <TextTicker :width="150" :text="songItem.album.name" />
            </Typography>
          </div>
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
      <!-- divider -->
      <div class="divider-container">
        <Divider class="divider" />
      </div>
      <!-- lyrics -->
      <div class="lyrics-container">
        <pre v-if="lyrics" class="lyrics">
          <Typography class="lyrics-text">{{ trimmedLyrics }}</Typography>
        </pre>
        <div v-else class="no-lyrics">
          <Typography class="no-lyrics-text"> No available lyrics </Typography>
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
import Divider from '../divider.vue';
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
  computed: {
    trimmedLyrics: function () {
      return this.lyrics.trim();
    },
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
    Divider,
  },
};
</script>

<style scoped lang="scss">
.root {
  @apply w-screen flex flex-col content-center justify-center items-center;
  height: calc(100vh - 3.75rem);
  min-height: 600px;
}

.bar {
  transition-duration: 2s;
}
.player {
  @apply p-2 m-auto text-center;
  height: 250px;
  width: 320px;
  flex: 1 1 auto;
  @media (min-height: 600px) {
    height: 275px;
  }
  @media (min-height: 700px) {
    height: 300px;
  }
}

.player > * {
  @apply my-4 mx-auto;
  @media (min-height: 600px) {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
  }
  @media (min-height: 700px) {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
}

.song-properties {
  @apply flex flex-row items-center justify-evenly w-full;
}

.album-img-container {
  height: 80px;
  width: 80px;
}

.player-text-container {
  @apply text-center; /* text-align: center; */
  width: 150px;
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

.lyrics-container {
  text-align: center;
  width: 320px;
  height: 450px;
  flex: 1 1 auto;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
}
.lyrics {
  white-space: pre-wrap;
  font-family: Roboto;
}
.no-lyrics {
  @apply h-full flex;
}
.no-lyrics-text {
  @apply m-auto;
}
.spacer {
  height: 3.75rem;
}
.divider-container {
  @apply w-full text-center flex mb-8;
}
.divider {
  @apply mx-auto;
}
</style>
