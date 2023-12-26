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
import {
  useCreateUserAccount,
  useSignInAccount,
} from "../../Lib/react-query/queries";

interface SignUpFormValues {
  name: string;
  username: string;
  email: string;
  password: string;
}

const SignUpForm = () => {
  const navigate = useNavigate();
  const { checkAuthUser } = useUserContext();
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount } = useSignInAccount();

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    username: yup.string().required("Username is required"),
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
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(schema),
  });
  async function onSubmit(user: SignUpFormValues) {
    console.log("Submitting user:", user);

    try {
      const newUser = await createUserAccount(user);
      console.log("New user created:", newUser);

      if (!newUser) {
        console.error("Error creating user account");
        return;
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      console.log("Session after sign-in:", session);

      if (!session) {
        console.error("Error signing in user:", session); // Log the actual error
        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        navigate("/");
      } else {
        console.log("asdasdksdmaklsdn");

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
        <Heading fontSize="3xl">Creat a new account</Heading>
        <Text fontSize="md" color="#5C5C7B">
          {" "}
          to use snapgram , pleas enter your deatails
        </Text>
      </VStack>

      <VStack
        as="form"
        spacing="4"
        onSubmit={handleSubmit(onSubmit)}
        color="white"
        align="start"
      >
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            {...register("name")}
            borderColor="transparent"
            bg="#2C2C2C"
            color="white"
          />
          {errors.name && (
            <p style={{ color: "#ff4c60" }}>{errors.name.message}</p>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.username}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            {...register("username")}
            borderColor="transparent"
            bg="#2C2C2C"
            color="white"
          />
          {errors.username && (
            <p style={{ color: "#ff4c60" }}>{errors.username.message}</p>
          )}
        </FormControl>
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
          {isCreatingAccount ? "loading" : "Sign Up"}
        </Button>
        <Text alignSelf="center">
          Alerdy have a account ?
          <Link to="/signIn">
            <span style={{ color: "#7878A3", marginLeft: "15px" }}>Log in</span>
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default SignUpForm;
