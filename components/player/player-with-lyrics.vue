<template>
  <div>
    <FlexContainer>
      <PaddedPaper :height="575">
        <div class="root">
          <!-- player -->
          <div class="player">
            <div class="py-2 flex flex-col items-center">
              <!-- album image -->
              <div class="pb-2">
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

                <VIcon
                  @click="() => emitSendSpotifyPlaybackRequest('previous')"
                >
                  mdi-skip-previous
                </VIcon>

                <VIcon
                  v-if="is_playing"
                  @click="() => emitSendSpotifyPlaybackRequest('pause')"
                >
                  mdi-pause
                </VIcon>

                <VIcon
                  v-else
                  @click="() => emitSendSpotifyPlaybackRequest('play')"
                >
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
              <OutlinedButton
                class="toggle-lyrics"
                :small="true"
                @click.native="emitToggleShowLyrics"
                :text="showLyrics ? 'Hide Lyrics' : 'Show Lyrics'"
              />
            </div>
          </div>
          <!-- lyrics -->
          <div class="lyrics-container">
            <pre v-if="lyrics" class="lyrics">
              <Typography class="lyrics-text">{{ trimmedLyrics }}</Typography>
            </pre>
            <div v-else class="no-lyrics">
              <Typography class="no-lyrics-text"
                >No available lyrics
              </Typography>
            </div>
          </div>
        </div>
      </PaddedPaper>
    </FlexContainer>
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
  },
};
</script>

<style scoped lang="scss">
.root {
  height: 575;
  @apply flex flex-row justify-evenly p-2;
  @media (min-width: 0) {
    width: 100%;
  }
  @media (min-width: 600) {
    width: 640px;
  }
  @media (min-width: 960) {
    width: 768px;
  }
  @media (min-width: 1280) {
    width: 1024px;
  }
}
.bar {
  transition-duration: 2s;
}
.player {
  @apply p-2;
  height: 500px;
  width: 320px;
  flex: 1 1 auto;
}
.player-text-container {
  @apply text-center my-2; /* text-align: center; */
  width: 200px;
}

.grow {
  @apply flex-grow; /* flex-grow: 1; */
}
.progress-container {
  @apply my-2 w-3/5;
}
.progress {
  transition-duration: 2s;
}
.playback-buttons-container {
  @apply flex flex-row mx-auto w-full justify-evenly items-center my-2;
}
.toggle-lyrics {
  @apply my-2;
}
.lyrics-container {
  width: 320px;
  height: 500px;
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
</style>
