<template>
  <div>
    <!-- no token -->
    <AuthorizeSpotify v-if="!spotifyToken" />
    <!-- nothing playing -->
    <NothingPlaying v-if="!spotifyToken && !songItem" />
    <!-- player -->
    <Player
      v-if="spotifyToken && songItem"
      :songItem="songItem"
      :songItemId="songItemId"
      :is_playing="is_playing"
      :lyrics="lyrics"
      :progress_percent="progress_percent"
      :sendSpotifyPlaybackRequest="sendSpotifyPlaybackRequest"
      :shuffle_state="shuffle_state"
      :repeat_state="repeat_state"
      :showLyrics="showLyrics"
      :setShowLyrics="setShowLyrics"
      :albumImageSrc="albumImageSrc"
    />
    <!-- feedback -->
    <CustomSnackbar
      :message="feedback.message"
      :type="feedback.type"
      :open="feedback.open"
    />
  </div>
</template>

<script lang="ts">
// component imports
import PaddedPaper from '../components/padded-paper.vue';
import FlexContainer from '../components/flex-container.vue';
import AuthorizeSpotify from '../components/spotify/authorize-spotify.vue';
import Player from '../components/player/index.vue';
import CustomSnackbar from '../components/custom-snackbar.vue';
import NothingPlaying from '../components/player/nothing-playing.vue';
// util imports
import axios, { AxiosRequestConfig, Method } from 'axios';
import qs from 'qs';
import useInterval from '../utils/useInterval';
import validateLyricPath from '../utils/validate-lyric-path';
import removeSpecialCharacters from '../utils/remove-special-characters';
import storage from '../utils/storage';

const initialState: any = {
  lyrics: null,
  spotifyToken: null,
  spotifyRefreshToken: null,
  songItem: null,
  songItemId: null,
  is_playing: false,
  progress_ms: 0,
  lyrics_path: null,
  repeat_state: 'off',
  shuffle_state: false,
  showLyrics: false,
};

