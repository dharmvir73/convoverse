import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toast = useToast();

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "please select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "convoverse-chatapp");
      data.append("cloud_name", "dixotc346");
      fetch("https://api.cloudinary.com/v1_1/dixotc346/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "please select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password || !pic) {
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

    if (password !== confirmPassword) {
      toast({
        title: "password do not match",
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
        "/api/user",
        { name, email, password, pic },
        config
      );
      toast({
        title: "Registration Completed Succesfully",
        description: `welcome ${data.name}`,
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
        title: "Error Occured",
        description: error.response.data.message,
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
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

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

      <FormControl color={"whiteAlpha.800"} isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="confirm password"
            type={show ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

      <FormControl id="pic" color={"whiteAlpha.800"}>
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type={"file"}
          p={1}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme={"whiteAlpha"}
        width="100%"
        onClick={submitHandler}
        isLoading={loading}
      >
        SignUp
      </Button>
    </VStack>
  );
};

export default Signup;
