import LoginForm from "../components/LoginForm";
import Card from "../components/Card";

export default function Login() {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100">
      <Card>
        <LoginForm />
      </Card>
    </div>
  );
}
