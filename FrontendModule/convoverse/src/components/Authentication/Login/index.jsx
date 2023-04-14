import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../URL";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "please fill all the fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/user/login`,
        { email, password },
        config
      );
      toast({
        title: `Welcome Back ${data.name.split()[0].toUpperCase()}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("user", JSON.stringify(data));

      setLoading(false);

      navigate("/chats");
    } catch (error) {
      toast({
        title: "User Not Found",
        description: "Please Check Your Credentianls Carefully",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={"10px"}>
      <FormControl color={"whiteAlpha.800"} isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl color={"whiteAlpha.800"} isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="enter your password"
            type={show ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button
              h="1.75rem"
              size="sm"
              color={"blackAlpha.700"}
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme={"whiteAlpha"}
        width="100%"
        onClick={handleSubmit}
        isLoading={loading}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
