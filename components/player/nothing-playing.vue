<template>
  <div>
    <FlexContainer>
      <PaddedPaper>
        <p>Nothing Playing</p>
      </PaddedPaper>
    </FlexContainer>
  </div>
</template>

<script lang="ts">
import PaddedPaper from '../padded-paper.vue';
import FlexContainer from '../flex-container.vue';
export default {
  name: 'NothingPlaying',
  components: {
    PaddedPaper,
    FlexContainer,
  },
};
</script>
