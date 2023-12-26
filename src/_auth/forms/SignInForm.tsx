import {
  Container,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserContext } from "../../Context/AuthContext";
import { useSignInAccount } from "../../Lib/react-query/queries";
interface SignInFormValues {
  email: string;
  password: string;
}

const SignInForm = () => {
  const navigate = useNavigate();
  const { checkAuthUser } = useUserContext();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } =
    useSignInAccount();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email")
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      ),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    // Fix the type to SignInFormValues
    resolver: yupResolver(schema),
  });

  async function onSubmit(user: SignInFormValues) {
    console.log("Submitting user:", user);

    try {
      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      console.log("Session after sign-in:", session);

      if (!session) {
        console.error("Error signing in user:", session);

        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        navigate("/");
        console.log(user);
      } else {
        console.log("not loggedIn");

        return;
      }
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <Container overflow="auto">
      <VStack>
        <Image mb="20px" src="/assets/images/logo.svg" />
        <Heading fontSize="3xl">Log In to your account</Heading>
      </VStack>
      <VStack
        as="form"
        spacing="4"
        onSubmit={handleSubmit(onSubmit)}
        color="white"
        align="start"
      >
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            {...register("email")}
            borderColor="transparent"
            bg="#2C2C2C"
            color="white"
          />
          {errors.email && (
            <p style={{ color: "#ff4c60" }}>{errors.email.message}</p>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register("password")}
            borderColor="transparent"
            bg="#2C2C2C"
            color="white"
          />
          {errors.password && (
            <p style={{ color: "#ff4c60" }}>{errors.password.message}</p>
          )}
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          w="100%"
          bg="#5D5FEF"
          color="#ffffff"
          _hover={{
            color: "#ff4c60",
            backgroundColor: "transparent",
            border: "solid 2px #ff4c60",
          }}
        >
          {isSigningInUser ? "loading" : "Sine In"}
        </Button>
        <Text>
          Do not have a account ?
          <Link to="/signUp">
            <span style={{ color: "#7878A3", marginLeft: "15px" }}>SignUp</span>
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default SignInForm;
