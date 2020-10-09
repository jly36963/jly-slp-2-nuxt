<template>
  <RedirectLoggedIn>
    <FlexContainer>
      <PaddedPaper class="root">
        <div class="title-container">
          <Typography class="title" variant="h6">Log in</Typography>
        </div>
        <!-- form -->
        <VForm @submit="handleLogin" class="form">
          <div class="input-container">
            <VTextField
              class="input"
              name="email"
              label="Email"
              :value="formState.email"
              @input.native="handleChange"
            />
          </div>
          <div class="input-container">
            <VTextField
              class="input"
              name="password"
              label="Password"
              type="password"
              :value="formState.password"
              @input.native="handleChange"
            />
          </div>

          <div class="button-container">
            <OutlinedButton
              class="button"
              :small="true"
              @click.native="handleLogin"
              text="Log in"
            />

            <NuxtLink to="/auth/reset">
              <Typography fontWeight="bold">Forgot Password?</Typography>
            </NuxtLink>
          </div>
          <div class="button-container">
            <Typography>New here?</Typography>
            <NuxtLink to="/auth/signup">
              <Typography fontWeight="bold">Sign up</Typography>
            </NuxtLink>
          </div>
        </VForm>
      </PaddedPaper>
    </FlexContainer>
    <!-- snackbar -->
    <CustomSnackbar
      :message="feedback.message"
      :type="feedback.type"
      :open="feedback.open"
    />
  </RedirectLoggedIn>
</template>

<script lang="ts">
// imports
import { VForm, VTextField } from 'vuetify/lib';
import Typography from '../../components/typography.vue';
import OutlinedButton from '../../components/buttons/outlined-button.vue';
import TextButton from '../../components/buttons/text-button.vue';
import RedirectLoggedIn from '../../components/auth/redirect-logged-in.vue';
import { auth } from '../../utils/firebase.utils';
import { validateCredentials } from '../../utils/validate-credentials';

// component
export default {
  // components
  components: {
    VForm,
    VTextField,
    OutlinedButton,
    TextButton,
    Typography,
  },
  // state
  data() {
    return {
      // form state
      formState: {
        email: '',
        password: '',
      },
      // feedback
      feedback: {
        type: 'info',
        message: 'Default Message',
        open: false,
      },
    };
  },
  methods: {
    // events
    handleChange: function (e) {
      this.formState[e.target.name] = e.target.value;
    },
    handleForgot: function () {
      this.$router.push('/auth/reset');
    },
    handleLogin: async function (e) {
      e.preventDefault();
      try {
        const { email, password } = this.formState;
        const loginResult = await auth.signInWithEmailAndPassword(
          email,
          password,
        );
        if (!loginResult.user) {
          this.feedback = {
            type: 'error',
            message: `Credentials do not match any of our records.`,
            open: true,
          };
          return;
        }
      } catch (err) {
        console.log(err);
        this.feedback = {
          type: 'error',
          message: 'Error while authenticating user.',
          open: true,
        };
      }
    },
  },
};
</script>

<style scoped lang="scss">
.root {
  min-height: 150px;
  width: 300px;
}
.root > * {
  @apply my-2;
}
.title-container {
  @apply flex flex-col justify-evenly;
}
.title {
  @apply text-center block;
}
.form > * {
  @apply my-2;
}
.input-container {
  /* nothing yet */
}
.input {
  /* nothing yet */
}
.button-container {
  @apply flex flex-row text-center content-center items-center justify-center;
}
.button-container > * {
  @apply mx-2;
}
.button {
  @apply inline-block;
}
</style>
