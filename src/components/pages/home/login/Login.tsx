import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function Login() {
  return (
    <form className="flex flex-col gap-3 w-full">
      <Input
        type="email"
        placeholder="Correo electronico"
        className="w-full"
        required
        autoComplete="email"
      />
      <Input
        type="password"
        placeholder="Contraseña"
        className="w-full "
        autoComplete="off"
        required
      />
      <Button variant="primary" className="w-full mt-5" type="submit">
        Iniciar Sesión
      </Button>
    </form>
  );
}
