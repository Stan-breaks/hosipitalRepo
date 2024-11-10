import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  LoginCredentials,
  RegisterData,
  DoctorRegisterData,
} from "../types/auth";
import { authService } from "../services/auth";

const AuthenticationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Register form
  const registerForm = useForm<RegisterData>({
    defaultValues: {
      Email: "",
      Password: "",
      Phone: "",
      FullName: "",
    },
  });

  // Login form
  const loginForm = useForm<LoginCredentials>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const doctorRegisterForm = useForm<DoctorRegisterData>({
    defaultValues: {
      Email: "",
      Password: "",
      Phone: "",
      FullName: "",
      licenseNumber: "",
      hospitalId: undefined,
      specialtyId: undefined,
      status: "Active", // default status
    },
  });

  const handleRegister = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call
      var response = await authService.register(data);

      //Display success
      if (!response.message && !response.token) {
        throw new Error("Invalid response from the server");
      }
      localStorage.setItem("token", response.token);
      toast({
        title: "Success!",
        description: "Account created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (data: LoginCredentials) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call
      var response = await authService.login(data);
      console.log(response);
      localStorage.setItem("token", response.token);
      toast({
        title: "Success!",
        description: "Logged in successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleDoctorRegister = async (data: DoctorRegisterData) => {
    setIsLoading(true);
    try {
      const response = await authService.registerDoctor(data);

      if (!response.message && !response.token) {
        throw new Error("Invalid response from the server");
      }

      localStorage.setItem("token", response.token);
      toast({
        title: "Success!",
        description: "Doctor account created successfully.",
      });
    } catch (error) {
      console.error("Doctor registration error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container mx-auto max-w-lg p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Kenya Healthcare Portal</CardTitle>
          <CardDescription>
            Create an account or sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
              <TabsTrigger value="doctor-register">
                Register as Doctor
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(handleLogin)}
                  className="space-y-4"
                >
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your password"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="register">
              <Form {...registerForm}>
                <form
                  onSubmit={registerForm.handleSubmit(handleRegister)}
                  className="space-y-4"
                >
                  <FormField
                    control={registerForm.control}
                    name="FullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="Email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="Phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your phone number"
                            type="tel"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="Password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Create a password"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="doctor-register">
              <Form {...doctorRegisterForm}>
                <form
                  onSubmit={doctorRegisterForm.handleSubmit(
                    handleDoctorRegister,
                  )}
                  className="space-y-4"
                >
                  <FormField
                    control={doctorRegisterForm.control}
                    name="FullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={doctorRegisterForm.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your medical license number"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={doctorRegisterForm.control}
                    name="hospitalId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hospital ID</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your hospital ID"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              )
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={doctorRegisterForm.control}
                    name="specialtyId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialty ID</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your specialty ID"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              )
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={doctorRegisterForm.control}
                    name="Email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={doctorRegisterForm.control}
                    name="Phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your phone number"
                            type="tel"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={doctorRegisterForm.control}
                    name="Password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Create a password"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading
                      ? "Creating Doctor Account..."
                      : "Register as Doctor"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthenticationPage;
