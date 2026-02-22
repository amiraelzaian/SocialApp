import { useForm } from "react-hook-form";
import styled from "styled-components";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import FormHeader from "../../ui/FormHeader";
import { useScreen } from "../../context/ScreenSizeContext";
import FormTail from "../../ui/FormTail";
import { useLogin } from "./useLogin";

const ForgotRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 8px;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-grey-400);
  font-size: 1rem;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 2px;
    background: var(--color-grey-200);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;

const ErrorMsg = styled.span`
  font-size: 0.78rem;
  color: var(--color-red-800);
  padding-left: 2px;
  font-size: 12px;
`;

function LoginForm() {
  const { isMobile } = useScreen();
  const { login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(data) {
    console.log(data);
    login(data);
  }
  console.log(isPending);
  if (isPending) return <Spinner />;
  console.log(isPending);
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} $isMobile={isMobile}>
        <FormHeader type="login" />

        <Row>
          <Label htmlFor="email" $size="lg">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            disabed={isPending}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
        </Row>

        <Row>
          <Label htmlFor="password" $size="lg">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            disabed={isPending}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
        </Row>

        <ForgotRow>
          <Label $variant="success" style={{ cursor: "pointer" }}>
            Forgot password?
          </Label>
        </ForgotRow>

        <ButtonGroup>
          <Button type="submit" $variation="primary" $size="large">
            Sign In
          </Button>
          <Divider>or</Divider>
          <Button
            type="button"
            $variation="secondary"
            $size="large"
            onClick={() => reset()}
            style={{ width: "100%", textAlign: "center" }}
          >
            Reset
          </Button>
        </ButtonGroup>
      </Form>

      <FormTail to="/signup" $isMobile={isMobile} />
    </>
  );
}

export default LoginForm;
