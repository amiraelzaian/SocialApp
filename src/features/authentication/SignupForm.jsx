import { useForm } from "react-hook-form";
import styled from "styled-components";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import FormHeader from "../../ui/FormHeader";
import { useScreen } from "../../context/ScreenSizeContext";
import FormTail from "../../ui/FormTail";

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

function SignupForm() {
  const { isMobile } = useScreen();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} $isMobile={isMobile}>
        <FormHeader />

        <Row>
          <Label htmlFor="fullName" $size="lg">
            Fullname
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="fullname"
            {...register("fullName", {
              required: "Fullname is required",
            })}
          />
          {errors.fullName && <ErrorMsg>{errors.fullName.message}</ErrorMsg>}
        </Row>
        <Row>
          <Label htmlFor="username" $size="lg">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="username"
            {...register("username", {
              required: "username is required",
            })}
          />
          {errors.username && <ErrorMsg>{errors.username.message}</ErrorMsg>}
        </Row>
        <Row>
          <Label htmlFor="phone number" $size="lg">
            Phone number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="phone number"
            {...register("phone", {
              required: "Phone number is required",
            })}
          />
          {errors.phone && <ErrorMsg>{errors.phone.message}</ErrorMsg>}
        </Row>

        <Row>
          <Label htmlFor="email" $size="lg">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
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

        <ButtonGroup>
          <Button type="submit" variation="primary" size="large">
            Sign Up
          </Button>
          <Divider>or</Divider>
          <Button
            type="button"
            variation="secondary"
            size="large"
            onClick={() => reset()}
            style={{ width: "100%", textAlign: "center" }}
          >
            Reset
          </Button>
        </ButtonGroup>
      </Form>

      <FormTail to="/login" $isMobile={isMobile} />
    </>
  );
}

export default SignupForm;
