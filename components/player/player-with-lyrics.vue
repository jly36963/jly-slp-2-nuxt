<template>
  <div>
    <FlexContainer>
      <PaddedPaper>
        <p>Player (with lyrics)</p>
      </PaddedPaper>
    </FlexContainer>
  </div>
</template>

<script lang="ts">
import PaddedPaper from '../padded-paper.vue';
import FlexContainer from '../flex-container.vue';
export default {
  name: 'PlayerWithLyrics',
  components: {
    PaddedPaper,
    FlexContainer,
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
    setShowLyrics: Function,
    albumImageSrc: String,
  },
};
</script>
