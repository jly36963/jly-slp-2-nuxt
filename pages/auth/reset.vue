<template>
  <RedirectLoggedIn>
    <FlexContainer>
      <PaddedPaper class="root">
        <div class="title-container">
          <Typography class="title" variant="h6">Reset Password</Typography>
        </div>
        <!-- form -->
        <VForm @submit="handleReset" class="form">
          <div class="input-container">
            <VTextField
              class="input"
              name="email"
              label="Email"
              :value="formState.email"
              @input.native="handleChange"
            />
          </div>
          <div class="button-container">
            <OutlinedButton
              class="button"
              :small="true"
              @click.native="handleReset"
              text="Send"
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
// imports
import { VForm, VTextField } from 'vuetify/lib';
import OutlinedButton from '../../components/buttons/outlined-button.vue';
import { auth } from '../../utils/firebase.utils';
import { validateCredentials } from '../../utils/validate-credentials';
import RedirectLoggedIn from '../../components/auth/redirect-logged-in.vue';
// component
export default {
  data() {
    return {
      // form state
      formState: {
        email: '',
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
    handleReset: async function (e) {
      e.preventDefault();
      try {
        const { email } = this.formState;
        await auth.sendPasswordResetEmail(email);
        this.formState = { email: '' };
        this.feedback = {
          type: 'success',
          message: `Email sent to ${email}`,
          open: true,
        };
      } catch (err) {
        console.log(err);
        this.feedback = {
          type: 'error',
          message: 'Error while attempting to reset password.',
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
