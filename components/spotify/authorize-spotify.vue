<template>
  <div>
    <FlexContainer>
      <PaddedPaper class="root">
        <div>
          <Typography class="mb-4">
            Please authenticate with Spotify and authorize this app.
          </Typography>
          <div>
            <a :href="spotifyAuthUrl">
              <OutlinedButton :small="true" text="Login" />
            </a>
          </div>
        </div>
      </PaddedPaper>
    </FlexContainer>
  </div>
</template>

<script lang="ts">
// component imports
import PaddedPaper from '../padded-paper.vue';
import FlexContainer from '../flex-container.vue';
import OutlinedButton from '../buttons/outlined-button.vue';
import Typography from '../buttons/typography.vue';
// config
import {
  authEndpoint,
  clientId,
  redirectUri,
  scopes,
} from '../../config/spotify-config';
const encodedScopes: string = scopes.join('%20');

// component
export default {
  name: 'AuthorizeSpotify',
  components: {
    PaddedPaper,
    FlexContainer,
    OutlinedButton,
  },
  data() {
    return {
      authEndpoint,
      clientId,
      redirectUri,
      scopes,
    };
  },
  computed: {
    encodedScopes: function (): string {
      return scopes.join('%20');
    },
    spotifyAuthUrl: function (): string {
      return `${this.authEndpoint}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.encodedScopes}&response_type=token&show_dialog=false`;
    },
  },
  mounted() {
    // update redirect uri
    const { protocol, hostname, port } = window.location;
    if (hostname === 'localhost') {
      const updatedUri: string = `${protocol}//${hostname}:${port}/`;
      this.redirectUri = updatedUri;
    }
  },
};
</script>

<style scoped lang="scss">
.root {
  width: 18.75rem;
}
</style>
