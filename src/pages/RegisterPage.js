import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
} from "@mui/material";
import { FTextField, FormProvider } from "../components/form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const loginSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  passwordConfirmation: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Password must match"),
});

function RegisterPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(loginSchema),
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    React.useState(false);

  const onSubmit = async (data) => {
    let { name, email, password } = data;

    try {
      await auth.register({ name, email, password }, () => {
        navigate("/");
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert severity="info">
            Already have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/login">
              Sign in
            </Link>
          </Alert>
          <FTextField name="name" label="Full name" />
          <FTextField name="email" label="Email address" />
          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FTextField
            name="passwordConfirmation"
            label="Password Confirmation"
            type={showPasswordConfirmation ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={() =>
                      setShowPasswordConfirmation(!showPasswordConfirmation)
                    }
                  >
                    {showPasswordConfirmation ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <LoadingButton
          sx={{ my: 2.5 }}
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>
      </FormProvider>
    </Container>
  );
}

export default RegisterPage;