// component
export default {
  // used components
  components: {
    PaddedPaper,
    FlexContainer,
    AuthorizeSpotify,
    NothingPlaying,
    Player,
    CustomSnackbar,
  },
  // state
  data() {
    return {
      // initial state
      initialState: {
        lyrics: null,
        spotifyToken: null,
        spotifyRefreshToken: null,
        songItem: null,
        songItemId: null,
        is_playing: false,
        progress_ms: 0,
        lyrics_path: null,
        repeat_state: 'off',
        shuffle_state: false,
        showLyrics: false,
      },
      // song / player / lyrics
      lyrics: initialState.lyrics,
      spotifyToken: initialState.spotifyToken,
      spotifyRefreshToken: initialState.spotifyRefreshToken,
      songItem: initialState.songItem,
      songItemId: initialState.songItemId,
      is_playing: initialState.is_playing,
      progress_ms: initialState.progress_ms,
      lyrics_path: initialState.lyrics_path,
      repeat_state: initialState.repeat_state,
      shuffle_state: initialState.shuffle_state,
      showLyrics: initialState.showLyrics,
      // feedback
      feedback: {
        type: 'info',
        message: 'Default Message',
        open: false,
      },
    };
  },
  // computed values
  computed: {
    // progress percent
    progress_percent: function (): number {
      let progress: number | undefined;
      if (this.songItem && this.progress_ms) {
        progress = Math.round(
          (this.progress_ms * 100) / this.songItem.duration_ms,
        );
      } else {
        progress = 0;
      }
      return progress;
    },
    // album image source
    albumImageSrc: function (): string | undefined {
      let src: string | undefined;
      try {
        src = this.songItem.album.images[1].url;
      } catch {
        src = undefined;
      }
      return src;
    },
  },
  // methods
  methods: {
    // set show lyrics
    setShowLyrics: function (showLyrics: boolean): void {
      this.showLyrics = showLyrics;
    },
    // get hash
    getHash: function (): any {
      const hash = window.location.hash
        .substring(1)
        .split('&')
        .reduce((acc, cv) => {
          if (cv) {
            const [key, value] = cv.split('=');
            acc[key] = decodeURIComponent(value);
          }
          return acc;
        }, {});
      window.location.hash = '';
      return hash;
    },
    // get spotify token
    getSpotifyToken: function (): void {
      // use access token from ls (if exists)
      const lsToken: string | null = storage.getItem('spotify_token');
      if (lsToken) {
        this.spotifyToken = lsToken;
        return;
      }
      // get from hash
      const hash: any = this.getHash();
      const { access_token } = hash;
      if (access_token) {
        // set and save token
        this.spotifyToken = access_token;
        storage.setItem('spotify_token', access_token);
      }
    },
    // reset state
    resetState: function (): void {
      this.lyrics = initialState.lyrics;
      this.songItem = initialState.songItem;
      this.songItemId = initialState.songItemId;
      this.is_playing = initialState.is_playing;
      this.progress_ms = initialState.progress_ms;
      this.lyrics_path = initialState.lyrics_path;
    },
    // get currently playing (spotify)
    getCurrentlyPlaying: async function (): Promise<void> {
      // only execute if spotifyToken
      if (this.spotifyToken) {
        const headers = {
          Authorization: `Bearer ${this.spotifyToken}`,
        };
        try {
          // make request
          const response = await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me/player',
            headers,
          });
          const {
            item: newItem,
            is_playing: new_is_playing,
            progress_ms: new_progress_ms,
            shuffle_state: new_shuffle_state,
            repeat_state: new_repeat_state,
          } = response.data;
          // set state initially
          if (!this.songItem && newItem) {
            this.songItem = newItem;
            this.songItemId = newItem.id;
            this.is_playing = new_is_playing;
            this.progress_ms = new_progress_ms;
            this.shuffle_state = new_shuffle_state;
            this.repeat_state = new_repeat_state;
          }
          // determine when state needs updating
          if (this.songItem && newItem) {
            // only update if necessary
            if (this.songItem.name !== newItem.name)
              this.is_playing = new_is_playing;
            if (this.progress_ms !== new_progress_ms)
              this.progress_ms = new_progress_ms;
            if (this.shuffle_state !== new_shuffle_state)
              this.shuffle_state = new_shuffle_state;
            if (this.repeat_state !== new_repeat_state)
              this.repeat_state = new_repeat_state;
            if (this.songItem.name !== newItem.name) {
              this.songItem = newItem;
              this.songItemId = newItem.id;
            }
          }
        } catch (err) {
          console.log(err);
          if (err.response && err.response.status === 401) {
            // bad token
            this.spotifyToken = null;
            storage.removeItem('spotify_token');
            return;
          }
          if (err.response && err.response.status === 503) {
            // failed to connect
            console.log('Spotify service unavailable.');
            return;
          }
          this.feedback = {
            type: 'error',
            message: 'Could not get currently playing',
            open: true,
          };
          this.resetState();
          return;
        }
      }
    },
    // next repeat state
    nextRepeatState: function (state: string): string {
      let newState: string | undefined;
      switch (state) {
        case 'off':
          newState = 'context';
          break;
        case 'context':
          newState = 'track';
          break;
        case 'track':
          newState = 'off';
          break;
        default:
          newState = 'off';
      }
      return newState;
    },
    // send spotify playback request
    sendSpotifyPlaybackRequest: async function (action: string): Promise<void> {
      // request
      if (this.spotifyToken) {
        // action
        let method: Method | undefined, url: string | undefined, query: any;
        switch (action) {
          case 'play':
            method = 'put';
            url = 'https://api.spotify.com/v1/me/player/play';
            break;
          case 'pause':
            method = 'put';
            url = 'https://api.spotify.com/v1/me/player/pause';
            break;
          case 'next':
            method = 'post';
            url = 'https://api.spotify.com/v1/me/player/next';
            break;
          case 'previous':
            method = 'post';
            url = 'https://api.spotify.com/v1/me/player/previous';
            break;
          case 'shuffle':
            method = 'put';
            url = 'https://api.spotify.com/v1/me/player/shuffle';
            query = { state: !this.shuffle_state };
            break;
          case 'repeat':
            method = 'put';
            url = 'https://api.spotify.com/v1/me/player/repeat';
            query = { state: this.nextRepeatState(this.repeat_state) };
            break;
          default:
            console.log('No matching action');
        }

        // headers
        let headers = {
          Authorization: `Bearer ${this.spotifyToken}`,
        };
        // request
        if (method && url) {
          // playback action
          const axiosConfig: AxiosRequestConfig = {
            method,
            url,
            headers,
            timeout: 4000,
          };
          if (query) {
            const axiosQS = qs.stringify(query);
            axiosConfig.url = `${url}?${axiosQS}`;
          }
          // add data if applicable
          try {
            await axios(axiosConfig);
            // get song data
            await this.getCurrentlyPlaying();
            // toggle set_is_playing
            if (['play', 'pause'].includes(action)) {
              this.is_playing = !this.is_playing;
            }
          } catch (err) {
            // spotify rejected playback request
            if (err.response && err.response.status === 403) {
              this.feedback = {
                type: 'info',
                message: 'Action unavailable',
                open: true,
              };
              return;
            }
            // request aborted
            if (err.code === 'ECONNABORTED') {
              console.log('Spotify playback request timed out');
            }
          }
        }
      }
    },
    // get lyrics path
    getLyricsPath: async function () {
      if (this.songItem) {
        try {
          // query
          const songName: string = removeSpecialCharacters(this.songItem.name);
          const artistName: string = removeSpecialCharacters(
            this.songItem.artists[0].name,
          );
          const query: string = qs.stringify({
            songName,
            artistName,
          });
          // url
          const url: string = `/api/genius/lyrics-path?${query}`;
          // headers
          // const token: string = await authState.currentUser.getIdToken();
          // const { uid } = authState.currentUser;
          // const headers = { token, uid };
          // request
          const response = await axios({
            method: 'get',
            url,
            // headers,
            timeout: 4000,
          });
          const { song } = response.data;
          const { id, path } = song;
          // check if path is valid (genius sometimes returns bad URLs)
          const validLyricPath: boolean = validateLyricPath(
            path,
            songName,
            artistName,
          );
          if (!validLyricPath) throw new Error();
          this.lyrics_path = path;
        } catch (err) {
          console.log(err);
          if (this.showLyrics) {
            // request aborted
            if (err.code === 'ECONNABORTED') {
              console.log('Genius request timed out');
              return;
            }
            // request failed
            this.feedback = {
              type: 'info',
              message: 'Could not get lyrics from Genius',
              open: true,
            };
          }
          this.lyrics_path = initialState.lyrics_path;
        }
      }
    },
    // get lyrics
    getLyrics: async function (): Promise<void> {
      if (this.songItem && this.lyrics_path) {
        const lyrics_path = this;
        try {
          // query
          const query = qs.stringify({
            lyrics_path: this.lyrics_path,
          });
          // url
          const url: string = `/api/genius/lyrics?${query}`;
          // headers
          // const token: string = await authState.currentUser.getIdToken();
          // const { uid } = authState.currentUser;
          // const headers = { token, uid };
          // request
          const response = await axios({
            method: 'get',
            url,
            // headers,
            timeout: 4000,
          });
          const { lyrics } = response.data;
          this.lyrics = lyrics;
        } catch (err) {
          console.log(err);
          if (this.showLyrics) {
            // request was aborted (exceeded ttl)
            if (err.code === 'ECONNABORTED') {
              console.log('Genius request timed out');
              return;
            }
            // request failed
            this.feedback = {
              type: 'info',
              message: 'Could not get lyrics from Genius',
              open: true,
            };
          }
        }
      } else {
        this.lyrics = initialState.lyrics;
      }
    },
  },
  async mounted() {
    // get spotify token
    await this.getSpotifyToken();
    // get currently playing
    await this.getCurrentlyPlaying();
    // start polling
    this.spotifyInterval = setInterval(this.getCurrentlyPlaying, 2000);
  },
  beforeDestroy() {
    // cleanup polling
    clearInterval(this.spotifyInterval);
  },
  watch: {
    songItemId: async function () {
      console.log('get lyrics path');
      await this.getLyricsPath();
    },
    lyrics_path: async function () {
      console.log('get lyrics');
      await this.getLyrics();
    },
  },
};
</script>

<style>
.index-button {
  @apply inline-block m-2;
}
</style>
