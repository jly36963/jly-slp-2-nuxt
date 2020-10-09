<template>
  <RedirectLoggedIn>
    <FlexContainer>
      <PaddedPaper class="root">
        <div class="title-container">
          <Typography class="title" variant="h6">Create Account</Typography>
        </div>
        <!-- form -->
        <VForm @submit="handleSignup" class="form">
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
          <div class="input-container">
            <VTextField
              class="input"
              name="password2"
              label="Confirm Password"
              type="password"
              :value="formState.password2"
              @input.native="handleChange"
            />
          </div>

          <div class="button-container">
            <OutlinedButton
              class="button"
              :small="true"
              @click.native="handleSignup"
              text="Sign up"
            />
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
// component imports
import { VForm, VTextField } from 'vuetify/lib';
import OutlinedButton from '../../components/buttons/outlined-button.vue';
import RedirectLoggedIn from '../../components/auth/redirect-logged-in.vue';
// util imports
import { auth } from '../../utils/firebase.utils';
import { validateCredentials } from '../../utils/validate-credentials';
// component
export default {
  // state
  data() {
    return {
      // form state
      formState: {
        email: '',
        password: '',
        password2: '',
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
    handleSignup: async function (e) {
      e.preventDefault();
      try {
        const { email, password, password2 } = this.formState;
        // validate
        const { errors: credentialErrors }: any = validateCredentials(
          email,
          password,
          password2,
        );
        if (credentialErrors.length) {
          this.feedback = {
            type: 'error',
            message: credentialErrors[0],
            open: true,
          };
          return;
        }
        // sign up
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password,
        );
        // *** insert user into db ***
        // redirect to login
        this.$router.push('/auth/login');
      } catch (err) {
        console.log(err);
        this.feedback = {
          type: 'error',
          message: err.message || 'Error while registering user.',
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
  @apply text-center;
}
.button {
  @apply inline-block;
}
</style>
